# Solution Compare

## Candidate Table

| Candidate | Core Mechanism | Problem Fit | Feasibility | Reversibility | Differentiation | Build Scope | Result |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| A. Public AI trust center + chatbot | publish docs and answer self-serve questions | 3 | 5 | 4 | 2 | 3 | reject |
| B. Generic questionnaire autocomplete | reuse past answers and docs for new forms | 4 | 5 | 4 | 2 | 4 | runner-up |
| C. AI system card / passport publisher | publish reusable structured AI system profile | 3 | 4 | 4 | 4 | 3 | reject |
| D. Lightweight AI governance suite | manage assets, assessments, controls, approvals | 4 | 3 | 3 | 3 | 2 | reject |
| E. Buyer-review-native response ops workspace | map live questions to typed system/evidence state and gap tasks | 5 | 4 | 4 | 5 | 5 | winner |

## Debate Record

### Round 1
- A vs B: `B` wins because the problem is inbound review execution, not static publication.

### Round 2
- B vs C: `B` wins because a passive passport does not close an active review loop by itself.

### Round 3
- B vs D: `B` wins because D overshoots the immediate wedge and threatens v1 scope.

### Round 4
- B vs E: `E` wins because it keeps B's speed but replaces generic reuse with typed mapping, citation enforcement, and remediation.

## Killed Alternatives
- A died because trust centers answer the wrong moment: before or outside the live review room.
- C died because buyer adoption of a shared format is too uncertain for v1.
- D died because it turns the wedge into a mini OneTrust too early.

## Why-No-Compare For Broader Variants
- No extra compare was run for analytics/API/platform variants because they were scope variants of Candidate E, not orthogonal mechanisms.

## Winner
- `Proofline`

## Core Mechanism
- inbound AI buyer questions are resolved inside a review room that requires a typed system mapping and citations before an answer is considered complete

## Primary User Promise
- `첫 AI buyer review를 citation-backed buyer-ready packet으로 전환한다`

## Key Workflow
1. Sign in and open workspace
2. Create or edit AI system records
3. Add evidence items
4. Import or seed a buyer questionnaire
5. Map questions to systems and evidence
6. Generate or edit cited answers
7. Convert missing proof into remediation tasks
8. Publish buyer-ready packet

## Full Feature Set
- local auth
- systems CRUD
- evidence CRUD
- questionnaire CRUD/import
- question mapping and answer drafting
- citation requirement
- gap/remediation task board
- packet publish view

## Screen Inventory
- `/login`
- `/systems`
- `/evidence`
- `/questionnaires`
- `/questionnaires/[id]`
- `/packets/[id]`

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

## Strongest Disconfirming Evidence
- Incumbent vendors already provide questionnaire automation and governance workflows.

## Why The Winner Still Stands
- The decisive difference is not more automation but a different unit of work:
  - incumbent pattern: `document or prior answer -> new answer`
  - selected pattern: `live buyer question -> current system/evidence state -> cited answer or explicit gap`

## What Would Flip The Decision
- If build verification shows typed mapping/citation enforcement is too heavy for v1
- If user research later proves buyers mostly accept static trust-center artifacts without AI-specific follow-up
