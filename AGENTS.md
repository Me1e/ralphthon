# Tacigent Agent Rules

이 프로젝트는 **Tacigent** — AI 에이전트가 짧은 제품 아이디어에서 출발해 문제 정의 → 솔루션 → 디자인 → 구현 → 마케팅 → 피치까지 자율 실행하는 startup-building system이다.

**기본 실행 모드는 `tight` (~7시간)다.** 사용자가 명시하지 않으면 `tight`로 실행한다.

## 핵심 행동 규칙

### 1. Method-First Execution
- task를 받으면 **바로 산출물을 만들지 않는다**
- 먼저 "이 task를 가장 잘 풀 수 있는 방법"을 정하고, 그 방법으로 실행한다
- 리서치를 할 때도, 리서치 방법 자체를 먼저 정한다
- method plan을 `artifacts/<stage>-method-plan.json`으로 기록한다

### 2. 제1원칙 사고 (First-Principles Thinking)
- 모든 비평/피드백에는 **"일론머스크의 제 1원칙"**을 적용한다
- convention이 아니라 **fundamentals와 necessity**로 설명 가능해야 한다
- `add`보다 `delete`, `compress`, `simplify`를 먼저 검토한다
- 관습, 업계 템플릿, "원래 이렇게 한다"는 이유만으로 남아 있는 구조를 의심한다

### 3. 멈추지 않는 체인
- Ralph loop가 시작되면 **intake → problem → solution → design → build → marketing → pitch** 7개 stage를 끊이지 않고 실행한다
- 중간에 멈추거나 사용자에게 되묻지 않는다 (intake 전에만 질문 허용)
- 유일한 정지 조건: `clean_exit` (pitch 완료) 또는 `hard_block` (external credential 부재)

### 4. 다양한 시각
- non-trivial 탐색은 **7개 관점** (홀수 branch)에서 순차적 role-play로 탐색한다
- 탐색 결과를 합성한 뒤 **역할별로 분화된 5명의 critic**이 비평한다
- 비평은 기본 **5회** 반복한다 (critique → revision × 5)
- 비평 후 산출물을 작성하고, **5회 제1원칙 산출물 리뷰**를 수행한다
- identical critic 5개를 돌리는 방식은 금지한다

### 5. Evidence 기반
- external claim은 source class에 따라 신뢰도가 다르다
- `agent synthesis`나 `pure inference`만으로 canonical claim을 정당화하지 않는다
- `ready` 판정에는 high-prior source 1개 + independent corroboration 1개 이상이 필요하다

## 스킬 시스템

이 프로젝트의 `.agents/skills/` 디렉토리에 13개의 Tacigent 스킬과 13개의 보강 스킬이 있다.

**Ralph loop 실행 시:** `tacigent-ralph-loop` 스킬을 읽고 그 지시를 따른다.

**스킬 참조 규칙:**
- stage 스킬이 "X 프로토콜을 따르라"고 하면 해당 프로토콜 스킬을 읽는다
- 보강 스킬(아래)은 해당 stage에서 **구체적 구현/작성 시점에만** 읽는다. stage 시작 시 미리 읽지 않는다:
  - build 구현 시: `next-best-practices`, `vercel-react-best-practices`, `systematic-debugging`
  - design contract 작성 시: `frontend-design`, `ui-ux-pro-max`, `web-design-guidelines`
  - marketing copy/pitch copy 작성 시: `copywriting`, `marketing-psychology`, `humanizer`

**스킬 간 우선순위** (모순 시):
`AGENTS.md` > `stage 스킬` > `공통 프로토콜 스킬` > `보강 스킬`

## 기술 스택 (v1 Fixed)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.x App Router |
| UI | React 19 + Tailwind CSS 4 + shadcn/ui |
| Language | TypeScript |
| Auth | Better Auth 1.x (local credential) |
| DB | Drizzle ORM + better-sqlite3 (PG-upgradable) |
| Package Manager | pnpm |
| Testing | Playwright (smoke) |

## 산출물 구조

```
.tacigent/
  run-spec.json
  artifacts/       ← 모든 stage 산출물
  workspace/
    app/           ← 실제 web application
```

## Resume 규칙

컨텍스트가 압축되거나 세션이 끊긴 후 다시 시작하면:
1. `.tacigent/run-spec.json`이 존재하는지 확인한다. 없으면 새 실행이다.
2. `.tacigent/artifacts/` 디렉토리를 확인해서 마지막으로 완료된 stage를 파악한다
3. 완료된 stage의 다음 stage 스킬을 읽고 바로 이어서 실행한다
4. mid-stage 중단이면, 해당 stage 스킬을 읽되 이미 존재하는 artifact의 step은 건너뛴다
5. 사용자에게 묻지 않는다

**Stage 완료 판단 기준** (이 파일이 모두 존재해야 해당 stage 완료):
- intake: `intake.md`
- problem: `problem-review-5.md`
- solution: `solution-review-5.md`
- design: `design-review-5.md` + `design-contract.json`
- build: `build-review-5.md` + `verification-report.md`
- marketing: `marketing-review-5.md` + `launch-cells.json`
- pitch: `pitch/index.html` + `pitch/pre-read.md`

## 금지 사항

- ❌ **여러 산출물 파일을 한 턴(turn)에 동시에 생성하는 것 (하나 쓰고 멈춘 뒤 다음 턴에 다음 파일 작성 필수)**
- ❌ 여러 stage 산출물을 한꺼번에 만드는 것 (가장 흔한 실패)
- ❌ swarm/critique를 거치지 않고 산출물만 쓰는 것
- ❌ output review를 거치지 않고 산출물을 확정하는 것
- ❌ stage를 건너뛰는 것
- ❌ build 전에 verification 없이 "완료"라고 하는 것
- ❌ evidence 없이 market claim을 만드는 것
- ❌ method를 정하지 않고 바로 작업하는 것
- ❌ 피드백 라운드를 생략하고 첫 결과를 그대로 확정하는 것
- ❌ **1-screen 앱으로 수렴하는 것 (solution의 fullFeatureSet 전체를 구현해야 함)**
- ❌ **build에서 페이지 수를 축소하는 것 (최소 3개 route 필수)**
