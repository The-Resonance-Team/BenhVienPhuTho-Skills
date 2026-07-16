# Office output safety and validation

Use this checklist for every generated or modified Office artifact.

## Runtime asset boundary

- Only use templates directly under a skill's `assets/` directory for runtime work.
- Treat `_seed/` and any source bundle containing real hospital, vendor, staff, patient, account, tax, phone, or contract data as private input. Never commit it, expose it through a skill, or copy it into an output directory.
- If the required runtime template is missing, stop and report the missing asset. Do not silently fall back to a private source document.
- Before changing the skill bundle, run `node scripts/validate-runtime-assets.js`. It audits all runtime files for missing assets, malformed placeholders, labeled sensitive values, OfficeCLI command failures, and content warnings.
- The audit reports legacy `MarkupCompatibility`/`Schema` warnings separately; they are not a clean schema pass. Use `--strict-schema` for a new corpus that is expected to be fully OpenXML-valid.

## Safe field handling

- Collect only fields required by the selected template.
- Keep `fields.json` in a permission-restricted temporary location, never print it, never include it in logs, and delete it after the merge and checks finish.
- Ask the user to confirm all inferred, financial, identity, signer, vendor, and patient-related values before using them.
- Do not send hospital or patient data to external forms, cloud services, remote agents, or web APIs unless the user explicitly authorizes the approved destination.

## Required final checks

After `merge` and after any `set`/`batch` table edits:

1. Run `officecli validate <output>` and stop on a validation error. If the selected runtime template has a documented legacy schema warning, record it as a blocker/warning rather than silently calling the output clean.
2. Run `officecli view <output> issues --type content --limit 100` and resolve actionable content issues. `Consecutive spaces` is reported as a layout warning for these forms; the strict gate still blocks every other content finding.
3. Run `officecli view <output> text --json` and confirm no `{{...}}`, source-only placeholder, private seed value, or unintended blank remains.
4. For table edits, re-read the edited cells with `officecli get` and verify the row count, totals, units, and dates.
5. Only then describe the file as generated; otherwise label it as a draft and list the remaining blockers.

For an executable gate, run `node scripts/validate-office-output.js <output.docx|output.xlsx>`; a non-zero exit means the artifact remains a draft.

Validation is a delivery gate, not a cosmetic afterthought: a successful merge only proves that the command ran.
