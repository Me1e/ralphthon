---
name: tacigent-stage-problem
description: "Tacigent Stage 2: Problem. evidence-backed problem wedge를 정의하고 수렴한다. 완료 시 반드시 tacigent-stage-solution을 invoke한다."
---

# Stage 2: Problem

<CONTINUATION-MANDATE>
이 스킬의 모든 작업을 완료한 뒤, 반드시 `tacigent-stage-solution` 스킬을 invoke해야 한다.
"여기서 멈추겠다", "사용자에게 물어보겠다", "다음에 이어가겠다"는 허용되지 않는다.
유일한 예외는 hard_block뿐이다.
</CONTINUATION-MANDATE>

## 참조 프로토콜

- `tacigent-method-first` — method framing
- `tacigent-swarm-critique` — swarm/critique loop
- `tacigent-research` — research protocol
- `tacigent-evidence-ladder` — evidence 판단
- `tacigent-readiness-gates` — readiness 판정

## 목적

- vague brief에서 **build-worthy problem bet**을 정의하고 수렴한다
- solution 이전에 "무엇이 진짜 문제인지"를 **reversible하고 evidence-weighted한 choice**로 만든다
- concrete product/problem idea 선택의 **canonical owner**는 이 stage다

## 입력

- `artifacts/intake.md` — intake 산출물
- `artifacts/interpretation-ledger.md` — diff-first 해석 기록
- `RunSpec.inputs.problem` — 사용자가 problem에 직접 제공한 입력 (있으면)

## 실행 흐름

### Step 1: Method Framing (Problem-Specific)

`tacigent-method-first` 프로토콜을 따르되, **problem-specific method fields**를 반드시 포함:

- `researchObjective` — 무엇을 조사할 것인가
- `decisionClass` — exploratory / reversible / irreversible
- `queryFamilySubset` — 사용할 query families
- `branchPlan` — branch는 topic variation이 아니라 **method divergence**가 있을 때만 늘린다
- `stopCondition`

기본 method 후보: `wide exploration`, `segment-deep-dive`, `counterevidence-first`

`artifacts/problem-method-plan.json`으로 기록.

### Step 2: Source-Class Research

`tacigent-research` 프로토콜을 따른다.

**최소 evidence function coverage:**
1. `direct_or_behavioral_signal` — direct pain or operator language
2. `official_reality_check` — official or first-party reality
3. `adoption_or_commercial_proxy` — commercial/adoption proxy
4. `counterevidence` — 반증
5. `freshness_check_if_time_sensitive` — search/discovery behavior

**hot signal bias** 적극 적용 — fresh한 candidate를 매우 강하게 우선.

### Step 3: Candidate Generation

문제 후보는 개수보다 **생성 방법**이 중요하다. 기본 3-6개를 아래 축에서 만든다:

- `user segment`
- `JTBD` (Job To Be Done)
- `failure moment`
- `pain cluster`

### Step 4: Swarm Exploration (Problem-Specific)

`tacigent-swarm-critique` 프로토콜을 따르되, problem-specific defaults:

- 기본 exploration swarm: **5**
- upstream frame이 매우 좁거나 viable problem cluster가 빠르게 수렴하면 **3으로 downshift**
- 각 branch에서:
  1. problem statement 정의
  2. target user 명시
  3. failure moment 포착
  4. pain clusters 정리
  5. evidence summary 수집

### Step 5: Synthesis → Critique

**Problem-specific critic roles:**

1. **First-Principles Pruner** — 불필요한 problem scope 제거
2. **Anchor-Drift Critic** — 사용자 의도에서 벗어나지 않았는가
3. **Evidence Critic** — 근거 없는 problem 주장 지적
4. **Validation-Yield Critic** — 이 problem을 선택하면 validation이 가능한가
5. **Counterevidence Critic** — "이미 충분히 해결된 문제인가?"

**second critique round는 기본 mandatory다.**
third critique는 contradictory source가 남거나, chosen problem이 downstream product direction을 materially 바꾸거나, public-facing market claim이 고위험일 때만 escalation.

### Step 6: Scoring

problem score는 **두 층**으로 나눈다:

**problemQuality:**
- severity (심각도)
- urgency (긴급도)
- frequency or reach (빈도/도달 범위)
- willingness to adopt or pay (채택/지불 의향)
- strategic fit (전략적 적합성)

**evidenceQuality:**
- directness (직접성)
- recency (최신성)
- source quality (소스 품질)
- counterevidence handling (반증 처리)
- confidence (확신도)

### Step 7: Autonomous Buildability Screening

problem stage는 downstream solution/build가 **사람 승인 없이 이어질 수 있는 wedge**를 우선한다.

아래 성격은 기본 경로 candidate로 **약하게** 본다:
- manual approval이 필수인 workflow
- real-account OAuth, secret provisioning, third-party contract setup 없이는 demo가 안 되는 path
- mobile native shipping, browser-extension store review, hardware dependency가 사실상 MVP인 path
- repo-local web/demo artifact로 proof를 만들기 어려운 path

optional AI assist는 허용하지만 remote-only dependency가 기본 성공 조건이면 감점.

### Step 8: Choose / Canonicalize

**Selection unit:** `segment × JTBD × failure moment × pain cluster`

**Tie-breaker 우선순위:** `severity → urgency → validation yield → strategic fit`

- viable candidate가 1개만 남아도 single-candidate path 허용 — why-no-compare와 rejected/deferred reason은 남긴다
- **strong bias:** Tacigent가 자율적으로 demo, build, pitch까지 이어갈 수 있는 candidate 우선
- **strong bias:** broad-web hot signal이 fresh한 candidate 매우 강하게 우선
- 더 뜨겁지만 buildability가 낮은 candidate를 버렸다면 selector justification에 이유를 남긴다

### Step 9: Minimum Evidence Rule

`tacigent-evidence-ladder` 프로토콜을 따른다.

- vague brief일수록 direct signal이 필요하다
- external claim을 `ready`로 올릴 때는 **high-prior source 1개 + independent corroboration 1개 이상**
- direct signal이 부족하면 canonical selection은 가능하더라도 `needs_validation`
- commercial/adoption proxy가 없으면 기본적으로 `ready`를 주지 않는다
- pure synthesis만으로 `ready`를 주지 않는다

## Stop Condition

아래를 **모두 만족**할 때 canonicalization 가능:

- `problem-method-plan` artifact가 기록되었고
- 후보별 comparison table이 채워졌고
- selector justification이 기록되었고
- rejected reason이 정리되었고
- chosen problem이 evidence와 함께 설명 가능하고
- readiness가 명시되었을 때

## Readiness

`tacigent-readiness-gates` 프로토콜을 따른다.

- `ready`: evidence coverage 충족, counterevidence 처리 완료
- `needs_validation`: canonical choice 했으나 direct signal 부족 또는 coverage gap
- `not_ready`: required coverage 비어 있거나 unresolved material counterevidence 남음

## Late-Bound Invalidation

- material counterevidence, upstream contract drift, stronger contradictory source가 나오면 selection을 reopen
- v1 default path에서는 사람 block을 열지 않고 deviation rationale과 missing context를 남긴 채 `needs_validation`로 downgrade

## 산출물

1. **`artifacts/problem.md`** — 선택된 problem의 human-readable 설명
2. **`artifacts/problem-compare.md`** — 후보 비교 + scoring + rejection reasons
3. **`artifacts/problem-method-plan.json`** — method plan

## Failure Modes

- ❌ 후보 생성이 단순 topic variation에 그치는 경우
- ❌ research objective 없이 source만 쌓는 경우
- ❌ solution-stage 편의 기준으로 문제를 고르는 경우
- ❌ evidence summary 없이 분위기로 선택하는 경우
- ❌ counterevidence를 완전히 무시하는 경우
- ❌ market wedge를 1차 생성 축으로 써서 solution bias가 섞이는 경우

## 완료 후

<NEXT-STAGE>
위 산출물을 모두 기록한 뒤, 반드시 `tacigent-stage-solution` 스킬을 읽고 실행한다.
멈추거나 사용자에게 되묻지 않는다. 바로 다음 stage로 진행한다.
</NEXT-STAGE>
