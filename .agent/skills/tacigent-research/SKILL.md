---
name: tacigent-research
description: "Tacigent 공통 프로토콜: Research Protocol. live internet research가 필요한 stage에서의 탐색 프로토콜. stage 스킬이 참조하는 sub-protocol이며 단독 invoke하지 않는다."
---

# Research Protocol

<ROLE>
이 스킬은 Tacigent stage 스킬이 참조하는 공통 sub-protocol이다.
단독으로 invoke하지 않는다. stage 스킬이 "research protocol을 따르라"고 할 때 이 문서의 절차를 적용한다.
</ROLE>

## 핵심 원칙

모든 stage에 동일한 live research를 강제하지 않는다. research는 **decision class와 stage 목적이 정당화할 때만** 쓴다.

## Research Modes

- **Discovery** — candidate generation, query expansion, space mapping
- **Validation** — chosen candidate나 claim의 proof burden 점검
- **Refresh** — final user-facing 또는 executive artifact 직전의 time-sensitive recheck

## Hot Signal Bias

`hot signal`의 meaning = broad web (news, search trends, community zeitgeist)

- 이는 hard gate가 아니라 **strong bias**다
- candidate generation에서는 evergreen problem space도 허용
- final selection에서는 fresh hot signal이 강한 후보를 **매우 강하게 우선**
- hot signal이 약한 후보를 고르면 **trend-backed 후보보다 나은 이유**를 selector justification에 명시
- freshness 평가는 **absolute date 기준**으로 한다 (현재 날짜 anchor)

## Query Families

stage 목적에 맞게 subset 또는 extension을 만든다:

| Family | 핵심 키워드 | 용도 |
|--------|-----------|------|
| **pain** | hate, annoying, frustrating, manual, slow, broken | 불만/고통 signal |
| **workaround** | spreadsheet, template, hack, workaround, I built my own | 대안 행동 signal |
| **switching** | alternative to, vs, moved from, replace, cancelled | 전환 의도 |
| **feature_gap** | missing, wish it had, integration, API, pricing complaint | 기능 부재 |
| **trust_risk** | privacy, security, scam, reliable, compliance | 신뢰 위험 |
| **timing_catalyst** | regulation, launch, funding, AI shift, seasonal trigger | 타이밍 촉매 |
| **trend_spike** | breaking launch, viral discussion, sudden search jump | 트렌드 급상승 |
| **counterevidence** | already solved, good enough, rarely happens, not worth it | 반증 |

## Source Classes

author/control과 content type으로 분류한다:

- **High-prior set**: `direct_user`, `first_party`, `internal`, `official_primary`
- **Corroborative set**: `reviews_marketplaces`, `technical_code`, `community_social`, `academic_theory`, `secondary_analysis`
- **Discovery-only set**: `search_discovery`

## Platform Rules

| Platform | 강점 | 주의점 |
|----------|------|--------|
| **Reddit** | archived complaint, workaround, switching language | — |
| **Threads** | live phrasing, zeitgeist 보조 | 보조 신호만 |
| **Google Trends** | normalized directional signal | TAM이나 exact volume으로 쓰지 않음 |
| **App/Review** | 최근성, 저평점/고평점 분리 | incentivized/verified 여부 구분 |
| **GitHub** | feature gap, migration friction, integration pain | 개발자 관점 편향 |
| **Search/AI summaries** | discovery surface | claim source로 쓰지 않음 |

## Evidence Function Coverage

source-class count보다 **evidence-function coverage**를 우선한다:

1. `direct_or_behavioral_signal` — 직접 관측된 행동/발언
2. `official_reality_check` — 공식 문서/데이터와의 대조
3. `adoption_or_commercial_proxy` — 채택/상업적 대리 지표
4. `counterevidence` — 반증
5. `freshness_check_if_time_sensitive` — 시간 민감 정보 최신성 확인

## Decision Class별 튜닝

| Decision Class | Research 요구 수준 |
|---------------|-------------------|
| **exploratory** | `researchCoverage.required=false` 가능 |
| **reversible / bounded** | 독립 2+ source class면 충분 |
| **irreversible / public-facing** | stronger corroboration, freshness check, explicit missing coverage 기록 |
| **high-stakes claim** | direct signal + corroboration 필수, 외부 source 1+ 필수 |

## Language Policy

- 기본: target market primary language 1개
- English: 글로벌 category, 영문 공식문서, 경쟁구도 확인에 유효할 때 추가
- competitor home-market language: missingCoverage 남으면 1개까지 추가
- social/community: native script, slang, code-switched phrasing까지 query family 반영

## Research Coverage Record

research-required stage는 아래를 기록한다:

```json
{
  "required": true,
  "sourceClasses": ["사용한 source class 목록"],
  "platforms": ["조사한 platform 목록"],
  "geoCoverage": "조사 지역 범위",
  "languageCoverage": ["사용한 언어"],
  "queryFamilies": ["사용한 query family"],
  "missingCoverage": "채우지 못한 coverage와 이유",
  "stopReason": "sufficient|timeboxed|not_required|blocked|no_higher_signal_found",
  "freshnessWindow": "time-sensitive claim이면 유효 기간"
}
```

## Stop Rules

| stopReason | 의미 |
|-----------|------|
| `sufficient` | decision class에 필요한 coverage 충족 |
| `timeboxed` | 할당된 조사 budget 소진 |
| `not_required` | 현재 stage/mode에서 live research 불필요 |
| `blocked` | access, tooling, policy 제한으로 불가 |
| `no_higher_signal_found` | 더 높은 prior/fresh source를 못 찾음 |

## Volatile Source Rules

- social post, review page, pricing page, changelog 등의 빠르게 변하는 source는 **retrievedAt**과 **absolute date**를 남긴다
- 가능하면 archiveRef 또는 snapshotHash를 남긴다
- capture 불가능하면 missingCoverage에 이유 기록

## Non-Rules

- 모든 stage가 web research를 해야 하는 것은 아니다
- Threads나 Reddit을 "항상" 써야 하는 것은 아니다
- source URL 수가 많다고 evidence가 강한 것은 아니다
