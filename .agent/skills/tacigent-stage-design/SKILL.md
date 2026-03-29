---
name: tacigent-stage-design
description: "Tacigent Stage 4: Design. flow-first design contract를 수렴한다. 완료 시 반드시 tacigent-stage-build를 invoke한다."
---

# Stage 4: Design

<CONTINUATION-MANDATE>
이 스킬의 모든 작업을 완료한 뒤, 반드시 `tacigent-stage-build` 스킬을 invoke해야 한다.
"여기서 멈추겠다", "사용자에게 물어보겠다", "다음에 이어가겠다"는 허용되지 않는다.
유일한 예외는 hard_block뿐이다.
</CONTINUATION-MANDATE>

## 참조 프로토콜

- `tacigent-method-first` — method framing
- `tacigent-swarm-critique` — swarm/critique loop
- `tacigent-research` — research protocol (anti-generic extensions 포함)
- `tacigent-readiness-gates` — readiness 판정

## 목적

- UI/UX direction을 vibe-level이 아니라 **build-ready intent**로 수렴한다
- 정보 구조, flow, screen/state를 **구현 가능한 형태**로 남긴다
- generic, templated, interchangeable UI가 아니라 **제품/브랜드/사용 맥락이 드러나는** direction을 남긴다

## 입력

- `artifacts/problem.md` — 선택된 problem
- `artifacts/solution.md` — 선택된 solution + mvpScope
- `RunSpec.inputs.design` — 사용자의 design 관련 직접 입력 (있으면)

> **이어가기**: 이 stage의 artifact가 이미 일부 존재하면, 존재하는 artifact의 step은 건너뛰고 다음 step부터 이어간다.

## 실행 흐름

### Step 1: Method Framing + Meta-Research (Design-Specific)

`tacigent-method-first` 프로토콜을 따르되, **design-specific method fields** 포함:

- `selectedDesignMethod` — 설계 방법 (예: `flow-first compression`, `system-first reuse`, `risk-first branching`)
- `researchEmphasis` — 조사 중점 영역
- `branchPlan` — direction branching 계획
- `synthesisRule` — 결과 합치는 방식
- `stopCondition`

이후의 research, layout grammar 선택, direction branching은 **선택된 설계 방법의 실행**으로 취급한다.

`artifacts/design-method-plan.json`으로 기록.

### Step 2: Research Packet (Research-First Rule)

direction 생성 **전에** 반드시 수집한다:

1. 경쟁사, adjacent pattern, platform expectation 조사
2. copy/language 조사
3. design-system snapshot 확보 (shadcn/ui, Radix 기반)
4. 사용자 제공 tone/reference → explicit anchor로 남김

**Anti-Generic Research Extensions:**

`tacigent-research` 프로토콜의 query families를 아래로 확장:

| Extension Query Family | 용도 |
|----------------------|------|
| `generic_ui_signature` | 양산형 SaaS UI 패턴 탐지 |
| `card_overload` | card soup 패턴 탐지 |
| `brandless_ui` | 브랜드 없는 UI 패턴 탐지 |
| `template_topology` | 복붙 구조 탐지 |
| `density_breakpoint` | oversized/underfilled 레이아웃 탐지 |
| `interaction_realism` | static-only mock 탐지 |

bilingual seed queries:
- `보라색 그라디언트`, `양산형 SaaS 디자인`, `카드형 대시보드`, `브랜드 없는 UI`
- `AI-looking UI`, `template-looking dashboard`, `card soup UI`, `generic SaaS layout`

research packet은 미감 취향보다 **반복 complaint와 workflow fit**을 우선 요약한다.

### Step 3: Swarm Exploration (Design-Specific)

`tacigent-swarm-critique` 프로토콜을 따르되, design-specific defaults:

- 기본 exploration swarm: **7**
- system anchor가 강하고 risk가 낮거나 single-direction refinement가 충분히 설명 가능하면 **5로 downshift** (5 미만 금지)
- 방향성 분기는 항상 2-3개를 강제하지 않는다

각 branch에서:
1. **Information Architecture** — primaryNav, secondaryNav, taskGroups, labeling
2. **Task Flow Graph** — key workflow의 step-by-step flow (flow-first)
3. **Screen Specs** — 각 화면의 목적, 구성요소, state
4. **Visual Direction** — color, typography, spacing, 전체 톤
5. **Style Anchors** — 제품 성격을 드러내는 핵심 디자인 결정

### Step 4: Critique (Design-Specific Critics)

**Design-specific critic roles:**

1. **First-Principles Pruner** — 불필요한 화면/요소 제거
2. **Task-Clarity Critic** — 각 screen의 job이 명확한가? primary action이 보이는가?
3. **Buildability Critic** — shadcn/ui + Tailwind 4 + Next.js 16으로 구현 가능한가?
4. **Accessibility Critic** — ARIA, keyboard nav, contrast, screen reader 고려
5. **Distinctiveness Critic** — "다른 SaaS와 구별되는가? 제품 맥락이 드러나는가?"

**5회 critique 모두 mandatory다.** downshift 금지.

### Step 5: Composition & Distinctiveness Rule

<MANDATORY>
**모든 주요 screen은 아래를 가져야 한다:**
- single declared job
- primary action
- first-noticed element

**externally facing hero는 아래를 함께 보여야 한다:**
- audience, pain, outcome, concrete proof element

**Layout Grammar:**
- direction 생성 전 screen family별 `layout grammar`를 먼저 고르고 그 안에서 조합
- 자유형 새 토폴로지 생성은 기본값이 아니다

**Card 규칙:**
- card는 비교 가능한 atomic content에 우선 사용
- 긴 설명, 세부 스펙, multi-action control dump는 list, table, drilldown으로 분리
- 연속된 card-grid section은 제한적으로만 허용
- screen의 주 스토리가 card stack만으로 구성되면 **경고 또는 fail 후보**

**Library Fingerprint:**
- design-system defaults는 출발점일 뿐
- radius, color, font, shadow가 라이브러리 fingerprint 그대로면 **distinctiveness fail 후보**

**State Completeness:**
- primary interaction에는 hover, focus, pressed state
- primary data surface에는 loading, empty, error state

**Breakpoint Density:**
- breakpoint별 density와 hierarchy를 따로 검토
- oversized typography, underfilled grid, whitespace-only polish는 fail 후보
</MANDATORY>

### Step 6: Anti-Generic Check

최종 design을 아래 기준으로 평가. 해당되면 **revision 필요**:

- ❌ 로고와 제품명만 바꿔도 다른 SaaS에 그대로 재사용 가능?
- ❌ generic dashboard/landing template과 구별 불가능?
- ❌ 제품의 핵심 workflow가 design에서 드러나지 않음?
- ❌ target user의 맥락이 반영되지 않은 기본 레이아웃?
- ❌ hero-feature-grid-testimonial 복붙 구조?
- ❌ library fingerprint가 강해 기본 Tailwind/shadcn 변형처럼 보임?
- ❌ generic gradient, safe palette, basic header-button stack만으로 시각 언어를 대신?
- ❌ flow/journey logic 없이 screen-by-screen 나열만?

### Step 7: Design Contract 생성

build가 직접 소비할 수 있는 **machine-readable contract**:

```json
{
  "informationArchitecture": {
    "primaryNav": [], "secondaryNav": [], "taskGroups": [],
    "labelingRules": [], "validationMethod": ""
  },
  "taskFlowGraph": {},
  "screenSpecs": [],
  "componentBindings": [],
  "tokenBindings": {},
  "stateSpecs": [],
  "visualDirection": {},
  "styleAnchors": [],
  "styleConstraints": [],
  "accessibilityContract": {},
  "contentRules": [],
  "motionRules": [],
  "buildConstraints": {
    "componentReuseBudget": "",
    "motionBudget": "",
    "localizationAssumptions": "",
    "allowedNewComponentScope": ""
  },
  "fullFeatureSetCoverage": [],
  "readyForDev": true
}
```

### Step 8: Ready-For-Dev Gate

<MANDATORY>
아래가 **모두 충족**되어야 `readyForDev=true`:

- task flow graph 정의됨
- screen specs 정의됨 (최소 3개 이상의 screen/route)
- state specs 정의됨 (happy path + failure path)
- accessibility contract 정의됨
- build constraints 정의됨
- design-system reuse와 신규 제작 범위 분리됨
- drift sentinels 기록됨
- **solution의 fullFeatureSet 전체가 design에 반영됨**
- 반응형은 v1 scope 밖 (desktop-first)

**임계값 (단순 non-empty check 아님):**
- happy path와 failure path가 모두 정의되었는가?
- reviewer가 10초 안에 screen job, primary action, first-noticed element를 설명할 수 있는가?
- blur/squint test에서도 dominant action과 grouping이 유지되는가?
- **logo swap test** — 로고만 바꿔도 product domain, audience, brand voice가 남는가?
- interaction state completeness가 충족되는가?
</MANDATORY>

## Selection & Tie-Breaker

**Selection unit:** `flow + IA + state coverage + build constraints`
**Tie-breaker 우선순위:** `task clarity → buildability → design-system reuse → accessibility → lower delivery risk`

single-direction refinement를 택할 때도 why-no-branch와 dropped alternative rationale을 남긴다.

## Output Review Cycles (5회 필수)

`ralph-loop`의 OUTPUT-REVIEW-CYCLES 프로토콜을 따른다.

design.md + design-contract.json 작성 후, 5회의 제1원칙 리뷰를 수행한다. **Design-specific 리뷰 기준:**

1. **solution의 fullFeatureSet이 모두 design에 반영되었는가?** — 빠진 기능이 있으면 screen/flow 추가
2. **각 screen의 primary action이 10초 안에 보이는가?** — 보이지 않으면 레이아웃 수정
3. **design-contract.json이 빈 필드 없이 채워졌는가?** — 빈 필드 = build가 추측해야 함
4. **generic SaaS 느낌이 사라졌는가?** — anti-generic check를 매 round 재적용
5. **state completeness** — hover, loading, empty, error state가 모두 명시되었는가

## Stop Condition

위 Ready-For-Dev Gate를 통과하고, **5회 산출물 리뷰가 완료되었을 때 (review-1~5.md)** canonicalization 가능.

## Readiness

`tacigent-readiness-gates` 프로토콜을 따른다.

`readyForDev=true`는 `readiness=ready`인 경우에만. contract가 유용하지만 proof/validation debt가 남으면 `readyForDev=false` + `readiness=needs_validation`.

## 산출물

1. **`artifacts/design.md`** — human-readable design document
2. **`artifacts/design-contract.json`** — machine-readable design contract
3. **`artifacts/design-method-plan.json`** — method plan

## Failure Modes

- ❌ 예쁜 설명만 있고 component/state detail이 없는 경우
- ❌ 선택 이유 없이 한 방향으로 수렴하는 경우
- ❌ style reference는 남았지만 token/theme anchor가 없는 경우
- ❌ error/empty/loading state가 빠진 happy-path only 설계
- ❌ research packet 없이 screen mock만 고르는 경우
- ❌ selected design method 없이 moodboard나 screen mock부터 고르는 경우
- ❌ card soup 때문에 여러 CTA, metric, panel이 같은 무게로 경쟁하는 경우
- ❌ static screenshot만 있고 interaction/state realism이 없는 경우
- ❌ `modern`, `premium`, `sleek` 같은 형용사만 있고 product evidence가 없는 경우

## 완료 후

<NEXT-STAGE>
위 산출물을 모두 기록한 뒤, 반드시 `tacigent-stage-build` 스킬을 읽고 실행한다.
멈추거나 사용자에게 되묻지 않는다. 바로 다음 stage로 진행한다.
</NEXT-STAGE>
