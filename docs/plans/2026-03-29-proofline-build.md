# Proofline Build Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a runnable desktop-first Next.js app for Proofline that demonstrates login, review queue, review room, systems/evidence upkeep, and buyer packet publishing.

**Architecture:** Use a single Next.js 16 App Router app under `.tacigent/workspace/app` with seeded local domain data, local credential auth, mostly server-rendered route shells, and client components only for interactive editing surfaces. Keep the review room as the primary surface and implement deterministic state transitions so the demo does not rely on external services.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui primitives, lucide-react, Better Auth local credentials, Drizzle ORM, better-sqlite3, Zod, Biome, Playwright

---

### Task 1: Bootstrap the workspace

**Files:**
- Create: `.tacigent/workspace/app/*`
- Modify: `.tacigent/workspace/app/package.json`

**Step 1: Scaffold the Next.js app**

Run:
```bash
pnpm create next-app@latest .tacigent/workspace/app --ts --app --tailwind --eslint=false --src-dir=false --import-alias "@/*" --use-pnpm
```

**Step 2: Install required libraries**

Run:
```bash
cd .tacigent/workspace/app && pnpm add lucide-react better-auth drizzle-orm better-sqlite3 zod clsx tailwind-merge
```

**Step 3: Install dev tooling**

Run:
```bash
cd .tacigent/workspace/app && pnpm add -D @playwright/test @biomejs/biome
```

**Step 4: Verify scaffold boots**

Run:
```bash
cd .tacigent/workspace/app && pnpm exec next telemetry disable
```

### Task 2: Write the failing smoke test first

**Files:**
- Create: `.tacigent/workspace/app/tests/smoke/proofline.spec.ts`
- Create: `.tacigent/workspace/app/playwright.config.ts`

**Step 1: Write the failing test**

Write a smoke test that covers:
- `/login` renders
- seeded login works
- `/questionnaires` shows review rows
- opening a review shows `Publish Packet`
- publishing reaches `/packets/[id]`

**Step 2: Run the smoke test to verify it fails**

Run:
```bash
cd .tacigent/workspace/app && pnpm exec playwright test tests/smoke/proofline.spec.ts
```

Expected: FAIL because routes and UI do not exist yet.

### Task 3: Add project structure and seed data

**Files:**
- Create: `.tacigent/workspace/app/lib/domain.ts`
- Create: `.tacigent/workspace/app/lib/seed-data.ts`
- Create: `.tacigent/workspace/app/lib/utils.ts`
- Create: `.tacigent/workspace/app/lib/auth.ts`

**Step 1: Define domain types**
- `AISystem`
- `EvidenceItem`
- `ReviewQuestion`
- `Questionnaire`
- `GapTask`
- `BuyerPacket`

**Step 2: Add deterministic seed data**
- one demo user
- two AI systems
- several evidence items
- one active buyer review
- one published packet

**Step 3: Add auth helper**
- local credential check against seeded demo user
- cookie/session helper for route protection

### Task 4: Build the app shell and login route

**Files:**
- Create: `.tacigent/workspace/app/app/layout.tsx`
- Create: `.tacigent/workspace/app/app/globals.css`
- Create: `.tacigent/workspace/app/app/login/page.tsx`
- Create: `.tacigent/workspace/app/app/(app)/layout.tsx`
- Create: `.tacigent/workspace/app/components/app-shell.tsx`
- Create: `.tacigent/workspace/app/components/status-chip.tsx`

**Step 1: Implement fonts and global tokens**
- Use `next/font`
- Encode editorial industrial palette and typography tokens

**Step 2: Implement login page**
- proof statement
- credential form
- demo workspace hint

**Step 3: Implement authenticated shell**
- nav rail
- active route states
- keyboard/focus handling

### Task 5: Build Review Queue and Review Room

**Files:**
- Create: `.tacigent/workspace/app/app/(app)/questionnaires/page.tsx`
- Create: `.tacigent/workspace/app/app/(app)/questionnaires/[id]/page.tsx`
- Create: `.tacigent/workspace/app/components/review-queue-table.tsx`
- Create: `.tacigent/workspace/app/components/review-room.tsx`
- Create: `.tacigent/workspace/app/components/coverage-header.tsx`
- Create: `.tacigent/workspace/app/components/citation-chip-group.tsx`

**Step 1: Implement queue list**
- dense rows
- status counts
- open review CTA

**Step 2: Implement review room**
- question rail
- answer canvas
- evidence ledger
- gap task panel
- publish action

**Step 3: Wire deterministic state transitions**
- answer save
- add citation
- create gap
- packet publish

### Task 6: Build Systems and Evidence routes

**Files:**
- Create: `.tacigent/workspace/app/app/(app)/systems/page.tsx`
- Create: `.tacigent/workspace/app/app/(app)/evidence/page.tsx`
- Create: `.tacigent/workspace/app/components/system-drawer.tsx`
- Create: `.tacigent/workspace/app/components/evidence-panel.tsx`

**Step 1: Implement systems CRUD surface**
- create/edit/archive local records

**Step 2: Implement evidence CRUD surface**
- create/edit/archive evidence
- link evidence to systems

**Step 3: Confirm route density and keyboard path**

### Task 7: Build buyer packet view

**Files:**
- Create: `.tacigent/workspace/app/app/packets/[id]/page.tsx`
- Create: `.tacigent/workspace/app/components/packet-section.tsx`

**Step 1: Implement packet page**
- editorial layout
- proof summary strip
- cited question sections
- share action

**Step 2: Implement stale/error messaging**

### Task 8: Add lint, typecheck, and smoke scripts

**Files:**
- Modify: `.tacigent/workspace/app/package.json`
- Create: `.tacigent/workspace/app/biome.json`

**Step 1: Add scripts**
- `lint`
- `typecheck`
- `build`
- `smoke`

**Step 2: Make Playwright target production server**

### Task 9: Green the smoke test

**Files:**
- Modify: all route/component files from tasks 4-7 as needed

**Step 1: Run smoke test**

Run:
```bash
cd .tacigent/workspace/app && pnpm exec playwright test tests/smoke/proofline.spec.ts
```

**Step 2: Fix failures until green**

**Step 3: Re-run smoke**

### Task 10: Full verification

**Files:**
- Modify: build artifacts only if verification reveals issues

**Step 1: Typecheck**

Run:
```bash
cd .tacigent/workspace/app && pnpm exec tsc --noEmit
```

**Step 2: Lint**

Run:
```bash
cd .tacigent/workspace/app && pnpm run lint
```

**Step 3: Production build**

Run:
```bash
cd .tacigent/workspace/app && pnpm run build
```

**Step 4: Production smoke**

Run:
```bash
cd .tacigent/workspace/app && pnpm run smoke
```
