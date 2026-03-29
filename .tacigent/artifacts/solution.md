# Solution

## Selected Title
- `Proofline`

## Canonical Solution Direction
Proofline는 AI buyer review를 위한 review-native response ops workspace다. 각 inbound question을 현재 AI system record와 evidence에 연결하고, citation-backed answer draft와 remediation task를 동시에 만들어 buyer-ready packet으로 마감한다.

## Core Mechanism
- review room이 중심이다
- 각 질문은 반드시 typed `AISystem`과 `EvidenceItem`에 매핑된다
- citation이 없는 답변은 `complete`가 될 수 없다
- 근거가 부족하면 답변을 억지로 채우지 않고 `GapTask`로 승격한다
- 최종 출력은 buyer-ready packet이다

## Primary User Promise
- `첫 AI buyer review를 uncited answer 없이 citation-backed buyer-ready packet으로 전환한다`

## Why This Wins
- trust center보다 review execution에 가깝다
- generic questionnaire autocomplete보다 현재 AI system state를 더 정확히 반영한다
- heavy governance suite보다 좁고 빠르게 가치를 보여준다
- typed primitives를 남겨 future platform depth도 확보한다

## Key Workflow
1. user signs in
2. user creates minimal AI system records
3. user adds supporting evidence items
4. user imports or seeds an inbound questionnaire
5. user opens the review room for one questionnaire
6. system maps questions to systems/evidence and drafts cited answers
7. unresolved questions become remediation tasks
8. user publishes a buyer-ready packet and opens the buyer-facing packet view

## MVP Scope
- in scope:
  - local credential auth
  - desktop-first UI
  - systems CRUD
  - evidence CRUD
  - questionnaire CRUD/import
  - answer drafting with citations
  - gap task creation and updates
  - buyer packet publish page
- out of scope:
  - external integrations
  - OCR-grade file parsing
  - multi-workspace collaboration
  - analytics and reporting
  - public trust portal

## Screen Inventory
- `/login`
- `/systems`
- `/evidence`
- `/questionnaires`
- `/questionnaires/[id]`
- `/packets/[id]`

## Full Feature Set
- authentication
- seeded demo workspace
- AI system create/edit/archive
- evidence create/edit/archive with system linkage
- questionnaire create/edit/archive/import
- per-question mapping to systems and evidence
- answer draft editing
- citation chips / traceability
- task board for gaps
- packet status and buyer-facing published packet view

## Data Model
- `User`
- `Workspace`
- `AISystem`
- `EvidenceItem`
- `Questionnaire`
- `Question`
- `QuestionMapping`
- `AnswerDraft`
- `Citation`
- `GapTask`
- `BuyerPacket`

## Build Constraints
- must work with local seeded data
- must not depend on external APIs to complete the core flow
- must support at least one CRUD flow across systems, evidence, questionnaires, and tasks
- must keep the review room as the primary surface, not a secondary page behind a generic dashboard
- must show buyer packet generation end-to-end
- must remain simpler than an enterprise GRC suite

## Risk Profile
- Product risk: users may expect deeper document ingestion or policy frameworks than v1 provides
- Market risk: incumbents can claim adjacent coverage
- Build risk: mapping logic could sprawl if not constrained to seeded schemas
- Narrative risk: if pitched as generic compliance software, differentiation collapses

## Confidence
- readiness: `ready`
- confidenceSummary: problem fit and buildability are both strong; differentiation depends on keeping the unit of work centered on the live review room

## Assumptions
- users will accept a seeded/manual questionnaire ingestion path in v1
- citation-backed drafts are more compelling than plain autocomplete in demo and buyer narrative
- minimal system records are sufficient to prove the wedge without full governance-program breadth

## Anchor Ledger
- preserved:
  - revenue-critical buyer review pain
  - platform depth expectation
  - demo-quality end-to-end workflow
- extended:
  - selected public title `Proofline`
  - typed evidence graph as differentiating mechanism
- de-risked:
  - no external integrations
  - deterministic fallback for drafting/mapping
- deviated:
  - no generic trust center or full AI governance suite
  - rationale: both lose either wedge sharpness or build safety
