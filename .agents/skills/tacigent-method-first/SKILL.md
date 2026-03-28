---
name: tacigent-method-first
description: "Tacigent 공통 프로토콜: Method-First Execution. 모든 stage에서 산출물을 만들기 전에 반드시 방법을 먼저 정하는 절차. stage 스킬이 참조하는 sub-protocol이며 단독 invoke하지 않는다."
---

# Method-First Execution Protocol

<ROLE>
이 스킬은 Tacigent stage 스킬이 참조하는 공통 sub-protocol이다.
단독으로 invoke하지 않는다. stage 스킬 내부에서 "method-first execution을 따르라"고 할 때 이 문서의 절차를 적용한다.
</ROLE>

## 핵심 원칙

**task를 받으면 바로 산출물부터 만들지 않는다. 먼저 그 task를 가장 잘 풀 수 있는 방법을 정하고, 그 방법으로 실행한다.**

여기서 `task`는 코딩, 디버깅, 특정 주제 리서치, 무엇을 리서치할지 정하는 일까지 포함한다.

## 필수 순서

non-trivial task는 canonicalization 전에 반드시 아래를 순서대로 결정하고 기록한다:

1. **Task Frame** — 지금 무엇을 해야 하는가
2. **Success Criteria** — 성공은 무엇으로 측정하는가
3. **Constraints** — 어떤 제약이 있는가
4. **Candidate Methods** — 가능한 접근 방식 후보들 (explicit compare가 있을 때)
5. **Selected Method** — 왜 이 방법을 골랐는가
6. **Branch Plan** — 병렬 탐색이 필요하면 어떻게 나눌 것인가
7. **Synthesis Rule** — branch 결과를 어떻게 합칠 것인가
8. **Stop Condition** — 언제 멈출 것인가

## Method Plan Artifact

모든 stage는 method plan을 `artifacts/<stage>-method-plan.json`으로 남긴다.

```json
{
  "taskFrame": "string — 이 stage가 풀어야 하는 task 설명",
  "successCriteria": ["string — 측정 가능한 성공 기준들"],
  "constraints": ["string — 제약 조건들"],
  "candidateMethods": ["string — 고려한 방법 후보들 (단일 방법이면 왜 비교를 안 했는지 why-no-compare 기록)"],
  "selectedMethod": "string — 선택한 방법과 이유",
  "branchPlan": "string — 병렬 탐색 계획 (없으면 why-no-swarm)",
  "synthesisRule": "string — 결과 합치는 방식",
  "stopCondition": "string — 중단 조건",
  "explorationBranchCount": "integer|null — 탐색 branch 수",
  "synthesisMode": "single-synthesizer|lightweight|null",
  "critiqueRoundsMin": "integer|null — 최소 비평 횟수",
  "criticRoles": ["string — 비평가 역할들"],
  "pruningPolicy": "string|null — 가지치기 정책",
  "lightweight": false
}
```

## Lightweight Contraction

아래 조건을 **모두** 만족할 때만 lightweight method framing을 허용한다:

- task가 trivial하다 (intake 정리, 명백한 single-path repair 등)
- 병렬 탐색의 이점이 없다
- 실패해도 되돌리기 쉽다

lightweight path에서도 최소한 아래는 남긴다:
- `selectedMethod`
- `stopCondition`
- 왜 lightweight path가 안전한지에 대한 짧은 rationale
- `lightweight: true`

## 핵심 규칙

- action 전에 항상 "지금 무엇을 해야 하는가"보다 **"지금 어떤 action이 가장 좋은가"**를 먼저 고른다.
- method selection은 사용자의 의도를 뒤엎기 위한 장치가 아니다. `preserve → extend → de-risk → deviate only if necessary`를 더 잘 수행하기 위한 상위 절차다.
- parallel branch는 무작정 많이 띄우지 않는다. method divergence가 있거나 선택된 방법이 병렬 실행 이점을 줄 때만 늘린다.
- branch 결과 합치는 로직은 git merge가 아니라 `compare → choose → canonicalize`다.
- single-method path를 택하면 why-no-compare를 함께 남긴다.

## Non-Rules

- 모든 task가 heavy multi-branch compare를 해야 하는 것은 아니다.
- 모든 stage가 web research를 해야 하는 것은 아니다.
- 병렬 branch 수가 많을수록 method quality가 높다는 뜻은 아니다.
