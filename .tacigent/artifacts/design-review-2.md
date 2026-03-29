# Design Review Round 2

## 발견한 문제
- review queue empty state가 build implementation 기준으로는 아직 약간 추상적이었다.
- machine-readable contract에도 interaction state completeness가 직접 나타나야 했다.

## 수정 사항
- review queue empty state를 `Seed Demo Review action`으로 구체화했다.
- contract에 `interactionStates`를 추가해 hover/focus-visible/pressed/disabled를 build input으로 고정했다.

## 이번 round에서 삭제한 것
- `create or seed a review`의 모호성.

## 남은 문제 (다음 round로)
- packet surface가 buyer-facing proof page라는 점을 contract에서 한 번 더 강조할 수 있다.
