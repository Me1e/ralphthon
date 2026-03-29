# Design Review Round 1

## 발견한 문제
- interaction state completeness가 human-readable doc에 명시적으로 드러나지 않았다.
- ready-for-dev gate의 테스트 기준이 문서 말미에 더 직접적으로 보일 필요가 있었다.

## 수정 사항
- hover, focus-visible, pressed, disabled를 required interaction states로 추가했다.
- 10-second test, blur test, logo-swap test를 validation checks로 추가했다.

## 이번 round에서 삭제한 것
- 없음

## 남은 문제 (다음 round로)
- seeded demo 흐름이 empty state copy에 더 직접적으로 반영되면 build가 쉬워진다.
