# Build Critique Round 3

`일론머스크의 제 1원칙` 적용: test proof가 없으면 구현 가치는 없다. failing smoke를 canonical contract로 고정한다.

## Critic Notes

### 1. First-Principles Pruner
- wide unit-test mesh보다 one strong smoke path가 먼저다.

### 2. Root-Cause Critic
- 현재 가장 큰 리스크는 개별 함수 correctness보다 end-to-end wiring failure다.

### 3. Verification Critic
- login, review queue, review room, packet publish를 하나의 smoke로 묶는 것이 맞다.

### 4. Execution Critic
- Playwright를 production build 기준으로 돌려야 실제 judge demo risk를 줄일 수 있다.

### 5. Counterevidence Critic
- unit tests를 많이 써도 route wiring이 깨지면 의미 없다.

## Revision 3
- failing Playwright smoke를 첫 test로 고정
- verify-global에 production smoke 포함
