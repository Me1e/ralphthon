---
name: tacigent-swarm-critique
description: "Tacigent 공통 프로토콜: Swarm Orchestration & Critique. 홀수 탐색, 단일 synthesis, 2회 critique/revision, first-principles pruning. stage 스킬이 참조하는 sub-protocol이며 단독 invoke하지 않는다."
---

# Swarm Orchestration & Critique Protocol

<ROLE>
이 스킬은 Tacigent stage 스킬이 참조하는 공통 sub-protocol이다.
단독으로 invoke하지 않는다. stage 스킬이 "swarm-critique를 따르라"고 할 때 이 문서의 절차를 적용한다.
</ROLE>

## 핵심 원칙

Swarm은 "많이 돌리기"가 목적이 아니라, non-trivial task에서 **방법 선택, 병렬 탐색, 비평, pruning을 안정적으로 수행하기 위한 bounded runtime policy**다.

## 기본 Loop

```
1. Method Framing (tacigent-method-first 참조)
2. Odd-Numbered Exploration Swarm
   → non-trivial task: 5 branches
   → bounded/lightweight task: 3 branches
   → trivial task: single-path 허용
3. Single Synthesis — 탐색 결과를 하나의 draft로 합침
4. Critique Round 1 — 5명의 역할별 critic이 비평
5. Revision — critique 반영하여 수정
6. Critique Round 2 — 동일 critic 구조로 재비평
7. Revision — critique 반영하여 재수정
8. Choose / Canonicalize — 최종 선택 후 canonical output 기록
```

## Exploration (탐색)

- 기본 branch 수는 **홀수**다 (5 또는 3).
- 각 branch는 `explorer` 역할을 가진다.
- branch는 **방법 후보 비교** 또는 **선택된 방법의 병렬 실행**을 위한 수단이다.
- vote는 참고 신호일 뿐 final decision rule이 아니다.

### 실행 방법

에이전트가 실제로 5개의 독립된 프로세스를 띄울 수 없으므로, **순차적 role-play 방식**으로 탐색한다:

1. 각 branch의 관점/접근법을 미리 정의한다
2. 각 branch 관점에서 순서대로 결과를 생성한다
3. 모든 branch 결과를 모은 뒤 synthesis로 넘어간다

## Synthesis (합성)

- `synthesizer` 역할이 exploration 결과를 **하나의 draft 또는 synthesis packet**으로 합친다.
- git merge가 아니라 `compare → choose → canonicalize`다.
- 각 branch의 강점을 보존하고 약점을 제거하는 방향으로 합친다.

## Critique (비평)

<MANDATORY>
critique prompt에는 반드시 아래 문자열이 들어가야 한다:

**"일론머스크의 제 1원칙"**

이 문자열 직후에 아래의 Tacigent식 First-Principles Pruning Rubric을 반드시 함께 적용한다.
</MANDATORY>

### Critic 역할 (5명)

identical critic 5개를 돌리는 방식은 **금지**한다. 아래 역할별로 분화된 critic을 사용한다:

1. **First-Principles Pruner** (필수 역할)
   - 목표 달성에 직접 필요하지 않은 요소를 제거한다
   - 관습, analogy, 업계 템플릿만으로 남아 있는 구조를 의심한다
   - `add`보다 `delete`, `compress`, `simplify`를 먼저 검토한다

2. **Anchor-Drift Critic**
   - 사용자의 원래 의도에서 벗어난 부분을 지적한다
   - preserve → extend → de-risk → deviate 우선순위를 검증한다

3. **Evidence Critic**
   - 주장에 근거가 있는지 검증한다
   - source-backed가 아닌 claim을 지적한다

4. **Execution Critic**
   - 실행 가능성, 기술적 타당성을 검증한다
   - build-safe한지, 구현 가능한지 평가한다

5. **Counterevidence Critic**
   - 반대 论거, 반례, 위험을 제시한다
   - "이미 해결된 문제인가?", "충분히 좋은 대안이 있는가?"를 질문한다

### First-Principles Pruning Rubric

모든 critique round에서 아래를 적용한다:

1. 먼저 문제를 **irreducible facts, hard constraints, real goals**로 분해한 뒤 그 위에서 다시 조립한다
2. 목표 달성에 직접 필요하지 않은 요소는 **제거**한다
3. 관습, analogy, 업계 템플릿, "원래 이렇게 한다"는 이유만으로 남아 있는 구조는 먼저 **의심**한다
4. 같은 결과를 더 단순하게 낼 수 있으면 **더 단순한 쪽을 우선**한다
5. retained element는 convention이 아니라 **fundamentals와 necessity**로 설명 가능해야 한다
6. 추가 기능, 추가 설명, 추가 추상화는 **necessity가 증명될 때만** 유지한다
7. `add`보다 `delete`, `compress`, `simplify`를 **먼저 검토**한다

## Revision (수정)

- critic 결과를 반영해 draft를 수정하는 `reviser` 역할이다.
- critique를 무시하거나 형식적으로만 반영하면 안 된다.
- 단, critique가 사용자 의도에 반하면 preserve 원칙에 따라 reject할 수 있다. reject할 때는 이유를 남긴다.

## Choose / Canonicalize

- final selection은 항상 **criteria-based selector justification**을 필요로 한다.
- `selectorJustification`에는:
  - applied criteria / tie-breaker
  - winner / runner-up
  - strongest disconfirming evidence
  - whatWouldFlipDecision
- 2개 이상 후보를 비교했다면 최소 1개의 runner-up과 decisive loss reason을 남긴다.

## Third Critique (제한적 허용)

third critique round는 아래 경우에**만** optional escalation으로 허용:
- public-facing output
- irreversible decision
- low separation between winner and runner-up
- contradiction-heavy output

## Execution Mode → Compression Ladder

`RunSpec.executionMode`에 따라 기본 파라미터가 결정된다:

| executionMode | Exploration | Critique Rounds | Research | 비고 |
|--------------|------------|----------------|----------|------|
| `normal` | 5 branches | 2 rounds | full | |
| **`tight`** | **3 branches** | **2 rounds** | **focused** | **기본값** |
| `aggressive` | 3 branches | 1 round | minimal | |
| `terminal` | 1 branch (single-path) | 1 round | skip optional | |

**기본값은 `tight`다.** stage 스킬이 "기본 exploration swarm: 5"라고 적혀 있어도, `executionMode=tight`이면 **3으로 읽는다**.

stage-specific downshift 조건(viable candidate가 빠르게 수렴 등)은 `tight`의 3에서 **추가로 1까지 내릴 수 있다**.
stage-specific upshift는 `tight`에서 허용하지 않는다. `normal`에서만 5를 사용한다.

downshift가 일어나면 반드시 기록한다:
- `why-no-swarm` 또는 `why-no-second-round`
- `budgetRationale`

## Smoke Mode

`smoke` mode에서는 selected stage set을 줄이지 않는다. 대신:
- single-path exploration
- critique 1회
- 최소 critic role set (first-principles pruner + 1)
- narrow research/tool pass
- optional verification/polish off

## Lightweight Exception

intake, tiny build repair, 명백한 single-path correction은 lightweight exception을 허용한다. 이 경우에도 최소한:
- selected method
- 왜 swarm downshift가 안전한지에 대한 rationale
- why-no-second-round 또는 why-no-swarm
