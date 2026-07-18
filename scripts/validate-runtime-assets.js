#!/usr/bin/env node

/**
 * Bounded runtime-asset audit.
 *
 * Runtime templates may legitimately contain {{PLACEHOLDER}} tokens. This
 * audit checks that those tokens are well-formed and that no labeled source
 * identifiers survived sanitization. It also separates legacy OpenXML schema
 * warnings from command/content failures so a warning is never mistaken for
 * a clean document.
 */

const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { promisify } = require("util");

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(__dirname, "..");
const OFFICECLI = process.env.OFFICECLI || "officecli";
const DEFAULT_SKILLS = [
  "phong-cntt",
  "phong-ktda",
  "phong-hcqt",
  "phong-dieu-duong",
  "phong-vattu",
  "phong-tccb",
  "phong-dao-tao",
];

function parseArgs(argv) {
  const args = { skills: DEFAULT_SKILLS, strictSchema: false, json: false };
  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];
    if (value === "--strict-schema") args.strictSchema = true;
    else if (value === "--json") args.json = true;
    else if (value === "--skills") args.skills = String(argv[++i] || "").split(",").filter(Boolean);
    else if (value === "--root") args.root = path.resolve(String(argv[++i] || ROOT));
  }
  return args;
}

async function runJson(args) {
  try {
    const result = await execFileAsync(OFFICECLI, args, { encoding: "utf8", maxBuffer: 4 * 1024 * 1024 });
    return JSON.parse(result.stdout);
  } catch (error) {
    try {
      return JSON.parse(error.stdout || "");
    } catch {
      return null;
    }
  }
}

async function officeText(file) {
  const result = await runJson(["view", file, "text", "--json"]);
  if (!result || !result.success) return "";
  const elements = result.data && Array.isArray(result.data.elements) ? result.data.elements : [];
  return elements.map((element) => element && typeof element.text === "string" ? element.text : "").join("\n");
}

async function auditFile(file) {
  const report = { file, schemaTypes: [], schemaErrors: [], contentIssues: 0, placeholders: [], sensitive: false, commandFailure: false };
  const [validation, issues, text] = await Promise.all([
    runJson(["validate", file, "--json"]),
    runJson(["view", file, "issues", "--type", "content", "--limit", "100", "--json"]),
    officeText(file),
  ]);
  if (!validation) report.commandFailure = true;
  else {
    report.schemaErrors = validation.data && validation.data.errors || [];
    report.schemaTypes = [...new Set(report.schemaErrors.map((error) => error.type || "unknown"))];
  }
  if (!issues || !issues.success) report.commandFailure = true;
  else report.contentIssues = Number(issues.data && issues.data.count || 0);
  const tokens = [...text.matchAll(/\{\{([^{}]+)\}\}/g)].map((match) => match[1]);
  report.placeholders = [...new Set(tokens.filter((token) => !/^[A-Z][A-Z0-9_]*$/.test(token)))];
  const untemplatedText = text.replace(/\{\{[^{}]+\}\}/g, "");
  report.sensitive = /(?:MST|mã số thuế|tài khoản|điện thoại|số điện thoại|số hồ sơ|bệnh nhân)[^\n]{0,80}\b\d{6,}\b/iu.test(untemplatedText);
  return report;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = args.root || ROOT;
  const result = { root, total: 0, missing: [], files: [], schemaWarnings: 0, schemaFindings: [], contentWarnings: 0, failures: [] };

  const jobs = [];
  for (const skill of args.skills) {
    const assets = path.join(root, "skills", skill, "assets");
    if (!fs.existsSync(assets)) {
      result.missing.push(`skills/${skill}/assets`);
      continue;
    }
    for (const name of fs.readdirSync(assets).filter((entry) => /\.(docx|xlsx)$/iu.test(entry)).sort()) {
      const file = path.join(assets, name);
      const relative = path.relative(root, file);
      result.total += 1;
      jobs.push({ file, relative });
    }
  }

  let cursor = 0;
  const results = [];
  async function worker() {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= jobs.length) return;
      const job = jobs[index];
      results[index] = { relative: job.relative, report: await auditFile(job.file) };
    }
  }
  await Promise.all(Array.from({ length: 8 }, () => worker()));
  for (const { relative, report } of results) {
    result.files.push({ file: relative, schemaTypes: report.schemaTypes, contentIssues: report.contentIssues });
    result.schemaWarnings += report.schemaTypes.length;
    result.contentWarnings += report.contentIssues;
    if (report.commandFailure) result.failures.push({ file: relative, reason: "officecli command failed" });
    if (report.placeholders.length) result.failures.push({ file: relative, reason: "malformed placeholder token" });
    if (report.sensitive) result.failures.push({ file: relative, reason: "labeled sensitive value detected" });
    if (args.strictSchema && report.schemaTypes.length) result.failures.push({ file: relative, reason: "schema validation failed" });
  }
  const schemaFindings = new Map();
  for (const { relative, report } of results) {
    for (const error of report.schemaErrors) {
      const finding = `${error.type || "unknown"} | ${error.description || ""}`;
      const current = schemaFindings.get(finding) || { count: 0, sample: relative };
      current.count += 1;
      schemaFindings.set(finding, current);
    }
  }
  result.schemaFindings = [...schemaFindings.entries()]
    .sort((left, right) => right[1].count - left[1].count)
    .map(([finding, details]) => ({ finding, ...details }));

  if (result.missing.length) result.failures.push(...result.missing.map((file) => ({ file, reason: "runtime asset directory missing" })));
  const summary = {
    root: result.root,
    total: result.total,
    schemaWarningFiles: result.files.filter((file) => file.schemaTypes.length).length,
    schemaWarningTypes: [...new Set(result.files.flatMap((file) => file.schemaTypes))],
    schemaFindings: result.schemaFindings,
    contentWarningFiles: result.files.filter((file) => file.contentIssues > 0).length,
    contentWarnings: result.contentWarnings,
    failures: result.failures,
  };
  console.log(args.json ? JSON.stringify(summary, null, 2) : JSON.stringify(summary));
  process.exitCode = result.failures.length ? 1 : 0;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
