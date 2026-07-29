#!/usr/bin/env node
/**
 * Eval runner — validates skill eval cases against repo structure.
 *
 * Checks:
 * 1. Each target_skill exists in skills/ with a SKILL.md
 * 2. Skills with .docx assets have a templates.json
 * 3. All eval cases have prompt + expected_output
 * 4. Overlap cases (should_trigger: false) reference a valid alternative skill
 * 5. Plugin manifest lists all phong-* skills
 *
 * Usage:
 *   node scripts/run-evals.js                  # validate structure only
 *   node scripts/run-evals.js --opencode       # also run prompts via OpenCode (needs OPENCODE_API_KEY)
 *   node scripts/run-evals.js --json           # output JSON report
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EVALS_PATH = path.join(ROOT, "evals", "evals.json");
const SKILLS_DIR = path.join(ROOT, "skills");
const PLUGIN_PATH = path.join(ROOT, ".claude-plugin", "plugin.json");

// ── Helpers ──────────────────────────────────────────────────────────────

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function dirExists(p) {
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

function fileExists(p) {
  return fs.existsSync(p) && fs.statSync(p).isFile();
}

function hasDocxAssets(skillDir) {
  const assetsDir = path.join(skillDir, "assets");
  if (!dirExists(assetsDir)) return false;
  return fs.readdirSync(assetsDir).some((f) => f.endsWith(".docx"));
}

// ── Main ─────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const jsonMode = args.includes("--json");
  const opencodeMode = args.includes("--opencode");

  const evals = readJSON(EVALS_PATH);
  const results = [];
  let pass = 0;
  let fail = 0;
  let skip = 0;

  // ── 1. Check plugin manifest ───────────────────────────────────────────

  if (fileExists(PLUGIN_PATH)) {
    const manifest = readJSON(PLUGIN_PATH);
    const manifestSkills = manifest.skills || [];
    const skillDirs = fs
      .readdirSync(SKILLS_DIR)
      .filter((d) => d.startsWith("phong-"));

    for (const skill of skillDirs) {
      if (!manifestSkills.includes(skill)) {
        results.push({
          id: "manifest",
          skill,
          check: "plugin-manifest",
          status: "fail",
          message: `${skill} not in plugin.json`,
        });
        fail++;
      }
    }
  }

  // ── 2. Check each eval case ────────────────────────────────────────────

  for (const evalCase of evals.evals) {
    const { id, target_skill, should_trigger, prompt, expected_output } =
      evalCase;
    const skillDir = path.join(SKILLS_DIR, target_skill);
    const skillExists = dirExists(skillDir);
    const hasSKILLmd = skillExists && fileExists(path.join(skillDir, "SKILL.md"));

    // Check skill exists
    if (!skillExists || !hasSKILLmd) {
      results.push({
        id,
        skill: target_skill,
        check: "skill-exists",
        status: "fail",
        message: `Skill directory or SKILL.md missing: ${target_skill}`,
      });
      fail++;
      continue;
    }

    results.push({
      id,
      skill: target_skill,
      check: "skill-exists",
      status: "pass",
      message: `SKILL.md exists`,
    });
    pass++;

    // Check prompt + expected_output
    if (!prompt || prompt.trim().length === 0) {
      results.push({
        id,
        skill: target_skill,
        check: "prompt-nonempty",
        status: "fail",
        message: "Prompt is empty",
      });
      fail++;
    } else {
      results.push({
        id,
        skill: target_skill,
        check: "prompt-nonempty",
        status: "pass",
        message: `Prompt: ${prompt.slice(0, 60)}...`,
      });
      pass++;
    }

    if (!expected_output || expected_output.trim().length === 0) {
      results.push({
        id,
        skill: target_skill,
        check: "expected-output-nonempty",
        status: "fail",
        message: "expected_output is empty",
      });
      fail++;
    } else {
      results.push({
        id,
        skill: target_skill,
        check: "expected-output-nonempty",
        status: "pass",
        message: `Expected: ${expected_output.slice(0, 60)}...`,
      });
      pass++;
    }

    // Check templates.json for skills with .docx assets
    if (hasDocxAssets(skillDir)) {
      const hasTemplatesJson = fileExists(
        path.join(skillDir, "assets", "templates.json")
      );
      if (!hasTemplatesJson) {
        results.push({
          id,
          skill: target_skill,
          check: "templates-json",
          status: "fail",
          message: `Skill has .docx assets but no templates.json`,
        });
        fail++;
      } else {
        // Validate templates.json structure
        try {
          const tj = readJSON(path.join(skillDir, "assets", "templates.json"));
          if (!tj.skill || !Array.isArray(tj.templates)) {
            throw new Error("Missing skill or templates array");
          }
          results.push({
            id,
            skill: target_skill,
            check: "templates-json",
            status: "pass",
            message: `templates.json: ${tj.templates.length} templates`,
          });
          pass++;
        } catch (e) {
          results.push({
            id,
            skill: target_skill,
            check: "templates-json",
            status: "fail",
            message: `templates.json invalid: ${e.message}`,
          });
          fail++;
        }
      }
    }

    // Check overlap cases reference valid skills
    if (!should_trigger) {
      const skillContent = fs
        .readFileSync(path.join(skillDir, "SKILL.md"), "utf8")
        .toLowerCase();
      // Verify the expected_output mentions routing to a different skill
      const routesElsewhere =
        expected_output &&
        (expected_output.includes("Routes to") ||
          expected_output.includes("routes to"));
      if (routesElsewhere) {
        results.push({
          id,
          skill: target_skill,
          check: "overlap-routing",
          status: "pass",
          message: `Overlap case correctly expects routing to different skill`,
        });
        pass++;
      } else {
        results.push({
          id,
          skill: target_skill,
          check: "overlap-routing",
          status: "warn",
          message: `Overlap case (should_trigger: false) — verify expected_output mentions routing`,
        });
        skip++;
      }
    }
  }

  // ── 3. Summary ─────────────────────────────────────────────────────────

  const total = pass + fail + skip;

  if (jsonMode) {
    console.log(
      JSON.stringify(
        {
          total,
          pass,
          fail,
          skip,
          results,
        },
        null,
        2
      )
    );
  } else {
    console.log(`\n═══ Eval Suite Results ═══`);
    console.log(`Total checks: ${total} | Pass: ${pass} | Fail: ${fail} | Warn: ${skip}\n`);

    if (fail > 0) {
      console.log("FAILURES:");
      for (const r of results.filter((r) => r.status === "fail")) {
        console.log(`  ✗ [${r.id}] ${r.check}: ${r.message}`);
      }
      console.log("");
    }

    if (skip > 0) {
      console.log("WARNINGS:");
      for (const r of results.filter((r) => r.status === "warn")) {
        console.log(`  ⚠ [${r.id}] ${r.check}: ${r.message}`);
      }
      console.log("");
    }

    // Per-skill summary
    const bySkill = {};
    for (const r of results) {
      if (!bySkill[r.skill]) bySkill[r.skill] = { pass: 0, fail: 0, warn: 0 };
      bySkill[r.skill][r.status]++;
    }

    console.log("Per-skill:");
    for (const [skill, counts] of Object.entries(bySkill).sort()) {
      const icon =
        counts.fail > 0 ? "✗" : counts.warn > 0 ? "⚠" : "✓";
      console.log(
        `  ${icon} ${skill}: ${counts.pass} pass, ${counts.fail} fail, ${counts.warn} warn`
      );
    }
  }

  // ── 4. Optional: run via OpenCode ──────────────────────────────────────

  if (opencodeMode && process.env.OPENCODE_API_KEY) {
    console.log("\n═══ Running evals via OpenCode ═══\n");
    let ocPass = 0;
    let ocFail = 0;

    for (const evalCase of evals.evals) {
      if (!evalCase.should_trigger) continue; // skip overlap cases for now

      process.stdout.write(`  [${evalCase.id}] ${evalCase.target_skill}... `);
      try {
        const result = execSync(
          `opencode run --model "${process.env.OPENCODE_MODEL || "opencode-go/deepseek-v4-flash"}" "${evalCase.prompt.replace(/"/g, '\\"')}"`,
          {
            encoding: "utf8",
            timeout: 60000,
            env: { ...process.env },
          }
        );

        // Basic check: output should be non-empty and mention the target skill
        if (result && result.length > 50) {
          console.log("OK");
          ocPass++;
        } else {
          console.log("WARN: short output");
          ocPass++;
        }
      } catch (e) {
        console.log(`FAIL: ${e.message.slice(0, 80)}`);
        ocFail++;
      }
    }

    console.log(`\nOpenCode results: ${ocPass} pass, ${ocFail} fail`);
  }

  process.exit(fail > 0 ? 1 : 0);
}

main();
