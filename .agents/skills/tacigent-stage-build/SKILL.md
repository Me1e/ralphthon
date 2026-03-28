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

## 실행 흐름 (17-Step Protocol)

### Step 1: Hydrate

design-contract와 solution의 mvpScope를 읽고 구현 계획을 세운다.

### Step 2: Local App Services Plan

auth, persistence, async job이 **실제로 필요한지** 먼저 분류한다.
local auth, local DB, local queue는 default capability이지 **mandatory capability가 아니다**.
이후 단계는 필요한 capability에 대해서만 scaffold와 verification을 수행한다.

### Step 3: Local Auth Scaffold (필요시)

- v1 기본 인증은 **local credential auth** (external OAuth 아님)
- password hashing, session handling, seeded test user path
- solution이 external OAuth를 언급해도 v1에서는 local auth baseline으로 normalize

### Step 4: Local DB Prepare (필요시)

- v1 기본 DB는 **local SQLite**
- migration, seed, local connection wiring
- schema는 **PG-upgradable 원칙** 준수
- SQLite 전용 기능 의존, loose typing, migration 없는 ad-hoc schema 변경 금지

### Step 5: Local Job Setup (필요시)

- **SQLite jobs table + WAL + single worker process** 기반
- 외부 Redis/SQS는 기본 범위 제외
- PG 전환 시 `SKIP LOCKED` claim path로 승격 가능하도록 작성

### Step 6: Build-Start External Service Gate

로컬로 대체 불가능한 external capability만 따로 계산:

- `artifacts/external-service-requirements.json`에 기록
- **blocking=true**면 hard_block → 이 gate에서**만** 사용자에게 묻는다
- **blocking=false**면 degraded mode로 계속 진행, missing setup은 `needs_validation`
- 이 gate는 v1 Ralph loop에서 **build execution 직전의 마지막 human checkpoint**
- baseline으로 진입한 뒤에는 default path가 다시 human block으로 돌아가지 않는다

### Step 7: Baseline

gate가 닫힌 뒤 hydrated workspace의 **첫 verification snapshot이자 repair anchor capture**.
이후 repair의 비교 기준이 된다.

### Step 8: Classify

에러/문제를 분류:
- syntax/type 문제
- lint 문제
- build 문제
- smoke 문제

### Step 9: Localize

failing check를 **좁힌다**. 전체를 반복하지 않는다.

### Step 10: Repair Strategy Selection (Method-First)

<MANDATORY>
localize 뒤에는 **바로 edit하지 않고**, repair strategy를 먼저 고른다:

- `selectedRepairMethod` — 예: `minimal patch`, `root-cause refactor`, `verification-first isolate`, `branch compare`
- `verificationOrder` — 검증 순서
- `patchScope` — 수정 범위
- `stopCondition`

parallel repair branch는 여러 파일을 동시에 건드리는 뜻이 아니라, **가설, 검증 순서, patch scope가 다른 method branch**라는 뜻이다.
</MANDATORY>

### Step 11: Edit

선택된 repair strategy에 따라 수정.

**Patch Strategy:**
- patch는 **diff-based**로 적용
- accepted patch는 항상 요약 또는 diff artifact를 남긴다
- stale patch는 blind overwrite하지 않고 재계산

### Step 12-14: Verify (3단계)

**verify-fast** — 빠른 진단용 (syntax/type)
**verify-targeted** — 좁혀진 failing path만
**verify-global** — required verification baseline 전체

### Step 15: Reproducibility

fresh rebuild로 재현성 확인. 남기지 못하면 이유 기록.

### Step 16: Decide

readiness 판정.

### Step 17: Canonicalize

## Swarm Default (Build-Specific)

- non-trivial implementation method, architecture change, external-service integration의 기본 exploration swarm: **5**
- failure class가 좁고 reversibility가 높으며 single-root-cause repair가 명확하면 **3 또는 single-path**로 downshift

**Build-specific critic roles:**
1. **First-Principles Pruner** — 불필요한 구현 복잡도 제거
2. **Root-Cause Critic** — 진짜 원인을 고치는가, 증상만 고치는가?
3. **Verification Critic** — 검증이 충분한가? missing test case?
4. **Execution Critic** — 구현 방식이 v1 baseline에 맞는가?
5. **Counterevidence Critic** — "더 간단한 방법이 있는가?"

**architecture change, broad refactor, external-service integration, final build result review**에는 second critique round 기본 mandatory.
tiny repair loop는 `why-no-second-round` 남기면 one-critique 허용.

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
- unresolved issues가 명시적으로 남았고 더 이상의 자동 복구 가치가 낮을 때

## Readiness

`tacigent-readiness-gates` 프로토콜을 따른다.

- `ready`: local auth/DB/queue baseline + v1 verification baseline 통과, runnable workspace, unresolved blocking issue 없음
- `needs_validation`: verification 통과했으나 optional remote API/reproducibility 등 non-blocking debt 남음
- `not_ready`: required verification 실패/미완료, workspace not runnable, unresolved blocking issue 남음

## 산출물

1. **`workspace/app/`** — 실제 동작하는 web application 소스코드
2. **`artifacts/build-report.md`** — build 리포트 (verification results, changed files, setup/run instructions, unresolved issues)
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
