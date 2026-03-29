# Solution Critique Round 4

`일론머스크의 제 1원칙` 적용: runner-up과의 decisive difference를 명확히 남기지 못하면 선택은 아직 약하다.

## Critic Notes

### 1. First-Principles Pruner
- Candidate B와 Candidate E의 차이가 아직 `더 많은 기능`처럼 읽힐 위험이 있다.
- 차이는 기능 수가 아니라 problem decomposition이다.

### 2. Anchor-Drift Critic
- 사용자의 평가 기준상 `창의성`은 필요하지만 novelty for novelty's sake는 불필요하다.
- novelty는 `typed AI-system evidence graph`라는 mechanism 레벨에서만 주장해야 한다.

### 3. Feasibility Critic
- typed graph를 너무 추상적으로 만들지 말고, 실제 구현은 relational model로 풀어야 안전하다.
- `AISystem -> EvidenceItem -> QuestionMapping -> AnswerDraft -> GapTask -> BuyerPacket` 선형 모델이면 충분하다.

### 4. Differentiation Critic
- Candidate B: `past answers and docs to new form`
- Candidate E: `live question mapped to current AI system state and explicit missing-proof loop`
- 이 대비를 one-liner로 그대로 남겨야 한다.

### 5. Validation Critic
- selected candidate는 `질문 하나도 근거 없이 통과시키지 않는다`는 rule이 있으면 데모가 더 강해진다.
- unanswered question을 그냥 draft로 넘기지 말고 gap state로 드러내야 한다.

## Revision 4
- core rule을 `no uncited answer as complete`로 추가한다.
- data model을 relational-first로 명시한다.
- one-line differentiation을 runner-up 대비 문장으로 고정한다.
