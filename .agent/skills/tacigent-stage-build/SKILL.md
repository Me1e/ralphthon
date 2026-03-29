---
name: tacigent-stage-build
description: "Tacigent Stage 5: Build. design output을 실제 동작하는 web product로 구현한다. 완료 시 반드시 tacigent-stage-marketing을 invoke한다."
---

# Stage 5: Build

<CONTINUATION-MANDATE>
이 스킬의 모든 작업을 완료한 뒤, 반드시 `tacigent-stage-marketing` 스킬을 invoke해야 한다.
"여기서 멈추겠다", "사용자에게 물어보겠다", "다음에 이어가겠다"는 허용되지 않는다.
유일한 예외는 hard_block (external service credential 부재로 실행 불가)뿐이다.
</CONTINUATION-MANDATE>

## 참조 프로토콜

- `tacigent-method-first` — method framing (repair strategy 포함)
- `tacigent-swarm-critique` — swarm/critique loop (architecture decisions)
- `tacigent-readiness-gates` — readiness 판정

## 목적

- 실제 동작 가능한 **web product**를 생성한다
- design output을 **runnable workspace와 verification result**로 바꾼다
- verification-backed: 동작하지 않는 코드는 남기지 않는다

## 입력

- `artifacts/design.md` — design document
- `artifacts/design-contract.json` — machine-readable design contract
- `artifacts/solution.md` — solution (mvpScope, buildConstraints)
- `artifacts/problem.md` — problem context

## Tech Stack (v1 Fixed)

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16.x** App Router |
| UI Library | **React 19** |
| Styling | **Tailwind CSS 4** + **shadcn/ui** + **Radix Primitives** |
| Icons | **lucide-react** |
| Language | **TypeScript** |
| Auth (필요시) | **Better Auth 1.x** email/password |
| DB (필요시) | **Drizzle ORM** + **better-sqlite3** (PG-upgradable) |
| Jobs (필요시) | SQLite jobs table + single worker process |
| Form/Data | Server Actions + useActionState + **Zod 4** |
| Package Manager | **pnpm** |
| Lint/Format | **Biome** |
| Testing | **Playwright** (smoke) + optional **Vitest** |
| Runtime | self-hosted, single-host, single-region Node |

> **이어가기**: 이 stage의 artifact가 이미 일부 존재하면, 존재하는 artifact의 step은 건너뛰고 다음 step부터 이어간다. `workspace/app/`이 이미 존재하면 scaffold를 건너뛰고 verification 또는 review부터 이어간다.

## 실행 흐름

### Phase A: 탐색과 비평 (다른 stage와 동일한 패턴)

#### Step 1: Method Framing + Meta-Research

design-contract와 solution의 mvpScope를 읽고, **구현 방법을 먼저 탐색한다.**

`tacigent-method-first` 프로토콜을 따르되, build-specific fields:
- `implementationStrategy` — 구현 전략 (예: `TDD-first`, `scaffold-then-fill`, `core-logic-first`)
- `componentPlan` — 어떤 컴포넌트/모듈로 나눌 것인가
- `verificationOrder` — 검증 순서
- `riskAreas` — 구현 중 가장 위험한 부분

→ `artifacts/build-method-plan.json`

#### Step 2: 7-Branch Exploration

`tacigent-swarm-critique` 프로토콜을 따른다. **기본 7 branch 필수.**

7개 관점에서 구현 접근법의 다양한 대안을 탐색한다:
- 컴포넌트 구조 대안
- 상태 관리 방식 대안
- UI 레이아웃 구현 방식 대안
- 테스트 전략 대안
- 핵심 로직 구현 방식 대안

→ `artifacts/build-exploration.md`

#### Step 3-7: 5회 Critique

**Build-specific critic roles:**
1. **First-Principles Pruner** — 불필요한 구현 복잡도 제거
2. **Root-Cause Critic** — 진짜 원인을 고치는가, 증상만 고치는가?
3. **Verification Critic** — 검증이 충분한가? missing test case?
4. **Execution Critic** — 구현 방식이 v1 baseline에 맞는가?
5. **Counterevidence Critic** — "더 간단한 방법이 있는가?"

**5회 critique 모두 mandatory다.** downshift 금지.

→ `artifacts/build-critique-1.md` ~ `artifacts/build-critique-5.md`

### Phase B: 구현

### Step 8: Local App Services Plan

auth, persistence, async job이 **실제로 필요한지** 먼저 분류한다.
local auth, local DB, local queue는 default capability이지 **mandatory capability가 아니다**.
이후 단계는 필요한 capability에 대해서만 scaffold와 verification을 수행한다.

### Step 9: Local Auth Scaffold (필요시)

- v1 기본 인증은 **local credential auth** (external OAuth 아님)
- password hashing, session handling, seeded test user path
- solution이 external OAuth를 언급해도 v1에서는 local auth baseline으로 normalize

### Step 10: Local DB Prepare (필요시)

- v1 기본 DB는 **local SQLite**
- migration, seed, local connection wiring
- schema는 **PG-upgradable 원칙** 준수
- SQLite 전용 기능 의존, loose typing, migration 없는 ad-hoc schema 변경 금지

### Step 11: Local Job Setup (필요시)

- **SQLite jobs table + WAL + single worker process** 기반
- 외부 Redis/SQS는 기본 범위 제외
- PG 전환 시 `SKIP LOCKED` claim path로 승격 가능하도록 작성

### Step 12: Build-Start External Service Gate

로컬로 대체 불가능한 external capability만 따로 계산:

- `artifacts/external-service-requirements.json`에 기록
- **blocking=true**면 hard_block → 이 gate에서**만** 사용자에게 묻는다
- **blocking=false**면 degraded mode로 계속 진행, missing setup은 `needs_validation`
- 이 gate는 v1 Ralph loop에서 **build execution 직전의 마지막 human checkpoint**
- baseline으로 진입한 뒤에는 default path가 다시 human block으로 돌아가지 않는다

### Step 13: Baseline

gate가 닫힌 뒤 hydrated workspace의 **첫 verification snapshot이자 repair anchor capture**.
이후 repair의 비교 기준이 된다.

### Step 14: Classify

에러/문제를 분류:
- syntax/type 문제
- lint 문제
- build 문제
- smoke 문제

### Step 15: Localize

failing check를 **좁힌다**. 전체를 반복하지 않는다.

### Step 16: Repair Strategy Selection (Method-First)

<MANDATORY>
localize 뒤에는 **바로 edit하지 않고**, repair strategy를 먼저 고른다:

- `selectedRepairMethod` — 예: `minimal patch`, `root-cause refactor`, `verification-first isolate`, `branch compare`
- `verificationOrder` — 검증 순서
- `patchScope` — 수정 범위
- `stopCondition`

parallel repair branch는 여러 파일을 동시에 건드리는 뜻이 아니라, **가설, 검증 순서, patch scope가 다른 method branch**라는 뜻이다.
</MANDATORY>

### Step 17: Edit

선택된 repair strategy에 따라 수정.

**Patch Strategy:**
- patch는 **diff-based**로 적용
- accepted patch는 항상 요약 또는 diff artifact를 남긴다
- stale patch는 blind overwrite하지 않고 재계산

### Step 18-20: Verify (3단계)

**verify-fast** — 빠른 진단용 (syntax/type)
**verify-targeted** — 좁혀진 failing path만
**verify-global** — required verification baseline 전체

### Step 21: Reproducibility

fresh rebuild로 재현성 확인. 남기지 못하면 이유 기록.

### Step 22: Decide

readiness 판정.

### Step 23: Canonicalize

### Phase C: 리뷰

**초기 구현이 verification baseline을 통과한 후, 반드시 5회의 리뷰-개선 사이클을 수행한다.**

각 cycle은 제1원칙을 적용한다: "이것이 정말 필요한가? 더 단순하게 할 수 없는가? 삭제할 수 있는 것은?"
각 cycle의 결과를 `artifacts/build-review-N.md`에 기록한다.

#### Review Cycle 1: 코드 품질 리뷰

초기 구현이 통과한 뒤 아래를 수행한다:
1. **모든 구현 파일을 다시 읽는다** — 자신이 쓴 코드를 처음 보는 것처럼 리뷰
2. 아래 관점에서 문제를 찾는다:
   - 800줄 이상의 거대 컴포넌트 → 분리
   - 하드코딩된 값 → 상수/설정으로 추출
   - 반복 코드 → 공통 유틸로 추출
   - 불명확한 변수명/함수명 → 개선
   - 누락된 에러 처리 → 추가
   - 누락된 TypeScript 타입 → 추가
3. 발견한 문제를 수정하고 verification baseline을 다시 통과시킨다

#### Review Cycle 2: UI/UX 리뷰

코드 품질 리뷰가 끝난 뒤:
1. **브라우저에서 실제 제품을 띄워 직접 확인한다** (dev server 또는 production build)
2. 아래 관점에서 개선한다:
   - 레이아웃 정렬, 여백, 타이포그래피 — 디자인 contract과 대조
   - 인터랙션 — hover, focus, transition이 자연스러운지
   - 접근성 — 키보드 네비게이션, aria 속성, 색 대비
   - 로딩/에러 상태 — 모든 비동기 작업에 적절한 피드백이 있는지
   - desktop-first (반응형은 v1 scope 밖)
3. 개선 사항을 적용하고 verification baseline을 다시 통과시킨다

#### Review Cycle 3: 통합 리뷰

UI/UX 리뷰가 끝난 뒤:
1. **solution.md의 fullFeatureSet을 다시 읽고**, 모든 기능이 구현되었는지 체크리스트로 확인
2. **problem.md를 다시 읽고**, 구현이 원래 문제를 직접 풀고 있는지 확인
3. **design-contract.json의 fullFeatureSetCoverage를 대조**하여 빠진 항목 확인
4. 빠진 기능이나 어긋난 부분이 있으면 **구현 추가**
5. verification baseline 재통과 확인

#### Review Cycle 4: 제1원칙 코드 삭감

통합 리뷰가 끝난 뒤:
1. **모든 코드를 다시 읽으며 "이 코드가 정말 필요한가?"를 묻는다**
2. 아래를 적용한다:
   - 사용되지 않는 import, 변수, 함수 → 삭제
   - 과도한 추상화 → 단순화
   - "나중에 쓸 수도 있는" 코드 → 삭제
   - 불필요한 wrapper, 중간 레이어 → 제거
3. 삭제한 것과 이유를 기록하고 verification baseline 재통과

#### Review Cycle 5: 최종 점검

모든 리뷰가 끝난 뒤:
1. **production build + smoke test 최종 통과 확인**
2. **design-contract.json의 모든 항목을 체크리스트로 대조** — 빠진 것 있으면 기록
3. **코드 디렉토리 구조가 깔끔한지 확인** — 불필요한 파일, 빈 파일, 테스트용 흔적 정리
4. build.md에 최종 상태 기록

5회의 Review Cycle을 모두 완료하지 않으면 build stage는 **미완성**이다.

## Repair Policy

| Failure Class | 전략 |
|---------------|------|
| syntax/type | 가장 빠른 local check로 즉시 복구 |
| lint | lint scope 안에서만 수정 |
| build | build-breaking root cause 우선 복구 |
| smoke | failing user-visible path만 targeted repair |

모든 repair는 `repairAttempts[]`에 **class, hypothesis, action, verification result**를 남긴다.

## Retry Budget

- 같은 failure class에 대해 **무한 반복하지 않는다**
- retry budget은 failure class별로 관리
- retry 횟수와 실패 요약은 canonical output에 남긴다
- 특정 class가 반복되면 **parallel repair branch로 escalate**

## Parallel Repair Branch Rule

- parallel repair branch는 **isolated scratch workspace** 사용
- main orchestrator만 canonical workspace를 갱신
- branch는 **repair evidence와 why-it-wins 요약**을 제출해야 한다

## Required Verification Baseline

<MANDATORY>
기본 verification: `typecheck + lint + build + smoke test`

**Capability-aware smoke:**
- auth 있으면 → seeded test user login + post-login path
- persistence 있으면 → migration + seed + CRUD sanity check
- queue/job 있으면 → enqueue/dequeue check
- Playwright smoke는 **production build 기준** (`next build + next start`) 실행

execution budget이 빠듯해도 **build required baseline floor는 유지**, optional polish만 줄인다.
hard deadline이 floor보다 우선할 경우 → best-so-far artifact + `not_ready`로 닫는다.
</MANDATORY>

## Stop Condition

아래를 **모두 만족**할 때 canonicalization 가능:

- selected repair method와 verification order가 기록되었고
- required build-start external service gate가 닫혔고
- required verification이 통과했고
- reproducibility record가 남았거나 이유가 기록되었고
- **Phase C의 Build Review Cycles 5회를 모두 완료했고**
- unresolved issues가 명시적으로 남았고 더 이상의 자동 복구 가치가 낮을 때

## Readiness

`tacigent-readiness-gates` 프로토콜을 따른다.

- `ready`: local auth/DB/queue baseline + v1 verification baseline 통과, runnable workspace, unresolved blocking issue 없음
- `needs_validation`: verification 통과했으나 optional remote API/reproducibility 등 non-blocking debt 남음
- `not_ready`: required verification 실패/미완료, workspace not runnable, unresolved blocking issue 남음

## 산출물

1. **`workspace/app/`** — 실제 동작하는 web application 소스코드
2. **`artifacts/build.md`** — build 리포트 (verification results, changed files, setup/run instructions, unresolved issues)
3. **`artifacts/verification-report.md`** — verification 결과 상세
4. **`artifacts/build-method-plan.json`** — method plan
5. **`artifacts/external-service-requirements.json`** (optional)

## Failure Modes

- ❌ 한 번에 너무 큰 rewrite를 시도하는 경우
- ❌ repair method를 고르지 않고 곧바로 edit loop로 들어가는 경우
- ❌ local auth/DB/queue baseline 없이 external integration부터 붙이는 경우
- ❌ external service requirement 계산 없이 baseline으로 바로 들어가는 경우
- ❌ failing check를 좁히지 않고 전체 루프를 반복하는 경우
- ❌ verification artifact 없이 "성공"으로 간주하는 경우
- ❌ baseline 상태를 모른 채 repair를 시작하는 경우

## 완료 후

<NEXT-STAGE>
위 산출물을 모두 기록한 뒤, 반드시 `tacigent-stage-marketing` 스킬을 읽고 실행한다.
멈추거나 사용자에게 되묻지 않는다. 바로 다음 stage로 진행한다.
</NEXT-STAGE>
