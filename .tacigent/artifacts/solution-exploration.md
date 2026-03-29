# Solution Exploration

Date anchor: `2026-03-29`

## Branch 1. Incumbent Pattern Map

Observed market patterns:
- `Trust center`: proactively publish posture and documents, sometimes with AI chatbot
- `Questionnaire automation`: reuse prior answers and docs to auto-complete inbound reviews
- `AI governance suite`: manage assets, models, datasets, assessments, controls, and policy workflows

Gap left open by these patterns:
- AI-specific buyer follow-up questions are not always solved by static trust content
- prior-answer autocomplete inherits stale or generic language
- heavy governance suites overshoot the needs and budget of teams without dedicated GRC

## Branch 2. Candidate A — Public AI Trust Center + Chatbot

- coreMechanism: publish AI trust artifacts in a branded portal and let buyers self-serve via chatbot
- primaryUserPromise: reduce back-and-forth by answering buyer questions before they become email threads
- keyWorkflow:
  - create AI trust profile
  - publish docs and FAQs
  - grant gated access
  - buyer asks questions via chatbot
- whyThisWins:
  - strongest proactive posture
  - easiest mental model because buyers already know trust centers
- whyItLoses:
  - fails on the chosen failure moment when buyer asks nuanced AI-specific follow-ups not already represented in published content
  - too easy to collapse into incumbent territory
- fullFeatureSet:
  - profile publishing
  - gated documents
  - chatbot
  - access analytics
- screenInventory:
  - `/trust-center`
  - `/documents`
  - `/settings`
- dataModel:
  - `TrustProfile`, `Document`, `FAQ`, `AccessGrant`, `ChatQuestion`

## Branch 3. Candidate B — Generic Questionnaire Autocomplete

- coreMechanism: use prior answers plus uploaded docs to draft answers to inbound questionnaires
- primaryUserPromise: finish AI trust reviews in hours instead of starting from scratch
- keyWorkflow:
  - upload prior questionnaires
  - import new questionnaire
  - auto-generate answer drafts
  - review and export
- whyThisWins:
  - tightly aligned to inbound review pain
  - fastest time-to-value
- whyItLoses:
  - inherits generic or stale answers
  - treats the questionnaire as text completion rather than a typed operational problem
  - weak differentiation versus Vanta/Drata
- fullFeatureSet:
  - questionnaire import
  - knowledge base
  - AI drafts
  - export
- screenInventory:
  - `/questionnaires`
  - `/knowledge-base`
  - `/review`
- dataModel:
  - `Questionnaire`, `Question`, `AnswerTemplate`, `KnowledgeDoc`, `Export`

## Branch 4. Candidate C — AI System Card / Passport Publisher

- coreMechanism: build one structured AI system profile or passport and reuse it across buyer reviews
- primaryUserPromise: answer repeated buyer questions once by publishing a reusable AI system card
- keyWorkflow:
  - define AI systems
  - document model/data/human-oversight attributes
  - publish structured system cards
  - share to buyers
- whyThisWins:
  - future-friendly standardization story
  - strong platform possibility if buyers adopt a shared format
- whyItLoses:
  - passive artifact, not active review workflow
  - depends on buyer acceptance of the format
  - weak immediate demo payoff unless combined with review execution
- fullFeatureSet:
  - system registry
  - system-card editor
  - publishing and share links
- screenInventory:
  - `/systems`
  - `/cards`
  - `/share/[slug]`
- dataModel:
  - `AISystem`, `SystemCard`, `Control`, `ShareLink`

## Branch 5. Candidate D — Lightweight AI Governance Suite

- coreMechanism: manage AI assets, assessments, controls, and approvals inside one internal workspace
- primaryUserPromise: replace spreadsheet-based AI governance with one lightweight operating layer
- keyWorkflow:
  - register systems
  - run assessments
  - track controls and approvals
  - export governance packet
- whyThisWins:
  - broadest governance depth
  - room for future compliance expansion
- whyItLoses:
  - too broad for the narrow painful first moment
  - risks becoming an enterprise suite instead of a sharp wedge
  - five-minute demo becomes governance theater
- fullFeatureSet:
  - system registry
  - assessments
  - control tracking
  - approvals
  - exports
- screenInventory:
  - `/systems`
  - `/assessments`
  - `/controls`
  - `/approvals`
- dataModel:
  - `AISystem`, `Assessment`, `Control`, `Owner`, `Approval`

## Branch 6. Candidate E — Buyer-Review-Native Response Ops Workspace

- coreMechanism: map each inbound AI buyer question to a typed AI system record and evidence graph, generate cited answers, and convert missing proof into remediation tasks
- primaryUserPromise: turn an AI buyer review from a Slack fire drill into a reusable, buyer-ready response workflow
- keyWorkflow:
  - register AI systems and responsible owners
  - upload or create evidence blocks
  - import buyer questionnaire
  - map questions to systems, controls, and evidence
  - generate answer drafts with citations
  - flag unanswered gaps and assign remediation tasks
  - publish buyer-ready packet
- whyThisWins:
  - solves the exact chosen failure moment
  - differentiated from trust centers and generic autocomplete because the center of gravity is the review room, not a static document library
  - future platform depth is natural through reusable evidence primitives and shareable buyer packets
- fullFeatureSet:
  - auth and workspace setup
  - AI system registry CRUD
  - evidence library CRUD
  - questionnaire import and review workspace
  - cited answer drafts
  - gap/remediation task board
  - buyer-ready packet generation and share view
- screenInventory:
  - `/login`
  - `/systems`
  - `/evidence`
  - `/questionnaires`
  - `/questionnaires/[id]`
  - `/packets/[id]`
- dataModel:
  - `User`
  - `Workspace`
  - `AISystem`
  - `EvidenceItem`
  - `Questionnaire`
  - `Question`
  - `AnswerDraft`
  - `Citation`
  - `GapTask`
  - `BuyerPacket`

## Branch 7. Buildability Selector

### Pairwise result: A vs B
- B wins. Static trust centers do not directly solve AI-specific follow-up review execution.

### Pairwise result: B vs C
- B wins on immediate workflow fit.
- C is a useful artifact layer but too passive as the primary mechanism.

### Pairwise result: B vs D
- B wins on wedge sharpness.
- D is too broad for v1.

### Pairwise result: B vs E
- E wins.
- B is fast but not sufficiently differentiated; E preserves the speed benefit while adding typed AI-system mapping, citations, and remediation loops.

## Synthesis

### Winner
- `Candidate E: Buyer-Review-Native Response Ops Workspace`

### Runner-up
- `Candidate B: Generic Questionnaire Autocomplete`

### One-Sentence Differentiation
- `기존 trust center가 정적인 proof를 게시하고, 기존 questionnaire automation이 과거 답변을 재사용하는 데 그친다면, 선택된 solution은 각 AI buyer question을 typed AI-system evidence graph에 연결해 cited answer와 remediation task를 동시에 만드는 review-native workspace다.`

### Early Product Title
- `Proofline`

### Full Feature Set
- local credential auth
- workspace onboarding
- AI system CRUD
- evidence CRUD
- questionnaire CRUD/import
- answer generation with citations
- remediation task creation and status updates
- buyer packet generation and shareable export view

### MVP Scope
- core promise: `buyer review를 제때 신뢰 가능하게 답하게 만든다`
- must-have flows:
  - sign in
  - create AI system
  - add evidence
  - import questionnaire
  - review auto-mapped answer drafts
  - mark gaps and assign tasks
  - publish buyer-ready packet

### Why This Survives Counterevidence
- It is narrower than OneTrust-style governance.
- It is deeper than Vanta-style generic questionnaire autocomplete for this specific AI review job.
- It keeps the future platform door open through typed system/evidence primitives.
