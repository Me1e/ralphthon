# Post Build Polish 4

## Goal
- Remove duplicated questionnaire status logic.
- Prevent `ready` from being set when only one question is fixed.
- Keep published packets as immutable snapshots instead of rendering live review answers.

## Changes Applied
- Added shared questionnaire metrics in `src/lib/demo-store.ts`.
- Centralized review status sync so queue, review room, and publish logic use the same rule.
- Changed answer save flow to derive question status from `answer + citations`.
- Auto-resolved open gap tasks when a question becomes cited.
- Deduplicated gap task creation so repeated submissions update the open task instead of creating duplicates.
- Stored packet question snapshots on publish and rendered packet pages from the packet snapshot.

## Why This Round Matters
- The prior implementation could mark a review `ready` while other questions were still blocked.
- Published packet pages were reading live questionnaire data, which made the packet drift from the published snapshot after edits.
- The same metrics were being recomputed in multiple files with slightly different intent.

## Verification Baseline
- `pnpm run typecheck` ✅
- `pnpm run lint` ✅
- `pnpm run smoke` ✅

## Residual Notes
- This remains an in-memory demo store, so packet history is reset on server restart.
- A future persistent model should distinguish `draft revision ready` from `published snapshot exists` more explicitly.
