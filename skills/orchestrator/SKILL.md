---
name: orchestrator
description: "Orchestrator for parallel document generation. Domain skills call this when a task requires processing multiple templates (3+). Handles parallel merge/validate/set via sub-agents, error recovery, and result presentation. Use when a skill needs to generate many documents at once and the task is too large for a single agent context."
---

# Orchestrator — Parallel Document Generation

## What this does

Domain skills (phong-ktda, phong-vattu, phong-hcqt, etc.) call this orchestrator when a task requires generating **3+ documents**. The orchestrator:

1. Reads `fields.json` + `manifest.json` from the calling skill
2. Validates required fields per template
3. Spawns parallel sub-agents (workers) via `task` tool
4. Each worker runs: `officecli merge` → `officecli validate` → `officecli set` (if rows needed)
5. Collects results, presents summary to user
6. Auto-opens generated files

## When to use

- User requests a **full document set** (bộ hồ sơ), not just one document
- Task requires processing **3+ templates** in one workflow
- Domain skill's context would explode trying to handle everything sequentially

## When NOT to use

- Single document generation — domain skill handles this directly
- Task requires heavy conversation/negotiation — domain skill owns that

## How domain skills call this

The domain skill writes two files to a temp directory, then invokes the orchestrator:

```bash
# Domain skill creates these files:
# 1. /tmp/skill-run/<skill-name>/<package>/fields.json
# 2. /tmp/skill-run/<skill-name>/<package>/manifest.json

# Then calls orchestrator via task tool (see "Spawning workers" below)
```

### manifest.json format

```json
{
  "skill": "phong-ktda",
  "package": "chi-dinh-thau-dich-vu",
  "outputDir": "./output/phong-ktda/chi-dinh-thau-dich-vu/",
  "concurrency": 3,
  "fields": {
    "TEN_GOI_THAU": "...",
    "DU_TOAN": "...",
    "PHONG_BAN": "Kế toán dự án",
    ...
  },
  "templates": [
    {
      "slug": "don-de-xuat-ktda",
      "output": "don-de-xuat.docx",
      "depends": []
    },
    {
      "slug": "to-trinh-du-toan-khlcnt",
      "output": "to-trinh-du-toan.docx",
      "depends": []
    },
    {
      "slug": "qd-phe-duyet-du-toan-khlcnt",
      "output": "qd-phe-duyet-du-toan.docx",
      "depends": ["to-trinh-du-toan-khlcnt"]
    },
    {
      "slug": "hop-dong",
      "output": "hop-dong-kinh-te.docx",
      "depends": ["qd-phe-duyet-kqlcnt"]
    }
  ]
}
```

### fields.json format

```json
{
  "TEN_GOI_THAU": "Mua sắm băng ghim và dụng cụ cắt khâu nối",
  "DU_TOAN": "462569000",
  "DU_TOAN_BANG_CHU": "Bốn trăm sáu mươi hai triệu năm trăm sáu mươi chín nghìn đồng",
  "PHONG_BAN": "Kế toán dự án",
  "NGAY_KY": "29",
  "THANG_KY": "07",
  "NAM_KY": "2026",
  ...
}
```

## Orchestration flow

### Step 1: Validate manifest

Before spawning any worker, validate:

1. `manifest.json` exists and is valid JSON
2. `fields.json` exists and is valid JSON
3. `outputDir` exists or can be created
4. For each template in `templates`:
   - Check all `depends` entries exist in `templates` array
   - Check required fields exist in `fields.json` (see `references/required-fields.md`)
   - If missing fields → mark template as `skipped`, add to error report

### Step 2: Resolve dependency order

```
1. Build dependency graph from templates[].depends
2. Topological sort → execution batches
3. Templates with no dependencies → Batch 1 (parallel)
4. Templates depending only on Batch 1 → Batch 2 (parallel)
5. Continue until all resolved or skipped
```

### Step 3: Spawn workers

For each batch, spawn workers via `task` tool:

```
task(
  subagent_type: "general",
  description: "Merge template: <slug>",
  prompt: """
    You are a document generation worker. Your job is strictly mechanical.

    Given:
    - Template: skills/<skill-name>/assets/<slug>.docx
    - Fields: /tmp/skill-run/<skill-name>/<package>/fields.json
    - Output: <outputDir>/<output-filename>

    Steps:
    1. Read fields.json
    2. Run: officecli merge <template> <output> --data <fields.json path>
    3. Run: officecli validate <output>
    4. Run: officecli view <output> issues --type content --limit 100
    5. If template has table rows (see manifest.rows):
       - Run: officecli get <output> "/body/tbl[N]/tr[R]" to inspect current state
       - Run: officecli set <output> "/body/tbl[N]/tr[R]/tc[C]" --prop text="value" for each cell
    6. Run: officecli view <output> text --json to verify no {{...}} placeholders remain

    Return EXACTLY this JSON format:
    {
      "slug": "<slug>",
      "status": "success" | "error" | "skipped",
      "outputPath": "<absolute path to output file>",
      "error": null | "<error message if failed>",
      "step_failed": null | "merge" | "validate" | "set" | "verify"
    }

    Rules:
    - Do NOT ask user questions — this is a mechanical task
    - Do NOT read SKILL.md — you have all needed data in fields.json
    - If any step fails, return error immediately, do not continue
    - If validate fails, include the full validation output in error message
  """
)
```

### Step 4: Collect results

As workers complete, collect results into a summary:

```
Results for <skill-name> — <package>:

✅ don-de-xuat.docx
✅ to-trinh-du-toan.docx
✅ qd-phe-duyet-du-toan.docx
❌ hop-dong-kinh-te.docx — validate failed: missing field SO_HOP_DONG

Files generated: 3/4
Output directory: ./output/phong-ktda/chi-dinh-thau-dich-vu/
```

### Step 5: Error report

For each failed template, generate a report the user can copy:

```
--- ERROR REPORT (copy this to report to dev) ---
Skill: phong-ktda
Template: hop-dong-kinh-te.docx
Step failed: validate
Error: {{SO_HOP_DONG}} placeholder remaining — field not in fields.json
Manifest: /tmp/skill-run/phong-ktda/chi-dinh-thau-dich-vu/manifest.json
Fields: /tmp/skill-run/phong-ktda/chi-dinh-thau-dich-vu/fields.json
Timestamp: 2026-07-29T10:30:00Z
--- END REPORT ---
```

### Step 6: Auto-open files

After presenting results, auto-open the output directory:

```bash
open <outputDir>  # macOS
# or
xdg-open <outputDir>  # Linux
```

## Concurrency control

Default concurrency: **3 workers at a time**.

The orchestrator spawns workers in batches:
- Batch 1: min(concurrency, templates_without_deps) workers
- Wait for all to complete
- Batch 2: next batch of ready templates
- Continue until done

If user wants different concurrency, domain skill can set `manifest.concurrency`.

## Template slug resolution

Template slugs map to files in the domain skill's `assets/` directory:

```
slug "don-de-xuat-ktda" → skills/phong-ktda/assets/don-de-xuat-ktda.docx
slug "to-trinh-khlcnt-vattu" → skills/phong-vattu/assets/to-trinh-khlcnt-vattu.docx
```

The orchestrator resolves: `skills/<manifest.skill>/assets/<slug>.docx`

## Officecli guardrails

Workers MUST follow these rules (same as domain skills):

- **优先 officecli** cho mọi thao tác .docx/.xlsx
- Kiểm tra `officecli --version` mỗi session
- **KHÔNG dùng** `textutil -convert docx`
- Nếu `officecli validate` fail → include full error in report
- Merge chỉ trên file trong `assets/` — không tạo bố cục mới
- Không bịa dữ liệu — chỉ dùng giá trị có trong `fields.json`

## Required fields by template type

See `references/required-fields.md` for the minimum fields each template type needs.

## After orchestration completes

1. Domain skill presents summary to user
2. Domain skill auto-opens output directory
3. Domain skill asks if user wants to fix failed templates or proceed
4. If user wants to fix: domain skill collects missing fields, updates fields.json, re-runs failed templates only

## Data governance

- `fields.json` and `manifest.json` are TEMPORARY — delete after session
- Do NOT commit these files to repo
- Do NOT include sensitive data (patient names, account numbers) in fields.json unless explicitly approved
- Generated .docx files are in workspace — user decides what to do with them
