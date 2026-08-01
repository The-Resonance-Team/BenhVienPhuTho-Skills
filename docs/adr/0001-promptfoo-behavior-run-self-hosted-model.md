---
status: accepted
---

# Behavior run uses promptfoo + OpenCode against a self-hosted vLLM model, self-judged, report-only

The `run-evals via OpenCode` job in `eval.yml` called a remote paid model (`opencode-go/deepseek-v4-flash`) and only checked that output was non-empty — it never actually graded skill-routing or agent behavior. We replaced it with a **behavior run**: promptfoo drives OpenCode (with this checkout's skills installed via `npx skills add .`) against our own self-hosted vLLM endpoint (`bvpt/Qwen3.6-35B-A3B-NVFP4`), and grades every one of the 36 eval cases with `llm-rubric` using that same model as the judge. We chose self-judging over a second, higher-quality judge because no other model was available in this environment without adding a second paid dependency; we made the job **report-only** (never fails CI) specifically to absorb the known risk that a model grading its own output is biased toward passing itself.

## Considered Options

- **Routing-only test** (prompt = skill catalog, deterministic assert on picked name) — cheaper and judge-free, but doesn't exercise agent behavior (asks for missing fields, doesn't fabricate PHI, stops before signature). Rejected: we explicitly want full agentic behavior coverage.
- **Remote judge model** (keep generation local, grade with a hosted API) — better judge quality, but reintroduces the API-key/cost dependency this change was meant to remove, and needs a second provider secret. Rejected for now; revisit if self-judge false-negative/positive rate proves unworkable.
- **Blocking CI** (fail the job on any failed assertion) — rejected until the self-judge's reliability is proven; a noisy judge that turns every PR red trains people to ignore it.

## Consequences

- CI now has a hard dependency on `api-bvpt.resonance.io.vn` being reachable and serving `Qwen3.6-35B-A3B-NVFP4` under that exact model ID; if the served model changes, `evals/opencode.ci.jsonc` and `evals/promptfooconfig.yaml` need updating.
- Self-judge results are directional, not authoritative — treat a green behavior run as "nothing obviously changed," not as proof of correctness. Revisit blocking + judge quality once a track record exists.
