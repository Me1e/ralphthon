# Design

## Design Thesis
Proofline는 generic SaaS dashboard가 아니라 `buyer review desk`처럼 보여야 한다. 사용자는 KPI를 구경하러 오는 것이 아니라, 하나의 AI buyer review를 빠르게 풀고 packet으로 닫으러 온다. 따라서 디자인의 중심은 overview card가 아니라 review room이며, 시각 언어는 trust document의 무게감과 operator tool의 정밀함을 동시에 가져야 한다.

## Information Architecture

### Primary Navigation
- Review Queue
- Systems
- Evidence

### Contextual Navigation
- Packet view는 review room에서 진입한다
- Settings/workspace shell은 v1에서 전면 노출하지 않는다

### Task Groups
- Review execution
- Source upkeep
- Packet delivery

### Labeling Rules
- `Questionnaire`보다 `Review`를 우선 사용한다
- 상태 라벨은 `Cited`, `Needs Review`, `Blocked`, `Published`로 통일한다
- `Missing proof`, `Owner needed` 같은 product-specific language를 사용한다

## Task Flow Graph

### Happy Path
1. Login
2. Review Queue 진입
3. 특정 review 선택
4. Review Room에서 질문 상태 확인
5. Systems/Evidence 보강
6. Answer + citation 완성
7. Gap task 해결 또는 acknowledge
8. Packet publish
9. Buyer-facing packet 확인

### Failure Path
1. Review Room에서 blocked question 발견
2. `Create System` 또는 `Add Evidence` CTA 선택
3. 필요한 record 생성/수정
4. Review Room 복귀
5. 상태가 `Blocked`에서 `Needs Review` 또는 `Cited`로 이동

## Screen Specs

### 1. `/login`
- job: workspace 진입
- primary action: `Sign In`
- first-noticed element: `Proofline` title and concise promise
- layout: centered split-intro form, left proof statement, right credential form
- key modules:
  - title/promise block
  - email/password form
  - demo workspace hint

### 2. `/questionnaires` surfaced as `Review Queue`
- job: 지금 처리할 buyer review를 선택한다
- primary action: `Open Review Room`
- first-noticed element: status-weighted review rows with counts for `Cited / Needs Review / Blocked`
- layout: left nav rail, central dense review table/list
- key modules:
  - queue header with filter tabs
  - review rows with company, due date, status counts, owner
  - inline CTA per row
- anti-generic rule: no metric cards across the top

### 3. `/questionnaires/[id]` surfaced as `Review Room`
- job: 하나의 buyer review를 publishable state로 만든다
- primary action: immediate `Save Answer` / `Create Gap Task`, terminal `Publish Packet`
- first-noticed element: coverage header with cited/blocked state
- interaction hierarchy: center canvas actions first, publish action last
- layout: three-column desk
  - left: question index
  - center: answer canvas
  - right: evidence ledger + task panel
- key modules:
  - review header
  - question list with icons and state text
  - answer editor
  - citation chips
  - linked system summary
  - gap task composer
  - publish action area

### 4. `/systems`
- job: review answering에 필요한 minimal AI system record를 유지한다
- primary action: `New System`
- first-noticed element: system roster with owner and linked evidence count
- layout: dense list + detail drawer/editor
- key modules:
  - system list
  - status filters
  - create/edit drawer
  - linked evidence preview

### 5. `/evidence`
- job: reusable proof item을 추가, 수정, 연결한다
- primary action: `Add Evidence`
- first-noticed element: evidence list grouped by system and strength
- layout: dense list + metadata panel
- key modules:
  - evidence rows
  - type/source badges
  - linked systems
  - edit panel

### 6. `/packets/[id]`
- job: buyer에게 보여줄 최종 packet을 읽기 쉽게 제시한다
- primary action: `Copy Share Link`
- first-noticed element: packet header with status, review name, generated timestamp
- layout: editorial document with anchored table of contents
- key modules:
  - packet header
  - proof summary strip
  - question/answer sections
  - citations list
  - unresolved or excluded items note

## Visual Direction

### Theme
- `Editorial Industrial Control-Room`

### Palette
- background: warm bone
- panel: lighter bone / paper
- text: charcoal ink
- border: muted stone
- accent-success: oxidized teal
- accent-warning: amber
- accent-blocked: rust

### Typography
- display/headings: `Newsreader`
- UI/body: `IBM Plex Sans`
- metadata/citations/status: `IBM Plex Mono`

### Layout Grammar
- shell pages: nav rail + single dominant work surface
- management pages: dense rows, inline metadata, minimal card usage
- review room: left navigator, center document canvas, right evidence ledger
- packet page: document-first editorial flow

### Style Anchors
- ruled dividers
- mono status chips
- visible but restrained borders
- document-grade spacing, not landing-page spacing
- subtle paper undertone only

## Component Strategy

### Reused Families
- shell/nav
- data rows
- status chips
- side drawers/panels
- packet section blocks

### New Wrappers Allowed
- review room coverage header
- citation chip group
- packet proof summary strip

## State Specs

### Required Across Primary Surfaces
- loading
- empty
- error
- blocked
- success/published

### Required Interaction States
- hover
- focus-visible
- pressed
- disabled

### Product-Specific Copy Rules
- blocked: `Missing proof` or `Owner needed`
- empty review queue: `No active reviews yet`
- empty systems: `Add your first AI system`
- empty evidence: `Start with one proof item`

## Accessibility Contract
- contrast stays high on the light theme
- status is never color-only; icon + text required
- all row actions and nav items expose visible focus rings
- review room question index is fully keyboard navigable
- packet page uses semantic heading hierarchy and accessible lists/tables
- reduced motion respected

## Motion Rules
- minimal and purposeful only
- 140-220ms for hover/focus/panel transitions
- publish success can use one restrained highlight state, not celebratory animation
- loading uses skeleton rows/panels, not spinner-only blocking

## Style Constraints
- no purple gradients
- no hero-metric-card dashboard shell
- no glassmorphism
- no library-default radius/shadow as final identity
- no texture heavy enough to reduce readability
- no decorative choice that weakens document trust or review clarity

## Drift Sentinels
- if the first screen after login becomes a metric dashboard, design drift occurred
- if the review room center canvas stops reading like a document under review, drift occurred
- if packet view looks like an export modal instead of a buyer-facing proof page, drift occurred
- if status is communicated by color only, drift occurred

## Validation Checks
- 10-second test: reviewer can explain each screen job and primary action in 10 seconds
- blur test: review room still reads as `question list -> answer canvas -> evidence ledger`
- logo-swap test: replacing the logo still leaves a trust-review product, not a generic SaaS dashboard

## Ready For Dev
- readyForDev: `true`
- rationale: route inventory, state completeness, accessibility, component reuse budget, and anti-generic sentinels are all explicit
