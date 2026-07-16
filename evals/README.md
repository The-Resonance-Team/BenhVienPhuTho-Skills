# Skill eval suite

`evals.json` contains routing and safety regression cases for every active
skill in this plugin. Each skill has two positive cases and one overlap or
negative case. The expected outputs intentionally check boundaries that are
easy to regress: runtime asset availability, approval gates, PHI handling,
temporary field data, and final Office validation/read-back.

Run the cases through the host's skill evaluator. This file defines prompts
and expected behavior; it does not pretend to prove behavior until the cases
are executed.
