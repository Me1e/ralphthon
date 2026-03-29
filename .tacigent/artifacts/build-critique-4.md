# Build Critique Round 4

`일론머스크의 제 1원칙` 적용: data model은 feature보다 한 단계 아래 primitive로만 설계한다.

## Critic Notes

### 1. First-Principles Pruner
- data model에 미래 compliance entities를 더 넣을 필요 없다.

### 2. Root-Cause Critic
- current product promise를 구현하는 데 필요한 primitive는 6-7개면 충분하다.

### 3. Verification Critic
- schema가 작을수록 seed/reset/smoke가 단순해진다.

### 4. Execution Critic
- `AISystem`, `EvidenceItem`, `Questionnaire`, `Question`, `AnswerDraft`, `GapTask`, `BuyerPacket` 정도로 충분하다.

### 5. Counterevidence Critic
- Control, Assessment, Policy, Vendor 등은 heavy governance drift를 만든다.

## Revision 4
- schema scope를 위 7 entities로 제한
- future governance tables는 전부 제거
