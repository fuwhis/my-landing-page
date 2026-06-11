# US-004 CI Quality Gate

## Status

implemented

## Lane

normal

## Product Contract

Every merge to `main` or `feature/preview` passes lint, prettier, and production build in CI.

## Relevant Product Docs

- `docs/product/deployment.md`

## Acceptance Criteria

- `.github/workflows/ci.yml` runs `npm ci`, `lint:check`, `prettier:check`, `build`.
- Node 22 matches README requirements.

## Validation

| Layer    | Expected proof                                                  |
| -------- | --------------------------------------------------------------- |
| Platform | `npm run lint:check && npm run prettier:check && npm run build` |
| Release  | GitHub Actions on PR                                            |

## Evidence

- Workflow file at `.github/workflows/ci.yml`
