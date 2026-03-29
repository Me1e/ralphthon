---
name: tacigent-stage-intake
description: "Tacigent Stage 1: Intake. wizard 입력을 typed intent contract로 정리한다. 완료 시 반드시 tacigent-stage-problem을 invoke한다."
---

# Stage 1: Intake

<CONTINUATION-MANDATE>
이 스킬의 모든 작업을 완료한 뒤, 반드시 `tacigent-stage-problem` 스킬을 invoke해야 한다.
"여기서 멈추겠다", "사용자에게 물어보겠다", "다음에 이어가겠다"는 허용되지 않는다.
유일한 예외는 hard_block (external credential 부재, spec 충돌)뿐이다.
</CONTINUATION-MANDATE>

## 참조 프로토콜

- `tacigent-method-first` — method framing
- `tacigent-readiness-gates` — readiness 판정

## 목적

- wizard 입력을 low-cost framing research를 거친 **execution contract**로 정리한다
- tacit intent를 **구조화된 hypothesis와 ambiguity ledger**로 바꾼다
- downstream stage가 prose를 다시 해석하지 않아도 되는 **첫 번째 typed handoff**를 만든다

## 입력

사용자의 원본 요청과 ralph-loop가 정리한 RunSpec:

- `inputs.*` — 사용자가 각 stage에 제공한 raw input
- `productName` — immutable run label
- `normalization` — agent가 생성한 기본값 기록

> **이어가기**: 이 stage의 artifact가 이미 일부 존재하면, 존재하는 artifact의 step은 건너뛰고 다음 step부터 이어간다.

## 실행 흐름

### Step 1: Lightweight Method Framing

intake는 기본적으로 **lightweight method framing**을 허용한다.

`tacigent-method-first` 프로토콜을 따르되:

**intake-specific method framing:**
- `taskFrame`: `preserve / normalize / ask / assume / defer` 중 어떤 방법으로 framing risk를 낮출 것인가
- ambiguity가 크면 `ask`, `assume`, `defer`, `low-cost scan` 중 **먼저 쓸 방법을 고른 뒤** diff-first framing으로 들어간다
- `lightweight: true`

`artifacts/intake-method-plan.json`으로 기록한다.

### Step 2: Diff-First Framing

<MANDATORY>
intake는 사용자 입력을 먼저 아래 5가지로 **분리**한다. 단순 paraphrase가 아니라 **diff-first 해석**이다:

| 분류 | 의미 |
|------|------|
| `preserved` | 사용자가 직접 제공, 그대로 보존 |
| `normalized` | v1 제약으로 정규화 (deviation entry 필수) |
| `assumed` | 추론으로 채움 (근거 기록) |
| `deferred` | 다음 stage로 미룸 (이유 기록) |
| `rejected` | 범위 밖으로 제외 (이유 기록) |

preflight와 interpretation ledger는 이 diff를 **사람이 읽기 쉽게 렌더링한 view**다.
</MANDATORY>

### Step 3: Ambiguity Triage

ambiguity를 아래 5가지 중 하나로 분류한다:

| 분류 | 의미 |
|------|------|
| `clear` | 해석이 명확 |
| `underspecified` | 정보 부족하지만 합리적 추정 가능 |
| `multi-intent` | 여러 의도가 섞여 있음 |
| `contradictory` | 입력 내 모순 |
| `low-confidence` | 해석은 가능하나 확신 낮음 |

대응 방식:

- **`ask`** — 다음 stage를 막거나 product direction이 materially 달라질 때**만** 허용
- **`assume`** — 합리적 기본값이 있고 위험이 낮을 때
- **`defer`** — 지금 확정할 필요가 없고 downstream stage가 더 잘 다룰 수 있을 때

### Step 4: Intent Frame 구성

```json
{
  "intentFrame": {
    "objective": "핵심 목표",
    "targetUser": "대상 사용자",
    "jobToBeDone": "사용자가 완수하려는 일",
    "desiredOutcome": "원하는 결과",
    "deliverables": ["산출물 목록"],
    "hardConstraints": ["절대 위반 불가 제약"],
    "softConstraints": ["가급적 지키되 유연한 제약"],
    "nonGoals": ["명시적으로 하지 않는 것"]
  }
}
```

### Step 5: Low-Cost Market/Context Scan

framing risk를 낮추기 위한 **저비용 보조 신호** 수집:
- 웹 검색으로 빠르게 관련 시장 동향 확인
- 경쟁 제품/대안 존재 여부 확인
- research가 실행되면 `tacigent-research`의 source class와 provenance 규칙을 따른다
- 이 단계의 research 목적은 canonical market decision이 아니라 **framing risk를 낮추는 것**이다

### Step 6: Downstream Contract 생성

```json
{
  "downstreamContract": {
    "problemFocus": "problem stage가 집중해야 할 영역",
    "solutionFocus": "solution stage가 고려할 방향",
    "designFocus": "design stage의 핵심 고려사항",
    "validationPriorities": ["검증 우선순위"]
  }
}
```

### Step 7: Title Protocol

- `RunSpec.productName`은 **immutable run label**로 유지
- 필요하면 2-3개의 public-facing title candidate 생성
- title은 사용자의 핵심 명사와 intentFrame을 최대한 유지
- marketing copy처럼 과장하지 않는다
- `selectedTitle`이 run label과 다르면 rationale을 남긴다

## Swarm Default (Intake-Specific)

- intake의 기본 exploration path는 **single-path**다
- ambiguity가 크거나 multi-intent risk가 남으면 **3 branch lightweight framing swarm**으로 올릴 수 있다
- critic이 필요하면 `first-principles pruner`, `anchor-drift critic`, `ambiguity critic`을 우선한다
- **second critique round는 intake 기본값이 아니다** — `ask/assume/defer` 선택이 downstream scope를 materially 바꾸거나 out-of-scope normalization risk가 클 때만 mandatory로 올린다
- third critique는 intake의 일반 경로가 아니다. contradictory interpretation이 revision 뒤에도 남을 때만 escalation한다

## Clarification Budget

- 기본값 `0-2` questions, hard cap `3`
- `ask`는 `high impact + low reversibility + safe defer 불가` 조건을 만족할 때만 허용
- `ask`는 preflight 안에서 해결하는 것을 기본값으로 둔다
- 나머지는 `assumptionLedger` 또는 `deferLedger`로 넘긴다

## Stop Condition

아래를 **모두 만족**할 때 canonicalization 가능:

- `intentFrame`이 생성되었고
- selected framing method가 기록되었고
- `ambiguityRegister`, `assumptionLedger`, `deferLedger`가 채워졌고
- `downstreamContract`가 비어 있지 않고
- out-of-scope normalization이 있으면 이유가 기록되었을 때

## Readiness

`tacigent-readiness-gates` 프로토콜을 따른다.
intake는 provisional path를 더 자주 허용하는 stage다.

## 산출물

모든 산출물은 `.tacigent/artifacts/`에 저장:

1. **`artifacts/intake.md`** — 사람이 읽을 수 있는 intake 요약
2. **`artifacts/interpretation-ledger.md`** — diff-first 해석 기록의 human-readable view
3. **`artifacts/intake-method-plan.json`** — method plan

## v1 범위 밖 입력 처리

- 모바일 네이티브 → 웹 제품으로 정규화
- 운영 자동화/백오피스 → v1 scope 내 웹 product로 축소
- 기존 서비스 수정 → greenfield product로 재구성
- external OAuth → local credential auth baseline
- managed DB → local SQLite, PG-upgradable baseline

대응 순서: `사용자 의도 보존 → v1 구현 가능 형태로 정규화 → interpretation record에 이유 기록`

## Invariants

- raw user input은 **절대** 덮어쓰지 않는다
- 사용자가 특정 product/problem concept를 명시하지 않았다면, intake는 concrete idea selection을 잠그지 않고 **problem stage로 넘긴다**
- intake는 sibling run, parent directory, previous-run artifact를 참조하지 않는다

## Failure Modes

아래에 해당하면 intake가 실패하고 있는 것이다:

- ❌ 입력을 요약만 하고 구조화하지 못한 경우
- ❌ 모호함을 모두 질문으로 되돌리는 경우
- ❌ 반대로 너무 많이 추정해서 사용자의 의도를 지워버리는 경우
- ❌ framing method를 고르지 않고 질문/추정을 섞어 쓰는 경우
- ❌ run label과 public title을 혼동하는 경우
- ❌ diff-first 해석이 아니라 단순 paraphrase만 남기는 경우

## 완료 후

<NEXT-STAGE>
위 산출물을 모두 기록한 뒤, 반드시 `tacigent-stage-problem` 스킬을 읽고 실행한다.
멈추거나 사용자에게 되묻지 않는다. 바로 다음 stage로 진행한다.
</NEXT-STAGE>
