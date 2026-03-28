---
name: tacigent-stage-solution
description: "Tacigent Stage 3: Solution. problem을 풀 적절한 solution direction을 선택한다. 완료 시 반드시 tacigent-stage-design을 invoke한다."
---

# Stage 3: Solution

<CONTINUATION-MANDATE>
이 스킬의 모든 작업을 완료한 뒤, 반드시 `tacigent-stage-design` 스킬을 invoke해야 한다.
"여기서 멈추겠다", "사용자에게 물어보겠다", "다음에 이어가겠다"는 허용되지 않는다.
유일한 예외는 hard_block뿐이다.
</CONTINUATION-MANDATE>

## 참조 프로토콜

- `tacigent-method-first` — method framing
- `tacigent-swarm-critique` — swarm/critique loop
- `tacigent-evidence-ladder` — evidence 판단
- `tacigent-readiness-gates` — readiness 판정

## 목적

- problem을 푸는 적절한 **solution direction**을 선택한다
- ideation을 넘어서 **build-safe choice**를 만든다
- broad ideation보다 **typed decision system**을 우선한다

## 입력

- `artifacts/problem.md` — 선택된 problem
- `artifacts/problem-compare.md` — problem 비교 기록
- `artifacts/intake.md` — intake 결과
- `RunSpec.inputs.solution` — 사용자의 solution 관련 직접 입력 (있으면)

## 실행 흐름

### Step 1: Method Framing (Solution-Specific)

`tacigent-method-first` 프로토콜을 따르되, **solution-specific method fields** 포함:

- `candidateGenerationMethod` — 후보 생성 방식 (예: `orthogonal ideation`, `constraint-first narrowing`, `anchor-preserving refinement`)
- `criticStrategy` — 비평 전략
- `compareMethod` — 비교 방식 (pairwise, tournament, bracket)
- `stopCondition`

method branch는 solution candidate와 **별개**다. 필요하면 method를 먼저 고른 뒤 그 방법 안에서 candidate compare를 수행한다.

`artifacts/solution-method-plan.json`으로 기록.

### Step 2: Anchor 설정

- 사용자가 solution 입력을 제공했으면 → **기본 anchor**로 취급
  - preserve → extend → de-risk → deviate only if necessary
- 완전히 다른 solution으로 갈아타는 경우 → **예외**이며 명시적 기록 필요

### Step 3: Orthogonal Candidate Generation

기본 **4-6개**의 orthogonal candidate를 만든다.
단순 UI flavor variation이나 pricing tier variation은 **distinct solution candidate로 세지 않는다**.

각 candidate는 아래를 갖는다:
- `coreMechanism` — 문제를 어떤 메커니즘으로 푸는가
- `primaryUserPromise` — 사용자에게 어떤 약속을 하는가
- `keyWorkflow` — 핵심 사용 흐름
- `whyThisWins` — 기존 대안 대비 왜 이것인가
- `mvpScope` — MVP 범위 윤곽

### Step 4: Swarm Exploration (Solution-Specific)

`tacigent-swarm-critique` 프로토콜을 따르되, solution-specific defaults:

- 기본 exploration swarm: **5**
- constraint screen이 빠르게 feasible set을 좁히거나 viable candidate가 거의 하나로 수렴하면 **3으로 downshift**

### Step 5: Critique (Solution-Specific Critics)

**Solution-specific critic roles:**

1. **First-Principles Pruner** — 불필요한 feature/scope 제거
2. **Anchor-Drift Critic** — 사용자의 solution 방향에서 벗어나지 않았는가
3. **Feasibility Critic** — v1 tech stack으로 구현 가능한가 (Next.js 16 + React 19 + local-first)
4. **Differentiation Critic** — 기존 대안과 진짜 다른가? "더 나은 X" 수준인가?
5. **Validation Critic** — 이 solution의 핵심 가정을 검증할 수 있는가?

**second critique round는 기본 mandatory다.**
third critique는 winner가 critique 사이에서 흔들리거나, irreversible scope expansion, high-risk build assumption, low-separation candidate set이 남을 때만 escalation.

### Step 6: Debate Gate

<IMPORTANT>
아래 조건일 때**만** 추가 debate를 연다. **항상 debate를 돌리지 않는다:**

- uncertainty가 높을 때
- 후보 간 divergence가 클 때
- risk가 높을 때
- user anchor와 최종 후보가 크게 어긋날 때
</IMPORTANT>

### Step 7: Comparison Rule

- 후보가 2-3개면 **pairwise compare** 또는 small tournament
- 후보가 많으면 **bracket 또는 round-robin** 요약 허용
- 가능하면 **order-swapped judging**으로 position bias를 줄인다
- 후보가 매우 비슷하면 tie-breaker 사용

**Tie-breaker 우선순위:** `problem fit → feasibility → reversibility → differentiation`

### Step 8: Single-Candidate Path

constraint screen 뒤 viable candidate가 1개만 남으면 compare를 **생략할 수 있다**.
이 경우에도:
- `why-no-compare`
- killed alternatives
- `whatWouldFlipDecision`
을 남긴다.

### Step 9: Choose / Canonicalize

**Selection unit:** `core mechanism + primary user promise + key workflow + mvpScope`

selector는 critic 결과를 입력으로 받지만, final rule은 **criterion-by-criterion reasoning**이다.

## Stop Condition

아래를 **모두 만족**할 때 canonicalization 가능:

- `solution-method-plan` artifact가 기록되었고
- selected solution이 decision matrix와 justification으로 설명 가능하고
- anchor ledger가 typed record로 채워졌고
- `debateRecord` 또는 equivalent adjudication 기록이 남았고
- mvpScope와 buildConstraints가 비어 있지 않을 때

## Readiness

`tacigent-readiness-gates` 프로토콜을 따른다.

- `ready`: buildability proof 충분, anchor deviation 방어 가능, validation path 설명 가능
- `needs_validation`: buildability proof 약함
- `not_ready`: decisive winner 설명 불가 또는 critical risk unresolved

anchor deviation이 크고 justification이 약하면 `ready`를 주지 않는다.

## Late-Bound Invalidation

- material feasibility evidence, upstream problem drift, new build constraint가 winner를 흔들면 selection을 reopen
- user anchor deviation이 크거나 irreversible scope expansion이 필요하면, bounded MVP candidate로 normalize하거나 explicit deviation을 남긴 뒤 `needs_validation`

## 산출물

1. **`artifacts/solution.md`** — 선택된 solution (mechanism, promise, workflow, why, mvpScope, buildConstraints, riskProfile, confidence, assumptions)
2. **`artifacts/solution-compare.md`** — 후보 비교 + debateRecord + rejection reasons
3. **`artifacts/solution-method-plan.json`** — method plan

## Failure Modes

- ❌ debate 자체를 가치로 착각하는 경우
- ❌ candidate generation method를 고르지 않고 바로 아이디어 나열로 들어가는 경우
- ❌ 너무 이른 수렴으로 diversity가 사라지는 경우
- ❌ selector가 투표 결과만 복제하는 경우
- ❌ high-risk change인데 anchor deviation 기록이 없는 경우
- ❌ confidence를 단일 scalar로만 남겨서 build/validation risk를 숨기는 경우

## 완료 후

<NEXT-STAGE>
위 산출물을 모두 기록한 뒤, 반드시 `tacigent-stage-design` 스킬을 읽고 실행한다.
멈추거나 사용자에게 되묻지 않는다. 바로 다음 stage로 진행한다.
</NEXT-STAGE>
