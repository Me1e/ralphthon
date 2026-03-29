# Design Critique Round 4

`일론머스크의 제 1원칙` 적용: build-safe distinctiveness만 남기고, component sprawl을 줄인다.

## Critic Notes

### 1. First-Principles Pruner
- custom components를 너무 많이 만들 필요는 없다.
- shadcn primitives 위에 token/theming/layout grammar를 얹는 정도면 충분하다.

### 2. Task-Clarity Critic
- Systems와 Evidence 화면은 서로 유사하지만 하나로 합치면 job clarity가 떨어진다.
- separate screens를 유지하되 component family를 공유해야 한다.

### 3. Buildability Critic
- reusable families:
  - shell/nav
  - dense list rows
  - status chips
  - editor drawers/panels
  - packet section blocks
- custom-only components는 최소화해야 한다.

### 4. Accessibility Critic
- status chip, row action menu, drawer trigger는 모두 focus-visible과 keyboard path를 명확히 가져야 한다.

### 5. Distinctiveness Critic
- library fingerprint를 깨는 가장 저렴한 방법은 token 변경과 typography hierarchy다.

## Revision 4
- allowed new component scope를 `2-3 custom wrappers max`로 제한
- reusable component families를 contract에 명시하기로 결정
