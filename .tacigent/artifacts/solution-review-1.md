# Solution Review Round 1

## 발견한 문제
- core mechanism 문장이 generic semantic matching처럼 읽힐 여지가 있었다.

## 수정 사항
- `AISystem` 매핑 앞에 `typed`를 추가했다 — differentiation의 핵심이 텍스트 자동완성이 아니라 typed entity mapping임을 분명히 했다.

## 이번 round에서 삭제한 것
- 없음

## 남은 문제 (다음 round로)
- CRUD surface가 더 명시적으로 보이면 build stage handoff가 좋아진다.
