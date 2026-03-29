# Solution Review Round 4

## 발견한 문제
- `packet`이 내부 export인지 buyer-facing end state인지 모호했다.

## 수정 사항
- key workflow 마지막 단계에 `buyer-facing packet view`를 명시했다.
- full feature set에서도 같은 표현으로 통일했다.

## 이번 round에서 삭제한 것
- 내부 결과물처럼 읽히는 모호성.

## 남은 문제 (다음 round로)
- build constraints가 review-room-first 원칙을 더 분명히 고정하면 좋다.
