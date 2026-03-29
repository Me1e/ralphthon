# Design Review Round 4

## 발견한 문제
- review room의 action hierarchy가 screen spec에 암묵적으로만 존재했다.

## 수정 사항
- review room spec에 `center canvas actions first, publish action last`를 추가했다.

## 이번 round에서 삭제한 것
- 없음

## 남은 문제 (다음 round로)
- style constraints가 readability와 trust context를 더 직접 묶어줄 수 있다.
