# Design Exploration

## Branch 1. Information Architecture Compression

### Primary Navigation
- `Review Queue`
- `Systems`
- `Evidence`

### Secondary Navigation
- `Packets`
- `Workspace`

### IA Decision
- No generic dashboard home.
- Post-login default surface is the review queue because the product promise is tied to an active buyer review, not passive monitoring.

### Labeling Rules
- use operator language, not compliance jargon
- `Questionnaires` can be labeled as `Review Queue` in UI while route remains `/questionnaires`
- prefer `Gap`, `Evidence`, `Owner`, `Packet`, `Cited`, `Blocked`

## Branch 2. Task Flow Graph

### Happy Path
1. Sign in
2. Open seeded review queue
3. Open a buyer review
4. See which questions are cited, partial, or blocked
5. Create or update a linked AI system record if needed
6. Add or edit evidence
7. Return to review room and resolve gaps
8. Publish packet
9. Open buyer-facing packet view

### Failure Path
1. User opens review with missing system mapping
2. Review room marks question as blocked
3. User creates system/evidence
4. Blocked state returns to draft/cited
5. Packet publish becomes available

## Branch 3. Review Queue Surface

### Screen Job
- let the operator choose the most urgent buyer review and see its readiness instantly

### Primary Action
- `Open Review Room`

### First-Noticed Element
- status-weighted review list with clear `Cited / Gaps / Blocked` counts

### Layout Grammar
- left: compact nav rail
- center: dense list/table of reviews
- right: small urgency summary strip, not a card gallery

### Rationale
- queue list fits the product better than KPI cards
- urgency is communicated by work state, not vanity metrics

## Branch 4. Review Room Surface

### Screen Job
- resolve one buyer review to a publishable state

### Primary Action
- `Publish Packet`

### First-Noticed Element
- coverage header showing `cited`, `needs review`, `blocked`

### Layout Grammar
- left rail: question index and status chips
- center canvas: selected question, answer draft, citations
- right rail: linked systems, evidence drawer, gap task panel

### Distinctive Decision
- treat the screen like a working editorial desk, not a dashboard
- center canvas reads like a document under review
- right rail behaves like a live evidence ledger

## Branch 5. Systems / Evidence Management Surfaces

### `/systems`
- screen job: maintain the minimal AI system records needed to answer reviews
- primary action: `New System`
- first-noticed element: system roster with owner and review coverage count
- layout: list/table + detail editor drawer

### `/evidence`
- screen job: store and link reusable proof items
- primary action: `Add Evidence`
- first-noticed element: evidence list grouped by linked system and evidence strength
- layout: list/table + metadata panel

### Design Constraint
- both screens are operator management surfaces, so density is acceptable
- avoid decorative cards; use structured rows, inline tags, and precise metadata

## Branch 6. Packet Surface + Visual Direction

### `/packets/[id]`
- screen job: present a buyer-facing, human-readable packet
- primary action: `Copy Share Link` or `Back to Review`
- first-noticed element: packet header with workspace name, review status, and proof summary
- layout: editorial document with anchored table of contents and cited sections

### Visual Direction Options

#### Rejected: Flat generic SaaS
- reason: looks like starter-kit shadcn
- failure: logo-swap test fails immediately

#### Rejected: Glass AI workspace
- reason: too trend-driven and weak on trust/legal tone
- failure: product reads like agent console, not buyer review tool

#### Accepted: Editorial industrial control-room
- palette:
  - bone background
  - charcoal ink
  - oxidized teal for cited/verified
  - amber for caution/gaps
  - rust for blocked or missing proof
- typography:
  - `Newsreader` for page titles and packet headings
  - `IBM Plex Sans` for UI/body
  - `IBM Plex Mono` for metadata, chips, citations
- shape language:
  - restrained radius
  - visible borders
  - section dividers and ruled lines
  - paper/grain undertone, subtle only

## Branch 7. Accessibility and Buildability Selector

### Accessibility Contract Direction
- high-contrast light theme
- focus-visible rings on all interactive controls
- status never color-only: icon + text + tone
- question index keyboard reachable
- buyer packet has semantic heading hierarchy and table/list structure

### Buildability Check
- all screens map cleanly to Tailwind layout primitives and shadcn base components
- distinctive layer comes from typography, tokens, borders, and layout grammar rather than exotic rendering
- no motion-heavy dependency is required

## Synthesis

### Selected Design Direction
- `editorial industrial control-room`

### Why It Wins
- it visually matches document review, evidence, and buyer trust better than a generic SaaS shell
- it gives the review room a strong center of gravity
- it stays build-safe with standard React/Tailwind composition

### Key Anti-Generic Decisions
- no KPI hero dashboard
- no card grid as the main story
- no purple gradient AI aesthetic
- no library-default rounded panels and shadows as the main identity

### Ready For Contract
- route set is stable
- screen jobs are clear
- happy and failure paths are both defined
- visual system is specific enough to encode into tokens and style anchors
