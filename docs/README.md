# Documentation Map

This directory holds the project harness and any product contract derived from a
future user-provided spec.

## Main Files

- `HARNESS.md`: how humans and agents collaborate.
- `FEATURE_INTAKE.md`: how prompts become tiny, normal, or high-risk work.
- `ARCHITECTURE.md`: architecture discovery and boundary rules.
- `TEST_MATRIX.md`: legacy proof map; current proof status is queried with
  `scripts/bin/harness-cli query matrix`.
- `HARNESS_BACKLOG.md`: legacy improvement list; current improvement records
  are stored with `scripts/bin/harness-cli backlog`.
- `GLOSSARY.md`: shared terms.

## Folders

- `product/`: current product truth, empty until a spec is derived.
- `stories/`: feature packets and backlog.
- `decisions/`: durable decisions and tradeoffs.
- `demo/`: concrete walkthroughs that show how the harness transforms input into agent-ready work.
- `templates/`: reusable spec-intake, story, plan, decision, and validation formats.

## Spec Intake

- `spec-intake/2026-06-08-my-landing-page.md` — brownfield intake record (historical snapshot).

## Current State

Application is implemented (Next.js landing page). Harness v0 is active with
product contract, story backlog, and durable CLI records. Ongoing work enters
through feature intake, not by extending the spec-intake file.
