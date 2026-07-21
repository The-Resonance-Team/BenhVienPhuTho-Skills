#!/usr/bin/env node

/*
 * Build safe runtime templates from private seed documents.
 *
 * The source directory must live outside the repository. This utility never
 * prints document text; it only reports counts and validation failures.
 */

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const childProcess = require("node:child_process");
const { normalizeOpenXml } = require("./openxml-normalize");

const repoRoot = path.resolve(__dirname, "..");
const defaultSourceRoot = path.join(repoRoot, "private-seeds");
const defaultSkills = ["phong-hcqt", "phong-dieu-duong"];

const args = new Map();
for (let index = 2; index < process.argv.length; index += 1) {
  const value = process.argv[index];
  if (!value.startsWith("--")) continue;
  const [key, inline] = value.slice(2).split("=", 2);
  const next = process.argv[index + 1];
  const consumesNext = inline === undefined && next !== undefined && !next.startsWith("--");
  args.set(key, inline ?? (consumesNext ? next : true));
  if (consumesNext) index += 1;
}

const sourceRoot = path.resolve(args.get("source-root") || defaultSourceRoot);
const selectedSkills = (args.get("skills") || defaultSkills.join(","))
  .split(",")
  .map((skill) => skill.trim())
  .filter(Boolean);
const dryRun = args.has("dry-run");
const quiet = args.has("quiet");
const skipValidation = args.has("skip-validation");

const XML_PARTS = new Set(["document.xml", "header1.xml", "header2.xml", "header3.xml", "footer1.xml", "footer2.xml", "footer3.xml", "footnotes.xml", "endnotes.xml"]);
const XML_ESCAPE = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" };

function fail(message) {
  throw new Error(message);
}

function listDocx(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((name) => name.endsWith(".docx"))
    .sort()
    .map((name) => path.join(directory, name));
}

function decodeXml(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function escapeXml(value) {
  return value.replace(/[&<>"']/g, (character) => XML_ESCAPE[character]);
}

function tokenForLabel(label) {
  const normalized = label.toLowerCase();
  if (normalized.includes("mã số thuế")) return "{{MA_SO_THUE}}";
  if (normalized.includes("số tài khoản") || normalized.includes("kho bạc")) return "{{SO_TAI_KHOAN}}";
  if (normalized.includes("điện thoại")) return "{{DIEN_THOAI}}";
  if (normalized.includes("địa chỉ")) return "{{DIA_CHI}}";
  if (normalized.includes("đại diện") || normalized.includes("họ tên")) return "{{HO_TEN}}";
  if (normalized.includes("giám đốc")) return "{{GIAM_DOC_KY}}";
  if (normalized.includes("kế toán trưởng")) return "{{KE_TOAN_TRUONG_KY}}";
  if (normalized.includes("công ty") || normalized.includes("nhà thầu")) return "{{TEN_NHA_THAU}}";
  if (normalized.includes("ngày") || normalized.includes("tháng") || normalized.includes("năm")) return "{{NGAY_THANG}}";
  if (normalized.includes("dự toán") || normalized.includes("giá trị") || normalized.includes("số tiền")) return "{{GIA_TRI}}";
  return "{{FIELD}}";
}

function replaceLabeledValue(text) {
  const patterns = [
    /(mã\s*số\s*thuế\s*[:：-]\s*)([^;|,\n]+)/iu,
    /(số\s*tài\s*khoản\s*[:：-]\s*)([^;|,\n]+)/iu,
    /(điện\s*thoại\s*[:：-]\s*)([^;|,\n]+)/iu,
    /(địa\s*chỉ\s*[:：-]\s*)([^;|,\n]+)/iu,
    /(người\s*đại\s*diện\s*[:：-]\s*)([^;|,\n]+)/iu,
    /(đại\s*diện\s*[:：-]\s*)([^;|,\n]+)/iu,
    /(họ\s*tên\s*[:：-]\s*)([^;|,\n]+)/iu,
    /(giám\s*đốc(?:\s*ký)?\s*[:：-]\s*)([^;|,\n]+)/iu,
    /(kế\s*toán\s*trưởng(?:\s*ký)?\s*[:：-]\s*)([^;|,\n]+)/iu,
    /(công\s*ty\s+)([^;|,\n]+)/iu,
    /(nhà\s*thầu\s*[:：-]\s*)([^;|,\n]+)/iu,
  ];

  return patterns.reduce((current, pattern) => current.replace(pattern, (match, label) => `${label}${tokenForLabel(label)}`), text);
}

function sanitizeText(text) {
  let result = text;
  result = result.replace(/\[[^\]]{3,}\]/gu, "{{FIELD}}");
  result = replaceLabeledValue(result);
  result = result.replace(/\b\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b/gu, "{{NGAY_THANG}}");
  result = result.replace(/\b\d{4,18}\b/gu, "{{SO_LIEU}}");
  result = result.replace(/\b\d[\d\s.-]{5,}\d\b/gu, "{{SO_LIEU}}");
  result = result.replace(/\b(?:0\d[ .-]?\d{3,4}[ .-]?\d{3,4})\b/gu, "{{DIEN_THOAI}}");
  result = result.replace(/\b\d[\d.,]{3,}\s*đồng\b/giu, "{{GIA_TRI}} đồng");
  result = result.replace(/_{3,}/gu, "{{FIELD}}");
  if (/^\s*[\d\s./-]+\s*$/u.test(result) && /\d/u.test(result)) result = "{{SO_LIEU}}";
  result = result.replace(/\d+/gu, "{{SO_LIEU}}");
  if (/^\s*(?:công ty|cty|ctcp|tnhh)\b/iu.test(result)) return "{{TEN_NHA_THAU}}";
  return result;
}

function sanitizeXml(xml) {
  const normalized = normalizeOpenXml(xml);
  return normalized.replace(/<w:(t|delText|instrText)( [^>]*)?>([\s\S]*?)<\/w:\1>/gu, (match, tag, attributes = "", content) => {
    const sanitized = sanitizeText(decodeXml(content));
    return `<w:${tag}${attributes}>${escapeXml(sanitized)}</w:${tag}>`;
  });
}

function run(command, commandArgs, options = {}) {
  return childProcess.execFileSync(command, commandArgs, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...options });
}

function isWin32() {
  return process.platform === "win32";
}

function unzipFile(source, dest) {
  if (isWin32()) {
    run("powershell", ["-Command", `Expand-Archive -Path '${source}' -DestinationPath '${dest}' -Force`]);
  } else {
    run("unzip", ["-q", source, "-d", dest]);
  }
}

function chmodRecursive(dir) {
  if (!isWin32()) {
    run("chmod", ["-R", "u+rwX", dir]);
  }
  // On Windows, files created by Node.js already have appropriate permissions.
}

function zipDir(dest, cwd) {
  if (isWin32()) {
    run("powershell", ["-Command", `Compress-Archive -Path '${path.join(cwd, '*')}' -DestinationPath '${dest}' -Force`]);
  } else {
    run("zip", ["-q", "-X", "-r", dest, "."], { cwd });
  }
}

function copySanitizedDocx(source, output) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "benhvienphutho-template-"));
  const stagedOutput = `${output}.staged-${process.pid}`;
  try {
    unzipFile(source, tempRoot);
    chmodRecursive(tempRoot);
    const wordRoot = path.join(tempRoot, "word");
    const xmlFiles = fs.existsSync(wordRoot)
      ? fs.readdirSync(wordRoot).filter((name) => name.endsWith(".xml"))
      : [];
    for (const name of xmlFiles) {
      const file = path.join(wordRoot, name);
      const original = fs.readFileSync(file, "utf8");
      fs.writeFileSync(file, XML_PARTS.has(name) || name.startsWith("customXml") ? sanitizeXml(original) : normalizeOpenXml(original));
    }
    fs.mkdirSync(path.dirname(output), { recursive: true });
    if (!dryRun) {
      zipDir(stagedOutput, tempRoot);
      const issues = validateOutput(stagedOutput);
      if (issues.length && !skipValidation) fail(`${path.basename(source)}: ${issues.join(", ")}`);
      fs.renameSync(stagedOutput, output);
    }
    return xmlFiles.length;
  } finally {
    if (fs.existsSync(stagedOutput)) fs.rmSync(stagedOutput, { force: true });
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function validateOutput(file) {
  const xml = isWin32()
    ? run("powershell", ["-Command", `((Expand-Archive -Path '${file}' -DestinationPath '${path.join(os.tmpdir(), "bv-validate-" + process.pid)}' -PassThru | Get-ChildItem -Recurse -Filter 'document.xml' | Select-Object -First 1).FullName | Get-Content -Raw)`])
    : run("unzip", ["-p", file, "word/document.xml"]);
  const textNodes = [...xml.matchAll(/<w:(?:t|delText|instrText)(?: [^>]*)?>([\s\S]*?)<\/w:(?:t|delText|instrText)>/gu)]
    .map((match) => match[1]);
  const plain = textNodes.join(" ").replace(/&amp;/g, "&").replace(/\s+/gu, " ");
  const issues = [];
  if (/\b\d{4,18}\b/gu.test(plain)) issues.push("numeric source data remains");
  if (/\b(?:công ty|cty|ctcp|tnhh)\s+[A-ZÀ-Ỹ][^{}\n]{2,}/iu.test(plain)) issues.push("vendor name remains");
  if (issues.length && args.has("debug")) {
    const contexts = [...plain.matchAll(/\d{4,18}/gu)].slice(0, 10).map((match) => {
      const start = Math.max(0, match.index - 45);
      return plain.slice(start, match.index + match[0].length + 45)
        .replace(/\d/g, "#")
        .replace(/[A-Za-zÀ-ỹ]{3,}/gu, "X");
    });
    console.log(JSON.stringify({ file, issues, contexts }));
  }
  return issues;
}

function main() {
  if (!fs.existsSync(sourceRoot)) fail(`Source root does not exist: ${sourceRoot}`);
  let total = 0;
  for (const skill of selectedSkills) {
    const assetsRoot = path.join(sourceRoot, skill, "assets");
    const source = fs.existsSync(path.join(assetsRoot, "_seed"))
      ? path.join(assetsRoot, "_seed")
      : assetsRoot;
    const output = path.join(repoRoot, "skills", skill, "assets");
    const files = listDocx(source);
    if (!files.length) fail(`No .docx seeds found for ${skill}`);
    for (const file of files) {
      const target = path.join(output, path.basename(file));
      const parts = copySanitizedDocx(file, target);
      const issues = dryRun || skipValidation ? [] : validateOutput(target);
      if (issues.length) fail(`${skill}/${path.basename(file)}: ${issues.join(", ")}`);
      if (!quiet) console.log(`${dryRun ? "would build" : "built"} ${skill}/${path.basename(file)} (${parts} XML parts)`);
      total += 1;
    }
  }
  console.log(`${dryRun ? "Would build" : "Built"} ${total} sanitized runtime templates.`);
}

try {
  main();
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}
