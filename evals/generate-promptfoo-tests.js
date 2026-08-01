/**
 * Dynamic promptfoo test generator — evals/evals.json stays the single
 * source of truth (CONTEXT.md §3); this just projects each eval case into
 * a promptfoo test case instead of hand-duplicating them in YAML.
 */

const fs = require("node:fs");
const path = require("node:path");

module.exports = async function generatePromptfooTests() {
  const evalsPath = path.join(__dirname, "evals.json");
  const { evals } = JSON.parse(fs.readFileSync(evalsPath, "utf8"));

  return evals.map((evalCase) => ({
    description: `${evalCase.id} (${evalCase.target_skill})`,
    vars: {
      prompt: evalCase.prompt,
    },
    assert: [
      {
        type: "llm-rubric",
        value: evalCase.expected_output,
      },
    ],
    metadata: {
      id: evalCase.id,
      target_skill: evalCase.target_skill,
      should_trigger: evalCase.should_trigger,
    },
  }));
};
