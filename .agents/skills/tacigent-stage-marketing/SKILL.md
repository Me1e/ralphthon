---
name: tacigent-stage-marketing
description: "Tacigent Stage 6: Marketing. build-aligned launch system을 수립한다. 완료 시 반드시 tacigent-stage-pitch를 invoke한다."
---

# Stage 6: Marketing

<CONTINUATION-MANDATE>
이 스킬의 모든 작업을 완료한 뒤, 반드시 `tacigent-stage-pitch` 스킬을 invoke해야 한다.
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

- 제품의 초기 GTM을 전략 메모가 아니라 **typed launch system**으로 수립한다
- build 결과와 정합하는 마케팅 전략을 만든다

## 입력

- `artifacts/problem.md` — 선택된 problem
- `artifacts/solution.md` — 선택된 solution
- `artifacts/design.md` — design direction
- `artifacts/build.md` — build 결과
- `workspace/app/` — 실제 구현된 제품 (참조)
- `RunSpec.inputs.marketing` — 사용자의 marketing 직접 입력 (있으면)

> **이어가기**: 이 stage의 artifact가 이미 일부 존재하면, 존재하는 artifact의 step은 건너뛰고 다음 step부터 이어간다.

## 실행 흐름

### Step 1: Method Framing + Meta-Research (Marketing-Specific)

`tacigent-method-first` 프로토콜을 따르되, **marketing-specific method fields** 포함:

- `selectedLaunchMethod` — 예: `proof-first launch`, `channel-first sequencing`, `experiment-first narrowing`
- `researchEmphasis` — 조사 중점 영역
- `comparisonMode` — launch cell/message/channel 비교 방식
- `synthesisRule` — 결과 합치는 방식
- `stopCondition`

이후의 research frame, launch cell generation, message/channel compare는 **선택된 launch method의 실행**으로 취급한다.

`artifacts/marketing-method-plan.json`으로 기록.

### Step 2: Research Frame & Signal Gathering

`tacigent-research` 프로토콜을 따른다.

**mode**: discovery + validation

수집:
1. **Research Frame** — 무엇을 왜 조사하는가 (query plan 포함)
2. **Signal Register** — 수집된 시장 신호들
3. **Competitor Map** — 경쟁사 landscape + positioning 분석
4. **Source Coverage Record** — `tacigent-research`의 coverage record

### Step 3: ICP & Messaging

**ICP (Ideal Customer Profile)** 정의:
- problem의 targetUser를 마케팅 관점으로 정제
- demographics + psychographics + behavioral triggers

**Message Hypotheses → Message Ladder:**
- problem pain points → message candidates
- solution value proposition → key promises
- 중요한 message claim은 **source-backed 또는 labeled inference** (`tacigent-evidence-ladder` 참조)
- awareness → interest → desire → action 단계별 메시지 구조

### Step 4: Launch Cell Generation

`tacigent-swarm-critique` 프로토콜을 따른다.

**No-Input Path:**
사용자 입력이 없으면 기본 exploration swarm으로 넓게 탐색한 뒤, synthesis에서 2-3개의 launch cell cluster로 압축하고 critique → compare → choose.

**Swarm Default (Marketing-Specific):**
- 기본 exploration swarm: **7**
- ICP가 매우 좁고 proof landscape가 명확하면 **5로 downshift** (5 미만 금지)

atomic planning unit = **launch cell**:

```json
{
  "cellId": "string",
  "segment": "target segment",
  "trigger": "what prompts action",
  "promisedOutcome": "what the user gets",
  "proofAsset": "evidence for the promise",
  "channel": "distribution channel",
  "successEvent": "measurable success signal",
  "phase": 1,
  "priority": "high|medium|low"
}
```

### Step 5: Critique (Marketing-Specific Critics)

**Marketing-specific critic roles:**

1. **First-Principles Pruner** — 불필요한 channel/message 제거, 과도한 GTM scope 축소
2. **Proof Critic** — claim이 source-backed인가? proof asset이 실재하는가?
3. **Channel-Fit Critic** — 이 channel이 이 segment에 실제로 도달하는가?
4. **Activation Critic** — activation event가 명확하고 측정 가능한가?
5. **Counterevidence Critic** — "이 channel/message가 효과 없을 근거는?"

**5회 critique 모두 mandatory다.** downshift 금지.

### Step 6: Channel Matrix & Experiments

**Channel Matrix:**
- 채널 우선순위는 단순 ranking이 아니라 **phased rollout + experiment sequence**
- Phase 1 (launch) / Phase 2 (growth) / Phase 3 (scale) 분리

**Experiments:**
- 각 channel/message 조합에 대한 A/B test 계획
- success metric + minimum sample size + decision criteria

### Step 7: Late-Bound Build Alignment

<MANDATORY>
**build readiness가 `not_ready`인 경우:**
- build의 unresolved issues와 verification 실패 내역을 확인한다
- 검증되지 않은 기능에 의존하는 claim은 `needs_validation`으로 downgrade한다
- launch cell의 proofAsset이 실제 build에서 동작하지 않으면 해당 cell을 제거하거나 대체한다
- marketing 전체를 `needs_validation`으로 표시하고 validation debt를 기록한다

final marketing canonicalization 전에 반드시 아래를 **다시 읽는다**:

- build readiness 상태
- build validation state
- build verification results
- build unresolved issues
- build verification artifacts

build evidence와 모순되는 primary claim이나 message는:
1. `contradiction`으로 기록한 뒤
2. **제거, downgrade, 또는 explicit reframe** 중 결정
3. **조용한 조정은 허용하지 않는다** — 변경 사유를 명시
</MANDATORY>

### Step 8: 산출물 작성

**Required Structure (전체 목록):**
- ICP schema
- launch cells
- claim map
- message ladder
- channel matrix
- experiments
- activation event
- time-to-value target
- success metrics
- enablement plan
- post-launch review

## Selection & Tie-Breaker

**Primary selection unit:** `launch cell`
**Stage-level winner:** `primary launch cell + supporting experiment sequence`

**Tie-breaker 우선순위:** `proof strength → activation clarity → channel fit → expansion room`

viable launch cell이 1개만 남으면 single-candidate path 허용, why-no-compare와 dropped alternative reason을 남긴다.

## Reopen Trigger

- build readiness downgrade
- material market refresh
- claim contradiction

## Output Review Cycles (5회 필수)

`ralph-loop`의 OUTPUT-REVIEW-CYCLES 프로토콜을 따른다.

marketing.md + launch-cells.json 작성 후, 5회의 제1원칙 리뷰를 수행한다. **Marketing-specific 리뷰 기준:**

1. **launch cell 수를 더 줄일 수 있는가?** — 효과가 비슷한 cell을 합치거나 우선순위가 낮은 cell 삭제
2. **claim이 build evidence와 정합하는가?** — build.md와 대조하여 모순 제거
3. **channel이 target user에게 실제로 도달하는가?** — "있으면 좋겠다" 채널 삭제
4. **activation event가 측정 가능한가?** — 모호한 metric → 구체적 수치로 교체
5. **마케팅 카피에 AI 냄새가 나지 않는가?** — buzzword, 과장 표현, 반복 패턴 삭제

## Stop Condition

아래가 **비어 있으면** canonicalization하지 않는다:
- launch sequencing
- activation event
- success metric
- launch cells
- **5회 산출물 리뷰 (review-1~5.md)**

## Readiness

`tacigent-readiness-gates` 프로토콜을 따른다.

- `not_ready`: build evidence와 unresolved contradiction 남아 있음
- `needs_validation`: primary launch cell의 wedge/outcome/proof가 모두 약함
- `community_social` 단독 신호나 `pure inference`만으로 primary claim을 세우면 `ready` 불가

## 산출물

1. **`artifacts/marketing.md`** — marketing 전략 문서 (ICP, message ladder, channel matrix, experiment plan, launch objective, build alignment report)
2. **`artifacts/launch-cells.json`** — structured launch cells
3. **`artifacts/marketing-method-plan.json`** — method plan

## Failure Modes

- ❌ launch method를 고르지 않고 message 문안부터 쓰는 경우
- ❌ 단순 channel ranking만 있고 launch sequencing이 없는 경우
- ❌ activation metric이 없는 경우
- ❌ build proof 없이 기능 약속을 marketing claim으로 쓰는 경우
- ❌ no-input path가 없어 sparse run에서 stage가 막히는 경우
- ❌ launch cell 없이 큰 문단 메모만 남겨 실행 단위가 없는 경우

## 완료 후

<NEXT-STAGE>
위 산출물을 모두 기록한 뒤, 반드시 `tacigent-stage-pitch` 스킬을 읽고 실행한다.
멈추거나 사용자에게 되묻지 않는다. 바로 다음 stage로 진행한다.
</NEXT-STAGE>
