# Tacigent Agent Rules

이 프로젝트는 **Tacigent** — AI 에이전트가 짧은 제품 아이디어에서 출발해 문제 정의 → 솔루션 → 디자인 → 구현 → 마케팅 → 피치까지 자율 실행하는 startup-building system이다.

**기본 실행 모드는 `tight` (~5시간)다.** 사용자가 명시하지 않으면 `tight`로 실행한다.

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
- non-trivial 탐색은 **홀수 branch** (tight 모드 기본 3개)에서 순차적 role-play로 탐색한다
- 탐색 결과를 합성한 뒤 **역할별로 분화된 5명의 critic**이 비평한다
- 비평은 기본 **2회** 반복한다 (critique → revision → critique → revision)
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
- build stage에서는 `next-best-practices`, `vercel-react-best-practices`, `systematic-debugging` 등을 참조한다
- design stage에서는 `frontend-design`, `ui-ux-pro-max`, `web-design-guidelines`를 참조한다
- marketing/pitch에서는 `copywriting`, `marketing-psychology`, `humanizer`를 참조한다

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
1. `.tacigent/artifacts/` 디렉토리를 확인해서 마지막으로 완료된 stage를 파악한다
2. 완료된 stage의 다음 stage 스킬을 읽고 바로 이어서 실행한다
3. 사용자에게 묻지 않는다

## 금지 사항

- ❌ **여러 stage 산출물을 한꺼번에 만드는 것 (가장 흔한 실패)**
- ❌ swarm/critique를 거치지 않고 산출물만 쓰는 것
- ❌ stage를 건너뛰는 것
- ❌ build 전에 verification 없이 "완료"라고 하는 것
- ❌ evidence 없이 market claim을 만드는 것
- ❌ method를 정하지 않고 바로 작업하는 것
- ❌ 피드백 라운드를 생략하고 첫 결과를 그대로 확정하는 것
