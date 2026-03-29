# Build Exploration

## Branch 1. App Skeleton
- Use a single Next.js App Router app under `.tacigent/workspace/app`.
- Route groups:
  - public auth route
  - authenticated app routes
  - buyer packet route
- Keep the authenticated landing route as `/questionnaires`, not a generic dashboard home.

## Branch 2. Persistence Strategy
- Use local SQLite with `better-sqlite3`.
- Use Drizzle for domain tables so the schema remains PG-upgradable.
- Seed demo data directly into the SQLite file during setup.
- No external queue or remote datastore is required for v1.

## Branch 3. Auth Strategy
- Use Better Auth with local email/password.
- Seed one demo user so Playwright can log in deterministically.
- Expose `/api/auth/[...all]` through the Next.js handler.

## Branch 4. Data Loading Strategy
- Use server components for route-level data reads.
- Use client components only for interactive editing surfaces:
  - login form
  - drawers/panels
  - review room answer editing
- Use server actions or route handlers for mutations, but keep payloads small and local.

## Branch 5. Review Room Implementation
- Center the domain around a few typed primitives:
  - `AISystem`
  - `EvidenceItem`
  - `Questionnaire`
  - `Question`
  - `AnswerDraft`
  - `GapTask`
  - `BuyerPacket`
- Enforce one key rule in UI and data:
  - no answer can be marked complete without at least one citation
- Keep mapping deterministic for v1:
  - seeded question-to-system/evidence suggestions
  - manual overrides in UI

## Branch 6. Testing and Verification Strategy
- Write a failing Playwright smoke test first.
- Use the smoke test as the canonical proof of the product promise:
  - login
  - review queue
  - review room
  - packet publish
- Verification order:
  - typecheck
  - lint
  - build
  - production smoke

## Branch 7. Simplification Selector
- Delete:
  - external integrations
  - OCR/document ingestion
  - analytics
  - multi-user collaboration
  - background jobs
- Keep:
  - local auth
  - local DB
  - seeded demo data
  - review room workflow
  - systems/evidence CRUD
  - buyer packet page

## Synthesis

### Chosen Build Shape
- single-host Next.js app
- Better Auth local credentials
- Drizzle + better-sqlite3 for app data
- server-rendered route shells plus targeted client components
- deterministic seeded demo flow

### Why This Wins
- matches the fixed stack
- keeps verification local and reproducible
- gives the judges a real login and persistence story
- preserves room for clean code and crisp demo quality

### Killed Alternatives
- in-memory-only demo store: too flimsy for auth and CRUD credibility
- remote auth or remote DB: unnecessary dependency risk
- full client-state app: adds complexity without benefit
