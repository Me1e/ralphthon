# Interpretation Ledger

## Preserved
- 사용자에게 고정된 제품 아이디어는 없다.
- 에이전트가 지금 인터넷에서 가장 뜨거운 문제를 직접 찾는다.
- 실행 모드는 `tight`다.
- 모든 stage에서 아래 심사 관점을 반영한다:
  - Bass Ventures 이태양 대표: 시장성, 투자 가치, 스케일 가능성
  - Sendbird Korea 이상희 대표: B2B SaaS/플랫폼 깊이, 기술 아키텍처, PMF
  - 한기용: 기술 완성도, 코드 품질, 시스템 설계
  - ZEP 이재규 Tech Lead: 실제 구현 수준, 기술 선택의 합리성, 데모 품질
- 평가 기준은 `실용성 / 창의성 / 완성도 / 임팩트`다.
- 7개 stage는 끊기지 않고 끝까지 실행한다.

## Normalized
- 제품 범위는 `greenfield web product`로 정규화했다.
  - 이유: AGENTS.md의 v1 고정 스택과 Ralph loop의 범위가 웹 제품 기준이다.
- 기술 스택은 v1 baseline으로 고정했다.
  - Next.js 16.x App Router
  - React 19
  - Tailwind CSS 4
  - shadcn/ui
  - Better Auth 1.x with local credential auth
  - Drizzle ORM + better-sqlite3
  - Playwright smoke testing
- build 성공 기준은 `minimum 3 routes + 핵심 flow end-to-end demo`로 정규화했다.
- pitch 산출물은 `VC용 pre-read + Tech Lead가 볼 HTML deck`으로 정규화했다.

## Assumed
- target market은 우선 글로벌 B2B web SaaS를 기본값으로 둔다.
  - 근거: 심사위원 구성과 평가 기준이 B2B SaaS, 플랫폼 깊이, 기술 완성도, 스케일 가능성에 강하게 치우쳐 있다.
- 문제 선택 시 `hot signal`과 `autonomous buildability`를 함께 최적화한다.
  - 근거: 사용자는 "지금 가장 뜨거운 문제"를 원하지만, 동시에 실제 동작하는 웹 제품과 5분 데모를 요구했다.
- marketing/pitch는 build 이후 evidence-aligned narrative로 수렴한다.
  - 근거: VC용 why-now와 Tech Lead용 demo proof를 모두 만족하려면 build 결과와 정렬되어야 한다.

## Deferred
- concrete problem wedge 선택
  - 이유: problem stage가 canonical owner이며 live internet research가 필요하다.
- concrete solution direction 선택
  - 이유: problem selection 이후 차별화 논리와 buildability를 기준으로 판단해야 한다.
- design language, brand, public-facing title
  - 이유: design stage에서 핵심 flow가 정해진 뒤 결정하는 편이 anchor drift를 줄인다.
- GTM segment prioritization
  - 이유: marketing stage에서 선택된 wedge와 demo scope를 보고 더 정밀하게 결정해야 한다.

## Rejected
- 사용자에게 추가 질문해서 theme를 좁히는 경로
  - 이유: 사용자는 에이전트 자율 선택을 요청했고, Ralph loop 이후 질문은 금지다.
- 모바일 앱 또는 브라우저 확장 중심 제품
  - 이유: v1 범위 밖이며 build/demo risk가 높다.
- one-screen demo app
  - 이유: AGENTS.md에서 금지한다.

## Ambiguity Register
- `problem idea`: `underspecified`
  - 처리: `defer`
  - 이유: 의도된 모호성이다. problem stage에서 리서치로 해소해야 한다.
- `target user`: `underspecified`
  - 처리: `assume`
  - 이유: B2B web SaaS default로 시작하되, problem stage에서 evidence가 더 강한 segment가 나오면 조정한다.
- `design direction`: `underspecified`
  - 처리: `defer`
  - 이유: flow와 evidence가 먼저다.
- `technical stack`: `clear`
  - 처리: `preserve + normalize`
  - 이유: project baseline이 이미 고정되어 있다.

## Deviation Ledger
- `no product idea provided`를 `problem stage live research`로 이동했다.
  - 이유: intake invariants상 아이디어를 임의 고정하면 안 된다.
- `가장 뜨거운 문제`를 단순 뉴스성 이슈가 아니라 `fresh hot signal + buildable web wedge`로 해석했다.
  - 이유: build, marketing, pitch까지 이어지는 company-style convergence가 필요하다.
