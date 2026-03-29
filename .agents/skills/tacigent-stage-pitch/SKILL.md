---
name: tacigent-stage-pitch
description: "Tacigent Stage 7: Pitch. decision-support artifact를 생성한다. 이것이 파이프라인의 마지막 stage다."
---

# Stage 7: Pitch

<FINAL-STAGE>
이 스킬은 Tacigent 파이프라인의 **마지막 stage**다.
이 스킬의 모든 작업을 완료하면 **clean exit summary**를 작성한다.
중간에 멈추거나 사용자에게 되묻지 않는다. 끝까지 실행한다.
</FINAL-STAGE>

## 참조 프로토콜

- `tacigent-method-first` — method framing
- `tacigent-swarm-critique` — swarm/critique loop
- `tacigent-research` — research protocol (anti-generic extensions + refresh)
- `tacigent-evidence-ladder` — evidence 판단
- `tacigent-readiness-gates` — readiness 판정

## 목적

- 팀이 대표에게 제안하는 **decision-support artifact**를 생성한다
- generic, template-driven, canned presentation이 아니라 **audience와 ask에 맞게 tailored**된 decision artifact
- **recommendation-first**: "이렇게 할 것을 제안합니다"가 먼저 오는 구조

## 입력

- `artifacts/problem.md` — 선택된 problem
- `artifacts/solution.md` — 선택된 solution
- `artifacts/design.md` — design direction
- `artifacts/build.md` — build 결과
- `artifacts/marketing.md` — marketing 전략
- `artifacts/launch-cells.json` — launch cells
- `workspace/app/` — 실제 구현된 제품 (참조)
- `RunSpec.inputs.pitch` — 사용자의 pitch 직접 입력 (있으면)

> **이어가기**: 이 stage의 artifact가 이미 일부 존재하면, 존재하는 artifact의 step은 건너뛰고 다음 step부터 이어간다.

## 실행 흐름

### Step 1: Method Framing + Meta-Research (Pitch-Specific)

`tacigent-method-first` 프로토콜을 따르되, **pitch-specific method fields** 포함:

- `selectedPitchMethod` — 예: `pre-read-first executive memo`, `objection-first board pitch`, `evidence-led recommendation`
- `artifactMode` — pre-read first / deck first / hybrid
- `audienceHandling` — audience profile 구성 방법
- `evidenceMappingMethod` — claim-to-source mapping 방법
- `synthesisRule`
- `stopCondition`

이후의 refresh, narrative module 조합, slide/pre-read 구성은 **선택된 pitch method의 실행**으로 취급한다.

`artifacts/pitch-method-plan.json`으로 기록.

### Step 2: Late-Bound Refresh & Audience Frame

1. **Audience Profile** — 이 피치를 누가 읽는가?
   - 기본: 대표/의사결정자
   - 사용자가 지정한 audience가 있으면 적용
   - pitch는 generic demo deck이 아니라 **decision maker가 무엇을 승인해야 하는지**가 분명한 executive artifact

2. **Decision Frame** — 어떤 결정을 해야 하는가?

3. **Ask Contract** — 구체적으로 무엇을 요청하는가? (승인, 예산, 팀, 일정 등)

### Step 3: Anti-Generic Research Extensions

`tacigent-research` 프로토콜의 query families를 아래로 확장:

| Extension Query Family | 용도 |
|----------------------|------|
| `generic_deck_complaints` | 양산형 deck 불만 탐지 |
| `buzzword_without_proof` | 근거 없는 buzzword 패턴 탐지 |
| `slide_fatigue` | slide overload 패턴 탐지 |
| `first_three_slides` | 첫 3슬라이드 hooks/failures |
| `competition_template_failure` | 경쟁 슬라이드 template 실패 패턴 |
| `humanized_executive_copy` | 인간적 executive writing 패턴 |

bilingual seed queries:
- `AI-generated pitch deck`, `generic startup deck`, `buzzword-heavy executive presentation`
- `AI 티 나는 PPT`, `IR덱 망하는 이유`, `경쟁 슬라이드 매직 쿼드런트`

refresh와 final review는 사실 확인뿐 아니라 **template-driven rhetoric과 category-marketing filler**를 탐지하는 데도 사용한다.

### Step 4: Pre-Read First Draft

<MANDATORY>
**pre-read 첫 문단은 recommendation, rationale, decision ask를 즉시 포함해야 한다.**
summary → details → ask 순서가 아니라, **recommendation-first**.
</MANDATORY>

### Step 5: Adaptive Narrative Module 조합

기본 순서 (고정 spine이 아니라 adaptive):

1. **Executive Summary Card** — recommendation + rationale + ask
2. **Problem** — narrow customer, one measurable pain, one trigger/change
3. **Why Now** — timing drivers (fresh hot signal 기반)
4. **Recommended Plan** — solution + product + GTM
5. **Evidence** — claim-to-source mapping
6. **Risks / Alternatives** — honest한 위험 고지 + validation debt
7. **Ask** — 구체적 요청 + next steps
8. **Appendix** — 본문 claim 뒷받침용

### Step 6: Swarm Exploration (Pitch-Specific)

`tacigent-swarm-critique` 프로토콜을 따르되, pitch-specific defaults:

- 기본 exploration swarm: **7**
- audience, ask, recommendation spine이 이미 강하게 고정되면 **5로 downshift** (5 미만 금지)

### Step 7: Critique (Pitch-Specific Critics)

**Pitch-specific critic roles:**

1. **First-Principles Pruner** — 불필요한 slide/section 제거, 과장된 claim 축소
2. **Evidence Critic** — 모든 claim이 source에 매핑되는가? missing source 지적
3. **Objection Critic** — stated audience 기준 likely objection 3개에 대한 방어 가능성 점검
4. **Anchor-Drift Critic** — 사용자의 pitch 입력에서 벗어나지 않았는가
5. **Counterevidence Critic** — "이 제품을 진행하지 말아야 할 이유는?"

**5회 critique 모두 mandatory다.** downshift 금지.

### Step 8: Claim & Evidence Mapping

<MANDATORY>
모든 주요 claim은 **stageOutputs 또는 external source에 매핑**:

| Claim | Source | Status |
|-------|--------|--------|
| "[주장]" | [artifacts/problem.md + sourceRefs] | verified/supported/inferred/speculative |

**Evidence Rule:**
- evidence 없는 과장 표현 금지
- `AI`, `플랫폼`, `혁신`, `시너지`, `DX`, `next-gen` 같은 buzzword는 같은 block 안에서 **metric, example, operating proof 중 하나**로 닫아야 한다
- 주요 수치나 market sizing은 **source, date, implication**이 같이 보이지 않으면 불충분
- build verification과 모순되는 내용은 자동 canonicalization하지 않는다
- 불확실한 주장은 **`inferred` 또는 `speculative`로 명시**
</MANDATORY>

### Step 9: Narrative & Slide Rule

<MANDATORY>
**Opening:**
- narrow customer, one measurable pain, one trigger/change를 포함

**Slide Titles:**
- section label이 아니라 **claim headline** — `Problem`, `Solution`, `Market` 같은 제목만 있으면 fail 후보

**One-Job-Per-Slide:**
- 각 slide는 one decision 또는 one question에 매핑

**경쟁 Slide:**
- quadrant, petal, magic-map template를 기본값으로 허용하지 않는다
- 사용하려면 **axis, status-quo competitor, non-self-serving comparison logic** 필요

**Visual:**
- slide당 dominant visual 최대 1개
- unrelated decorative image 금지

**Copy:**
- final copy는 **humanization pass**를 거쳐 abstract filler, repetitive phrasing, boilerplate, category-marketing language를 줄인다
</MANDATORY>

### Step 10: Presentation Limits

- primary deck은 **8-12 core slides** 또는 이에 준하는 compact 구조
- appendix는 본문 claim 뒷받침용
- deck과 pre-read는 **같은 recommendation을 중심으로 정렬**
- leave-behind artifact는 **silent reading** 지원
- live deck은 narration 없이는 성립하지 않는 text dump가 되면 안 됨

### Step 11: Anti-Template Check

최종 pitch를 아래 기준으로 평가. 해당되면 **revision 필요**:

- ❌ 같은 구조와 핵심 문장만 유지한 채 회사 이름만 바꾸면 다른 팀에도 그대로 붙는가?
- ❌ generic pitch template의 빈칸만 채운 느낌인가?
- ❌ 이 제품만의 unique story가 없는가?
- ❌ audience의 구체적 관심사가 반영되지 않았는가?
- ❌ proof 없는 buzzword stack이 반복되는가?
- ❌ template competition slide가 비교 logic 없이 들어가는가?
- ❌ decorative visual은 많지만 decision 정보가 줄어드는가?
- ❌ polished하지만 likely objection에 답하지 못하는가?

### Step 12: Live Market Refresh & Contradiction Pass

<MANDATORY>
**build readiness가 `not_ready`인 경우:**
- build의 unresolved issues를 Risks / Alternatives 섹션에 명시한다
- 검증되지 않은 기능에 대한 claim은 `inferred` 또는 `speculative`로 표시한다
- recommendation에 build validation debt를 포함하고, ask에 검증 필요 항목을 명시한다
- pitch 전체를 `needs_validation`으로 표시한다

final canonicalization 직전에:

1. **Live Market Refresh** — why-now와 market signal을 **live refresh**
   - `tacigent-research`의 refresh mode 사용
   - time-sensitive data 업데이트

2. **Contradiction Pass** — 전체 stage 산출물 간 모순 확인:
   - problem target ↔ marketing ICP
   - solution value proposition ↔ build result
   - pitch claim ↔ 실제 제품/source-backed claims
   - 모순 발견 시 수정, 제거, 또는 explicit downgrade 결정
</MANDATORY>

### Step 13: Final Review (Non-Blocking)

- decision frame, evidence sufficiency, final ask wording은 **human approval로 block하지 않는다**
- 대신 stated audience 기준 **likely objection 3개**에 대한 방어 가능성을 점검
- unresolved weakness가 남으면 explicit downgrade, contradiction note, `needs_validation`으로 처리

### Step 14: Artifact 생성

**Primary: Pre-Read (Markdown)**
- recommendation-first
- 15분 내 의사결정 가능한 수준
- 각 section에 evidence reference

**Secondary: Pitch Deck (HTML)**
- `index.html` 단일 파일 (self-contained)
- 핵심 차트, flow diagram, 스크린샷 포함
- desktop-optimized, modern, clean

## Output Review Cycles (5회 필수)

`ralph-loop`의 OUTPUT-REVIEW-CYCLES 프로토콜을 따른다.

pre-read.md + index.html 작성 후, 5회의 제1원칙 리뷰를 수행한다. **Pitch-specific 리뷰 기준:**

1. **첫 문단이 recommendation + ask를 즉시 전달하는가?** — 서론/배경 설명으로 시작하면 삭제
2. **slide 수를 더 줄일 수 있는가?** — 같은 메시지를 전달하면서 slide를 합칠 수 있는지
3. **모든 claim이 source에 매핑되어 있는가?** — 매핑 없는 claim 삭제 또는 inferred로 표시
4. **anti-template check 재적용** — 회사 이름만 바꿔도 재사용 가능한 부분 제거
5. **likely objection 3개에 대한 방어가 충분한가?** — 방어가 약하면 보강

## Stop Condition

- ask contract, recommendation, major claim mapping 중 **하나라도 비면** canonicalization 불가
- unresolved contradiction이 남으면 canonicalization 불가
- **5회 산출물 리뷰가 완료되지 않으면 (review-1~5.md)** canonicalization 불가

## Readiness

`tacigent-readiness-gates` 프로토콜을 따른다.

- `not_ready`: ask/recommendation/claim mapping 부재, unresolved contradiction
- `needs_validation`: time-sensitive why-now claim에 refresh record 없음
- provisional: validation debt가 크더라도 explicit downgrade와 carry-forward risk가 기록되면 가능

## 산출물

1. **`artifacts/pitch/pre-read.md`** — primary decision-support document
2. **`artifacts/pitch/index.html`** — visual pitch artifact (self-contained HTML)
3. **`artifacts/pitch-method-plan.json`** — method plan

## Failure Modes

- ❌ pitch method를 고르지 않고 deck outline부터 쓰는 경우
- ❌ "예쁜 소개 자료"로 흘러가는 경우
- ❌ decision ask가 없는 경우
- ❌ why-now와 evidence가 분리된 경우
- ❌ marketing/build와 다른 메시지를 반복하는 경우
- ❌ 고정 8장 구조를 지키느라 실제 의사결정 정보를 희생하는 경우
- ❌ problem보다 solution/how 설명이 길어져 opening tension이 약해지는 경우
- ❌ slide 수/text density가 과해 핵심 ask가 묻히는 경우
- ❌ 회사 이름만 바꾸면 다른 category deck으로 재사용 가능한 경우
- ❌ proof 없는 buzzword stack이 반복되는 경우

## 완료 후: Clean Exit

<CLEAN-EXIT>
pitch 산출물 작성이 완료되면, 전체 run의 **Clean Exit Summary**를 작성한다:

```markdown
# Tacigent Run Complete 🎉

## Product: [productName]

## 생성된 산출물
- ✅ Intake: artifacts/intake.md
- ✅ Problem: artifacts/problem.md
- ✅ Solution: artifacts/solution.md
- ✅ Design: artifacts/design.md + design-contract.json
- ✅ Build: workspace/app/ + build.md
- ✅ Marketing: artifacts/marketing.md + launch-cells.json
- ✅ Pitch: artifacts/pitch/pre-read.md + pitch/index.html

## 핵심 결과
- Problem: [한 줄 요약]
- Solution: [한 줄 요약]
- Product: [실행 방법]
- GTM: [핵심 channel + first launch cell]
- Ask: [recommendation]

## Validation Debt
- [아직 검증하지 못한 것들]

## Next Steps
- [권장 다음 행동]
```

이것이 Ralph loop의 정상 종료다. 사용자에게 이 요약을 보여준다.
</CLEAN-EXIT>
