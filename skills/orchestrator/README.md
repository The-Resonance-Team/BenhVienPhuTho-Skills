# Skill Orchestrator

Parallel document generation for BVPhuTho skills.

## What it does

When a domain skill (phong-ktda, phong-vattu, phong-hcqt) needs to generate 3+ documents, it calls this orchestrator to run merge/validate/set in parallel via sub-agents.

## How it works

1. Domain skill collects all fields from user
2. Domain skill writes `fields.json` + `manifest.json`
3. Domain skill invokes orchestrator via `task` tool
4. Orchestrator validates, resolves dependencies, spawns workers
5. Workers run `officecli merge` → `validate` → `set`
6. Results collected, summary presented, files auto-opened

## Files

| File | Purpose |
|---|---|
| `SKILL.md` | Main orchestrator instructions |
| `references/required-fields.md` | Minimum fields per template type |
| `references/example-phong-ktda.md` | Full example for phong-ktda workflow |

## Usage from domain skill

```bash
# 1. Create temp directory (cross-platform)
ORCH_DIR="${TMPDIR:-/tmp}/orchestrator-work/<skill-name>/<package>"
mkdir -p "$ORCH_DIR"

# 2. Write fields.json
# 3. Write manifest.json
# 4. Call orchestrator via task tool:
task(
  subagent_type: "general",
  description: "Orchestrator: generate documents",
  prompt: """
    Load skill orchestrator.
    Read $ORCH_DIR/manifest.json
    Read $ORCH_DIR/fields.json
    Execute orchestration flow as defined in SKILL.md.
  """
)
```

## Error handling

- Failed templates are skipped, not retried
- Dependent templates are also skipped
- Error report generated for user to copy and send to dev
- Successful files are still presented to user

## Configuration

| Parameter | Default | Description |
|---|---|---|
| `concurrency` | 3 | Max parallel workers |
| `outputDir` | `./output/<skill>/` | Where to write generated files |
