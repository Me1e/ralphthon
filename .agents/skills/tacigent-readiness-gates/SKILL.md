---
name: tacigent-readiness-gates
description: "Tacigent 공통 프로토콜: Readiness Gates. ready/needs_validation/not_ready 3단계 판정과 소비/전이 규칙. stage 스킬이 참조하는 sub-protocol이며 단독 invoke하지 않는다."
---

# Readiness Gates

<ROLE>
이 스킬은 Tacigent stage 스킬이 참조하는 공통 sub-protocol이다.
단독으로 invoke하지 않는다. stage 스킬이 readiness를 판정할 때 이 문서의 규칙을 적용한다.
</ROLE>

## 핵심 원칙

Tacigent는 모든 선택을 같은 확신도로 canonicalize하지 않는다. 각 stage output에는 **readiness status**가 붙고, downstream stage는 이 status에 따라 소비 방식을 조절한다.

## 3단계 Readiness

### `ready`
- 현재 evidence와 제약 안에서 **다음 stage로 넘겨도 되는** 상태
- 다음 stage의 canonical handoff와 canonicalization 근거로 쓸 수 있다

### `needs_validation`
- canonical choice는 했지만 아직 **provisional**이다
- downstream은 이를 **irreversible settled truth처럼 취급하면 안 된다**
- research, compare, draft, repair는 진행할 수 있다
- 다만 **irreversible build choice나 final marketing/pitch claim의 단독 근거로는 쓰지 않는다**

### `not_ready`
- 다음 stage로 넘기기 전에 **framing 또는 proof를 더 해야** 하는 상태
- 현재 output은 canonical handoff에 쓸 수 없다
- 현재 stage 또는 upstream stage를 reopen하고 proof/validation을 더 해야 한다

## 판정 순서

```
blocking condition → not_ready
validation debt → needs_validation
그 외 → ready (기본값)
```

## 판정 기록 규칙

| 기록 대상 | 기록 위치 |
|----------|----------|
| `needs_validation`의 주된 근거와 남은 검증 항목 | `outstandingChecks` |
| `not_ready`를 만든 blocking 요인 | `blockingRisks` |
| research 부족이나 미충족 coverage | `missingCoverage` |
| boundary decision의 반증이나 downgrade 근거 | `disconfirmingEvidence` |
| downstream이 주의해야 할 provisional risk | `carryForwardRisks` |

## 상태 전이 규칙

later-stage contradiction, freshness expiry, verification fail, anchor deviation은 **earlier output을 downgrade**할 수 있다:

- `ready → needs_validation` — 방향은 유지되지만 proof, freshness, corroboration이 약해진 경우
- `ready|needs_validation → not_ready` — 핵심 contract, evidence, verification이 깨진 경우

### Reopen 규칙

- 기존 checkpoint를 **조용히 수정하지 않고** 새 checkpoint와 superseding output으로 처리한다
- revalidate는 `outstandingChecks`나 `whatWouldFlipDecision` 조건이 해소되었을 때 수행한다

## Stage별 엄격도 기본값

| Stage 그룹 | 기본 성격 |
|-----------|----------|
| intake / problem / solution | provisional path를 **더 자주 허용** |
| design / build / pitch | **stricter gate**를 더 자주 사용 |
| marketing | 전략 draft는 provisional 가능, user-facing claim에서는 보수적 |

각 stage의 구체적 threshold는 해당 stage 스킬이 정의한다.

## Escalation

- `blockingRisks`가 있고 safe assumption path가 없으면 현재 stage 또는 upstream을 reopen한다
- v1 default Ralph loop는 이 상황을 기본적으로 **human block으로 보내지 않는다**
- 대신 `not_ready`, `needs_validation`, `degraded mode`, refresh branch 중 하나로 처리한다
- downgrade된 upstream output에 의존한 downstream output은 **stale로 간주**하고 refresh 전 final canonicalization을 금지한다
