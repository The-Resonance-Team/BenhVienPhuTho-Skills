#!/usr/bin/env node

// Strict delivery gate for a generated Office artifact.
// Consecutive spaces are reported but treated as layout-only when they are the
// only content issue; all other content findings remain delivery blockers.

const { execFile } = require("node:child_process");
const { promisify } = require("node:util");

const execFileAsync = promisify(execFile);
const officecli = process.env.OFFICECLI || "officecli";
const file = process.argv[2];

if (!file) {
  console.error("Usage: node scripts/validate-office-output.js <output.docx|output.xlsx|output.pptx>");
  process.exit(2);
}

async function jsonCommand(args) {
  try {
    const result = await execFileAsync(officecli, [...args, "--json"], { encoding: "utf8", maxBuffer: 4 * 1024 * 1024 });
    return { status: 0, value: JSON.parse(result.stdout) };
  } catch (error) {
    try {
      return { status: error.code || 1, value: JSON.parse(error.stdout || "") };
    } catch {
      return { status: error.code || 1, value: null };
    }
  }
}

async function main() {
  const [validation, issues, text] = await Promise.all([
    jsonCommand(["validate", file]),
    jsonCommand(["view", file, "issues", "--type", "content", "--limit", "100"]),
    jsonCommand(["view", file, "text"]),
  ]);
  const textValue = text.value && text.value.data ? JSON.stringify(text.value.data) : "";
  const remainingPlaceholders = (textValue.match(/\{\{[^{}]+\}\}/g) || []).length;
  const validationErrors = validation.value && validation.value.data ? validation.value.data.errors || [] : [];
  const contentIssues = issues.value && issues.value.data ? Number(issues.value.data.count || 0) : -1;
  const contentIssueItems = issues.value && issues.value.data ? issues.value.data.issues || [] : [];
  const layoutOnlyContentIssues = contentIssueItems.filter((issue) => /consecutive spaces/iu.test(issue.message || issue.description || "")).length;
  const blockingContentIssues = contentIssues < 0 || contentIssues > contentIssueItems.length
    ? contentIssues
    : Math.max(0, contentIssues - layoutOnlyContentIssues);
  const result = {
    file,
    validateErrors: validationErrors.length,
    contentIssues,
    layoutOnlyContentIssues,
    blockingContentIssues,
    remainingPlaceholders,
    commandFailures: [validation, issues, text].filter((item) => item.status !== 0).length,
  };
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.commandFailures || result.validateErrors || result.blockingContentIssues > 0 || result.remainingPlaceholders ? 1 : 0;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
