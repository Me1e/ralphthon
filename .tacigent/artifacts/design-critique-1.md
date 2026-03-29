# Design Critique Round 1

`일론머스크의 제 1원칙` 적용: review workflow에 직접 필요하지 않은 nav와 summary strip부터 제거한다.

## Critic Notes

### 1. First-Principles Pruner
- `Workspace` secondary nav는 현재 v1 job과 직접 연결되지 않는다.
- review queue 오른쪽 summary strip도 과하면 dashboard smell이 난다.

### 2. Task-Clarity Critic
- Review Queue의 핵심은 `어떤 review를 먼저 열 것인가`다.
- summary strip보다 row 상태와 CTA가 더 중요하다.

### 3. Buildability Critic
- nav가 단순할수록 shell과 active-state 처리가 쉬워진다.

### 4. Accessibility Critic
- nav item 수가 적을수록 keyboard path가 짧고 명확하다.

### 5. Distinctiveness Critic
- generic dashboard의 시작점은 대부분 `overview` 또는 `workspace` 허브다.
- 이를 제거하는 것이 distinctiveness에 유리하다.

## Revision 1
- `Workspace` secondary nav 제거
- Review Queue의 오른쪽 summary strip은 축소하고, 핵심 정보는 row 내부 상태 메타데이터로 이동
