# Post-Build Polish 3

Focus: design-contract gap closure

## What I changed

- disabled `Publish Packet` in the review room until blocked and needs-review counts both reach zero
- enforced the same publish guard in server-side packet creation logic
- added buyer-packet document affordances:
  - `Copy Share Link`
  - `Back to Review`
  - table of contents with anchor links

## Why

- the design contract explicitly required publish to remain disabled while uncited work remained
- the packet needed to feel like a document surface, not just a plain output page
- share/back affordances make the packet closer to a real buyer-facing artifact

## Verification

- `pnpm run typecheck` passed
- `pnpm run lint` passed
- `pnpm run smoke` passed

## Remaining design debt

- stale packet state is still not modeled
- systems and evidence screens still use side-form composition instead of a true detail drawer
