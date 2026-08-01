#!/usr/bin/env node
/**
 * promptfoo exec provider — wraps `opencode run` so a behavior-run test
 * case becomes: send the eval prompt to OpenCode (skills already installed
 * via `npx skills add .`, pointed at the self-hosted model via
 * OPENCODE_CONFIG=evals/opencode.ci.jsonc), capture its final answer, and
 * hand that text back to promptfoo as this provider's output.
 *
 * Invoked by promptfoo as: node opencode-exec-provider.js <prompt> <optionsJSON> <contextJSON>
 * (see providers: - 'exec: node opencode-exec-provider.js' in promptfooconfig.yaml)
 *
 * promptfoo sets basePath to the directory containing promptfooconfig.yaml,
 * so the relative path above is correct from that working directory. The
 * optionsJSON and contextJSON args are ignored — `opencode run` takes a
 * single message argument, and forwarding those blobs as extra positional
 * args would get concatenated into the prompt itself.
 */

const { execFileSync } = require("node:child_process");

const MODEL = process.env.BVPT_OPENCODE_MODEL || "bvpt/Qwen3.6-35B-A3B-NVFP4";
const TIMEOUT_MS = Number(process.env.BVPT_OPENCODE_TIMEOUT_MS || 180000);

function main() {
  const prompt = process.argv[2];
  if (!prompt) {
    process.stderr.write("opencode-exec-provider: missing prompt argument\n");
    process.exit(1);
  }

  const output = execFileSync("opencode", ["run", "--model", MODEL, prompt], {
    encoding: "utf8",
    timeout: TIMEOUT_MS,
    maxBuffer: 16 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });

  process.stdout.write(output);
}

main();
