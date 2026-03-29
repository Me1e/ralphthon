# Intake

## Run Summary
- Run label: `HotPainWeb`
- Mode: `tight`
- Execution plan: `intake → problem → solution → design → build → marketing → pitch`
- Current status: concrete product idea는 아직 intentionally unselected 상태다. canonical selection은 problem stage에서 수행한다.

## Input Summary
- intake: 제품 아이디어 없이 시작한다. 에이전트가 지금 인터넷에서 가장 뜨거운 문제를 찾아 웹 제품으로 풀어야 한다.
- problem: 에이전트가 직접 live research로 선정한다.
- solution: 기존 대안과 차별점이 한 문장으로 설명되는 접근을 선택해야 한다.
- design: 5분 데모에서 핵심 flow가 선명해야 한다.
- build: 반쪽짜리보다 좁지만 완성된 end-to-end workflow를 우선한다.
- marketing: VC와 Tech Lead가 동시에 납득할 GTM logic이 필요하다.
- pitch: recommendation-first pre-read와 HTML deck이 필요하다.

## Intent Frame
- objective: 현재 가장 뜨거운 인터넷 기반 pain을 찾아, 심사위원이 시장성과 구현 완성도를 동시에 인정할 수 있는 웹 제품으로 끝까지 만든다.
- targetUser: 우선 글로벌 B2B SaaS 또는 기술 조직의 operator/builder를 기본 타깃으로 본다. problem stage에서 evidence가 더 강한 segment로 좁힌다.
- jobToBeDone: 급하게 커지는 외부 변화나 기술 전환 때문에 생긴 실제 업무 pain을, 즉시 데모 가능한 웹 워크플로우로 해결한다.
- desiredOutcome: 실사용 가능한 v1 product, aligned narrative, pitch artifact까지 하나의 회사적 판단으로 연결한다.
- deliverables:
  - `.tacigent/artifacts/*`
  - `.tacigent/workspace/app/*`
  - working product
  - verification report
  - marketing assets
  - pitch pre-read and HTML deck
- hardConstraints:
  - tight mode
  - greenfield web product only
  - minimum 3 routes
  - local credential auth baseline
  - build must be end-to-end verifiable
  - no stage skipping
- softConstraints:
  - hot signal이 강한 space를 우선한다
  - B2B SaaS/플랫폼 깊이가 드러나는 problem을 우선한다
  - external-secret heavy dependency는 피한다
- nonGoals:
  - mobile-native MVP
  - browser-extension-first MVP
  - pure content site without operational workflow

## Low-Cost Market/Context Scan
- Cluster 1: `AI compliance and buyer readiness`
  - 이유: 2026년 규제/거버넌스 변화와 enterprise buyer questionnaire pressure가 동시에 커지고 있다.
- Cluster 2: `Tariff-driven ecommerce margin shock`
  - 이유: 무역 정책 변동성이 크고 sellers/importers가 즉시 손해를 본다.
- Cluster 3: `AI agent reliability and auditability`
  - 이유: agent adoption이 빨라지는데 production trust와 audit trail이 부족하다.

이 scan은 framing risk를 낮추기 위한 보조 신호다. canonical choice는 아직 하지 않았다.

## Downstream Contract
- problemFocus: hot signal, direct pain signal, official reality, adoption/commercial proxy, counterevidence를 모두 확보하면서 `freshness + buildability`가 가장 강한 wedge를 고른다.
- solutionFocus: 기존 대안과 무엇이 다른지 한 문장으로 설명 가능한 wedge를 선택한다. 특히 `generic dashboard`나 `broad compliance platform`처럼 퍼지는 solution은 감점한다.
- designFocus: 5분 데모에서 `문제 인지 → 데이터 입력/자동 해석 → 우선순위/결정 → 실행 가능한 output`이 한 번에 보이게 만든다.
- validationPriorities:
  - chosen problem의 hot signal freshness
  - direct user pain language 확보
  - autonomous buildability
  - defensible differentiation
  - demo-narrative fit

## Title Protocol
- immutable run label: `HotPainWeb`
- public-facing title candidates:
  - `Signal Desk`
  - `Proofline`
  - `Shiftboard`
- note: public title는 problem/solution 선택 후 재평가한다. 지금은 run label만 canonical이다.

## Readiness
- status: `ready`
- rationale: downstream stage를 막는 blocking ambiguity는 없다. 핵심 모호성은 의도적으로 problem stage의 research decision으로 넘겼다.
- carryForwardRisks:
  - hot signal만 보고 buildability가 낮은 문제를 고를 위험
  - direct pain 없이 뉴스성 이슈에 끌릴 위험
  - 지나치게 넓은 market claim으로 흘러갈 위험
