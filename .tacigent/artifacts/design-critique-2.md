# Design Critique Round 2

`일론머스크의 제 1원칙` 적용: primary action이 흐려지면 screen은 실패다.

## Critic Notes

### 1. First-Principles Pruner
- Review Room 오른쪽 rail이 너무 많은 일을 하려 하면 center canvas가 약해진다.

### 2. Task-Clarity Critic
- Review Room의 primary action은 `Publish Packet`이지만, 실제 immediate action은 `Resolve This Question`에 더 가깝다.
- 이를 button hierarchy와 section ordering에 반영해야 한다.

### 3. Buildability Critic
- 질문 선택, 답변 편집, citation 확인, gap task 생성은 한 화면에서 충분히 구현 가능하다.

### 4. Accessibility Critic
- left question rail은 current item, blocked item, cited item이 모두 아이콘+텍스트로 표현되어야 한다.

### 5. Distinctiveness Critic
- center canvas를 문서처럼 보이게 하고, side rail을 ledger처럼 보이게 하는 대비가 distinctiveness의 핵심이다.

## Revision 2
- Review Room에서 immediate action hierarchy를 `Save Answer / Create Gap Task` 우선, `Publish Packet`은 top-right terminal action으로 정리
- left rail 상태 표현은 color-only 금지
