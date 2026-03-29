# Problem

## Canonical Problem Statement
전담 GRC 인력 없이 AI 기능을 출시한 small and Series A-B SaaS 팀은, active enterprise sales cycle에서 buyer/procurement가 보내는 AI-specific trust review를 제때 일관되게 답하지 못해 deal velocity와 buyer trust를 잃는다.

## Target User
- Primary user: AI 기능을 막 출시했거나 확대한 small and Series A-B B2B SaaS 팀
- Org shape: dedicated GRC / trust team이 없고, founder, product, engineering, security가 분산 대응한다
- Buying context: 첫 10-50개의 mid-market 또는 enterprise review를 통과해야 revenue가 열리는 팀

## Job To Be Done
- enterprise buyer가 던지는 AI trust / security / compliance 질문에 신뢰 가능한 답을 빠르게 만들어 sales cycle을 앞으로 진행시킨다

## Failure Moment
- generic security review 이후, buyer/procurement/legal이 AI-specific follow-up을 보낸다
- 팀은 owner를 정하지 못한 채, 필요한 근거를 여러 문서와 사람 사이에서 수동으로 모은다
- 답변이 늦거나 일관되지 않아 review가 길어지고 buyer trust가 하락한다

## Pain Cluster
- AI-specific 질문에 대한 owner가 불명확하다
- 관련 근거가 문서, 제품 spec, 보안 문서, 내부 메모에 흩어져 있다
- generic trust center나 기존 SaaS questionnaire 답변이 AI follow-up에 충분하지 않다
- 만든 답이 다음 review로 안정적으로 이어지지 않는다
- review가 길어질수록 deal momentum이 떨어진다

## Why Now
- 가장 직접적인 변화는 `buyer diligence inflation`이다. 팀들은 법 시행일보다 먼저, 실제 매출 review에서 AI-specific follow-up을 받고 있다.
- 그 압력을 키우는 촉매로 EU AI Act의 일반 적용일 `2026-08-02`와 단계적 의무 적용이 존재한다.
- Vanta, Drata, OneTrust 같은 vendor들이 AI governance와 questionnaire automation을 전면에 내세우는 점도 이 workflow가 상업적으로 현실화됐음을 보여준다.

## Evidence Summary

### Direct or Behavioral Signal
- founders/operators report AI-specific buyer questionnaires, lost or slowed enterprise deals, and generic security questionnaires being awkwardly reused for AI reviews
- procurement-side discussion shows buyers are trying to assess AI vendor risk beyond traditional SOC 2 checklists

### Official Reality Check
- European Commission AI Act page states the Act entered into force on `2024-08-01` and is generally fully applicable on `2026-08-02`, while some obligations already apply earlier
- official simplification discussions in March 2026 show timeline complexity remains active, which increases interpretation and readiness work for vendors rather than eliminating the question burden

### Adoption or Commercial Proxy
- Vanta and Drata both position questionnaire automation and AI assurance as tools to unblock reviews and close deals faster
- OneTrust's March 2026 AI governance material frames manual spreadsheet-based governance as insufficient and pushes automated intake/evidence workflows

### Counterevidence
- existing trust, GRC, and AI governance vendors already cover adjacent workflows
- some timeline details may still move under EU simplification proposals

### Why Counterevidence Does Not Break The Selection
- the chosen problem is not abstract compliance management
- it is the first AI-specific buyer-response bottleneck for teams without mature trust operations
- the wedge survives even if exact rule timing moves, because buyer diligence is already happening inside active deals

## Readiness
- status: `ready`
- rationale: official primary source, first-party commercial proxy, and independent community corroboration are all present
- carryForwardRisks:
  - direct pain evidence is still community-heavy rather than operator dataset-heavy
  - downstream stages must keep `buyer diligence inflation` as the primary why-now, not a brittle law-deadline pitch
  - incumbent GRC suites remain the main counter-position and must be explicitly handled in solution design

## Selector Justification
- applied criteria:
  - severity: revenue-blocking review gate
  - urgency: active deal-stage problem
  - validation yield: strongest evidence mix among candidates
  - strategic fit: strongest match to judges and demo constraints
- winner: `AI-specific buyer trust review bottleneck`
- runner-up: `agent governance gap`
- decisive reason: Candidate A ties directly to revenue and can still support platform depth in product design
- whatWouldFlipDecision:
  - high-prior evidence that buyers are not actually increasing AI-specific follow-up reviews
  - stronger and faster buying-trigger evidence for Candidate B

## Source Classes Used
- `official_primary`
- `first_party`
- `community_social`

## Source References
- European Commission AI Act timeline page
- Council / Commission simplification materials discussed in March 2026
- community posts from founders, procurement, and AI operator communities during Q1 2026
- Vanta, Drata, and OneTrust first-party materials accessed on `2026-03-29`
