# Design Critique Round 5

`일론머스크의 제 1원칙` 적용: happy path만 예쁘면 실패다. blocked, empty, error state까지 screen job이 유지되어야 한다.

## Critic Notes

### 1. First-Principles Pruner
- state completeness가 누락되면 build stage에서 추측이 발생한다.

### 2. Task-Clarity Critic
- Review Queue empty state는 `New Review` 또는 seeded import로 이어져야 한다.
- Review Room blocked state는 `Create System` 또는 `Add Evidence`로 즉시 연결되어야 한다.

### 3. Buildability Critic
- loading, empty, error, blocked state를 명시하면 component branching이 단순해진다.

### 4. Accessibility Critic
- empty/error messaging은 heading + body + action 조합으로 일관되게 설계해야 한다.

### 5. Distinctiveness Critic
- blocked state를 generic alert box로 만들지 말고, product 언어인 `Missing proof`와 `Owner needed`를 써야 한다.

## Revision 5
- state specs에 happy/loading/empty/error/blocked를 모두 넣기로 고정
- empty/error copy도 product-specific language로 설계하기로 확정
