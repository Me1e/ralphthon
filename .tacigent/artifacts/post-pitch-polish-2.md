# Post Pitch Polish 2

## Goal
- Verify that major claims are either source-backed or explicitly marked as inferred.
- Remove visuals that looked quantitative without having real evidence behind them.

## Changes Applied
- Rewrote `Why This Problem, Now` in `pitch/pre-read.md` so the buyer-pressure claim is marked as inference.
- Added an explicit inferred row to the claim-evidence table in the pre-read.
- Reworked the `Problem` and `Why Now` slides in `pitch/index.html`:
  - removed pseudo-quantified bars
  - marked the buyer-pressure claim as inferred
  - kept source-backed regulatory and vendor-activity claims intact
- Stabilized smoke navigation assertions in `tests/smoke/proofline.spec.ts` after one flaky verify run exposed a client-side route transition race.

## Verification Baseline
- `pnpm run verify` ✅

## Outcome
- The pitch now distinguishes:
  - verified claims
  - supported category evidence
  - inferred market implications
- The deck is less likely to trigger credibility pushback from judges who notice unsupported precision.
