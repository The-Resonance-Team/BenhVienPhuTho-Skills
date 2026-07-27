#!/usr/bin/env node

/**
 * Pre-commit template validator.
 *
 * Runs `officecli validate` on each .docx file and reports structural issues.
 * Does NOT fix — blocking the commit forces the developer to fix the template
 * before it enters assets/.
 *
 * Usage:
 *   node scripts/validate-template.js file1.docx file2.docx ...
 *   git diff --cached --name-only -- '*.docx' | xargs node scripts/validate-template.js
 */

const { execFile } = require("node:child_process");
const { promisify } = require("node:util");

const execFileAsync = promisify(execFile);
const OFFICECLI = process.env.OFFICECLI || "officecli";

const files = process.argv.slice(2).filter((f) => /\.(docx|xlsx|pptx)$/iu.test(f));

if (!files.length) {
  process.exit(0);
}

async function validate(file) {
  try {
    const result = await execFileAsync(OFFICECLI, ["validate", file, "--json"], {
      encoding: "utf8",
      maxBuffer: 4 * 1024 * 1024,
    });
    const parsed = JSON.parse(result.stdout);
    return { file, ok: true, errors: parsed?.data?.errors || [] };
  } catch (error) {
    let errors = [];
    try {
      const parsed = JSON.parse(error.stdout || "");
      errors = parsed?.data?.errors || [];
    } catch {
      // JSON parse failed — keep empty
    }
    return { file, ok: false, errors, exitCode: error.code || 1 };
  }
}

async function main() {
  const results = await Promise.all(files.map(validate));
  const failures = results.filter((r) => !r.ok || r.errors.length > 0);

  if (!failures.length) {
    console.log(`✓ ${results.length} template(s) valid`);
    process.exit(0);
  }

  console.error(`\n✗ ${failures.length} template(s) with issues:\n`);
  for (const { file, errors } of failures) {
    console.error(`  ${file}`);
    for (const err of errors) {
      const type = err.type || "unknown";
      const desc = err.description || err.message || JSON.stringify(err);
      console.error(`    [${type}] ${desc}`);
    }
  }
  console.error(
    "\nFix these templates before committing. Use LibreOffice headless for .doc → .docx conversion:"
  );
  console.error("  libreoffice --headless --convert-to docx input.doc --outdir output/\n");
  process.exit(1);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
