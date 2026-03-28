---
name: tacigent-evidence-ladder
description: "Tacigent 공통 프로토콜: Evidence Ladder. external claim의 source class prior와 claim status 규칙. stage 스킬이 참조하는 sub-protocol이며 단독 invoke하지 않는다."
---

# Evidence Ladder

<ROLE>
이 스킬은 Tacigent stage 스킬이 참조하는 공통 sub-protocol이다.
단독으로 invoke하지 않는다. stage 스킬이 evidence 판단을 해야 할 때 이 문서의 규칙을 적용한다.
</ROLE>

## 핵심 원칙

Tacigent는 externally grounded claim을 같은 prior로 취급하지 않는다. source의 출처, 직접성, 최신성에 따라 **claim의 신뢰 수준이 달라진다.**

## 적용 범위

- 기본 대상: `market_signal`, `problem`, `marketing`, `pitch` 성격의 **외부 주장**
- build verification, design contract, workspace proof 같은 **internal proof**는 각 stage의 verification 규칙을 우선한다

## Source Class Prior Buckets

### High-Prior
- `direct_user` — 사용자가 직접 관측한 행동/발언
- `first_party` — 1차 자료 (공식 문서, 직접 데이터)
- `internal` — 내부 데이터/관측
- `official_primary` — 공식 1차 소스

### Corroborative / Directional
- `reviews_marketplaces` — 리뷰 사이트, 마켓플레이스 데이터
- `technical_code` — GitHub, 기술 문서, API 문서
- `community_social` — Reddit, Threads, 커뮤니티
- `academic_theory` — 학술 연구, 이론
- `secondary_analysis` — 2차 분석 리포트

### Discovery-Only
- `search_discovery` — 검색 결과, AI summary

### Non-Canonical Alone
- `agent synthesis` — 에이전트가 합성한 결론
- `pure inference` — 순수 추론
- AI summary — AI가 요약한 내용

## 핵심 규칙

1. `sourceClass`는 `evidenceStrength`가 아니다. claim-level strength는 **directness, recency, corroboration, verification state**를 함께 본다.

2. `community_social`, `secondary_analysis`, `agent synthesis`, AI summary **만으로** canonical claim이나 canonical selection을 정당화하지 않는다.

3. `search_discovery`와 AI summary는 **discovery surface**로는 쓸 수 있지만, 단독 corroboration으로 세지 않는다.

4. `agent synthesis`와 AI summary는 반드시 underlying `sourceRefs` 또는 `artifactRefs`를 가리켜야 한다.

5. `pure inference`는 canonical claim이 될 수 없고 **`inferred` 또는 `speculative`로만** 남길 수 있다.

6. external claim을 `readiness=ready`의 근거로 쓰려면:
   - claim type에 맞는 **high-prior source 1개**
   - **independent corroboration 1개 이상**

7. `ClaimRecord.status=verified`로 올리려면:
   - 위 burden 충족
   - unresolved material conflict 없음

8. build/success claim이나 user-facing feature promise는 **required verification pass와 artifact proof** 없이는 올리지 않는다.

## Freshness 규칙

- time-sensitive claim은 **source freshness, claim freshness, stage freshness**를 함께 본다
- why-now, public pitch, live marketing claim 같은 freshness-sensitive output은 `freshnessWindow`와 last validation record를 남긴다

## Conflict 처리

- conflicting sources는 recency와 directness만이 아니라 **claim domain, auditability, volatility, sample bias, incentive bias**를 같이 본다
- unresolved material conflict는 `contradictionRefs`로 기록하고, claim을 `verified`나 `ready`로 올리지 않는다

## Claim Status

| Status | 의미 |
|--------|------|
| `verified` | high-prior source + corroboration + no material conflict |
| `supported` | source-backed이지만 corroboration이 부분적 |
| `inferred` | agent synthesis 또는 reasonable inference |
| `speculative` | 근거 약하거나 pure inference |
| `contradicted` | material counterevidence 존재 |
