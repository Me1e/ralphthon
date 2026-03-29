# Post-Build Polish 2

Focus: edge cases, loading, and empty states

## What I changed

- added a reusable loading panel and route loading states for the authenticated desk and packet view
- added a global `error.tsx` recovery surface
- added a global `not-found.tsx` fallback with queue/login escape hatches
- added empty states to `Systems` and `Evidence`
- added placeholders and `required` attributes to the key forms
- marked login error feedback with `aria-live`

## Why

- the previous build handled the happy path well but gave little guidance when a route was missing or still loading
- empty data screens were visually abrupt
- forms allowed blank submission attempts too easily

## Verification

- `pnpm run typecheck` passed
- `pnpm run lint` passed
- `pnpm run smoke` passed

## Remaining edge-case debt

- server actions still rely on HTML validation rather than structured server error messages
- no optimistic validation summary exists for create/archive actions
