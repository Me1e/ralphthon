# 추천안

**Proofline**을 유지하고 **6주 검증 스프린트**를 승인하는 것이 맞습니다. 요청사항은 명확합니다. 고객 대화 10건, 라이브 buyer-review teardown 3건, 제품 업그레이드 3가지를 진행합니다: questionnaire import, persistent domain data, collaboration notes. 지금 바로 넓게 출시하면 안 됩니다. 대신 한 가지 더 좁은 질문에 답해야 합니다. AI SaaS 팀이 첫 serious buyer review를 받았을 때, 흩어진 답변을 근거가 붙은 패킷으로 빠르게 바꿔 딜을 지키는 워크스페이스에 실제로 돈을 낼 것인가?

## 왜 지금 이 문제인가

**2026년 3월 29일** 기준으로, European Commission은 AI Act의 대부분 규정이 **2026년 8월 2일**에 적용된다고 안내하고 있습니다. 동시에 Council of the EU는 **2026년 3월 13일**에 이행 단순화 관련 입장을 채택했습니다. 이 조합이 곧바로 검증된 수요 통계는 아닙니다. 다만, 고정된 규제 일정과 아직 정리 중인 이행 기준이 함께 있으면 딜이 닫히기 전에 buyer question이 더 앞당겨질 가능성은 충분히 있습니다.

출처:

- European Commission, Regulatory framework on AI:
  https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- European Commission, Navigating the AI Act FAQ:
  https://digital-strategy.ec.europa.eu/en/faqs/navigating-ai-act
- Council of the EU, March 13, 2026 AI simplification position:
  https://www.consilium.europa.eu/en/press/press-releases/2026/03/13/council-agrees-position-to-streamline-rules-on-artificial-intelligence/

이건 규제만의 이야기가 아닙니다. 시장이 이미 무엇을 파는지도 중요합니다. Vanta, Drata, Conveyor는 모두 AI 관련 questionnaire 또는 trust response workflow를 판매하고 있습니다. 이 사실은 buyers와 vendors가 이미 이 영역에 시간을 쓰고 있다는 점을 뒷받침합니다. 다만 이들의 포지셔닝은 더 넓습니다. trust management, compliance, questionnaire automation 전반입니다. Proofline은 더 앞단의 더 좁은 순간을 노립니다. 작은 팀이 아직 제대로 된 answer process를 갖추기 전, 첫 serious AI buyer review를 처리하는 순간입니다.

출처:

- Vanta Questionnaire Automation:
  https://www.vanta.com/products/questionnaire-automation
- Drata Security Questionnaire Automation:
  https://drata.com/product/security-questionnaire-automation
- Conveyor Security Questionnaire Automation:
  https://www.conveyor.com/platform/security-questionnaire-automation-software

## 지금 만든 것

Proofline은 로컬 웹 제품입니다. 아래 흐름이 실제로 동작합니다.

- Better Auth 로컬 계정 로그인 + SQLite
- 심사 대기열
- 3단 컬럼 심사실
- 시스템/증빙 연결
- 공백 해결 작업 생성
- 바이어 패킷 발행

중요한 점은 기능이 다 갖춰졌다는 게 아닙니다. 그렇지 않습니다. 중요한 건 우리가 주장하는 흐름이 코드에서 실제로 재현된다는 점입니다.

1. 라이브 buyer review를 연다
2. 각 질문을 시스템과 증빙 기준으로 확인한다
3. 부족한 증빙을 명시적으로 드러낸다
4. 근거가 붙은 패킷을 발행한다

검증 근거:

- `pnpm run typecheck` 통과
- `pnpm run lint` 통과
- `pnpm run smoke` production mode 기준 통과

smoke 경로는 login, queue, review room, packet publish, buyer packet render를 포함합니다.

## 왜 접근이 다른가

한 문장 차별점은 이렇습니다.

> Proofline은 AI buyer review 답변이 근거 없이 발송되지 않도록 막는 워크스페이스다.

이게 중요한 이유는, 기존 대안 대부분이 아래 둘 중 하나를 최적화하기 때문입니다.

- 넓은 trust / compliance 운영
- 규모 있는 questionnaire automation

반면 Proofline은 **첫 심사 판단**에 집중합니다. 각 buyer question은 세 상태 중 하나로 강제됩니다.

- 근거 첨부
- 검토 필요
- 차단됨

이 구조 덕분에 데모가 훨씬 선명해지고, 도입 스토리도 명확해집니다. 그리고 다음으로 확장할 일도 자연스럽게 보입니다.

- questionnaires
- systems
- evidence
- packets
- 이후 import, collaboration, integrations

플랫폼 관점의 심사위원이 볼 포인트는 이 부분입니다. 아직 제품은 작지만, 확장 순서는 이미 보입니다.

## 왜 사업이 될 수 있나

진입점은 작습니다. 하지만 revenue에 가깝습니다. 이건 워크플로우가 어디에서 일어나는지에서 나오는 추론입니다. 내부 컴플라이언스 정리 업무가 아니라, 실제 영업 딜 한복판에서 벌어지는 일입니다.

세일즈 중간에 buyer questionnaire를 놓치면 비용은 단순한 문서 작업이 아닙니다. 더 느린 딜, 더 약한 신뢰, 혹은 둘 다일 가능성이 큽니다. 그래서 이 진입점은 일반적인 내부 컴플라이언스 툴보다 상업적으로 더 중요할 수 있습니다.

확장 경로도 자연스럽습니다.

1. 첫 심사 구조화
2. 반복 심사 운영
3. 시스템 단위 evidence graph
4. trust / GRC stack 연동
5. 반복 팀 워크플로우

이게 곧바로 벤처 스케일을 증명하는 것은 아닙니다. 다만 테스트할 가치가 있는 경로는 보여줍니다.

## 권장 GTM

넓게 출시하지 마세요. 광고로 수요를 만들려 하지 마세요. 성숙한 플랫폼인 척하지 마세요.

하나의 sales play부터 시작하는 게 맞습니다.

- 엔터프라이즈에 판매 중이지만 전담 GRC 인력이 없는 20-200명 AI SaaS 팀을 겨냥
- 최근 또는 진행 중인 buyer review 1건을 가져오게 함
- 제품 안에서 packet 또는 gap list를 직접 만들게 함

보조 채널:

- 반복 고객을 데려올 수 있는 fractional security / GRC consultant 1명을 확보

성공 기준은 좁게 잡아야 합니다.

- 고객 대화 10건
- 라이브 teardown 3건
- design partner 2곳
- 예산 담당자가 있는 pilot 1건 또는 consultant-sponsored usage 1건

## 예상 반론과 답변

### VC 관점 반론: incumbents가 이 기능을 흡수할 수 있다

맞는 우려입니다. Vanta, Drata, Conveyor가 고객 요구에 따라 더 앞단으로 들어올 수 있습니다.

대응:

- 지금 incumbents와 플랫폼 전체를 경쟁하려고 하면 안 됩니다
- 팀이 넓은 trust stack으로 들어가기 전에, first-response workspace가 실제로 채택되는지부터 봐야 합니다
- 이 workflow가 계속 incumbent 안으로 흡수된다면 방향을 접어야 합니다

### B2B SaaS 관점 반론: 이건 product가 아니라 feature일 수 있다

이것도 맞는 우려입니다. 이 workflow가 너무 드물거나, 결국 import만 원한다면 독립 제품으로 설 수 없습니다.

대응:

- 스프린트 동안 반복적인 live teardown 수요를 반드시 확인해야 합니다
- validation이 시작되면 첫 업그레이드는 questionnaire import로 가야 합니다
- consultant를 통한 반복 사용은 좋은 신호이지만, 최종 답은 아닙니다

### 엔지니어링 관점 반론: 데모는 되지만 제품은 아직 초기다

맞습니다. 현재 제품은 workflow proof를 보여줄 뿐, production maturity를 증명하지는 않습니다.

대응:

- 오늘 구현된 범위를 넘는 claim은 하지 않습니다
- 현재도 auth, multi-route flow, publish path, verification은 이미 갖춰져 있습니다
- 다음 스프린트에서 persistence, import, collaboration을 추가한 뒤 readiness를 다시 말해야 합니다

## Claim / Evidence 매핑

| Claim | Source | Status |
| --- | --- | --- |
| AI Act 대부분 규정은 2026년 8월 2일 적용 | European Commission AI Act pages | verified |
| 2026년 3월에도 이행 불확실성이 남아 있음 | Council of the EU, March 13, 2026 | verified |
| 8월 2일 일정이 buyer diligence를 앞당길 가능성이 큼 | official timeline + Council update + vendor activity 기반 추론 | inferred |
| 이 카테고리는 상업적으로 이미 움직이고 있음 | Vanta, Drata, Conveyor product pages | supported |
| Proofline은 end-to-end demo가 실제로 동작함 | build.md + verification-report.md | verified |
| 이 first-review 진입점은 사업이 될 수 있음 | problem / solution / marketing / build 종합 추론 | inferred |

## 최종 추천

Proofline은 하나의 좁은 job에 대한 제품 테스트로 계속 가는 것이 맞습니다. 목표는 “첫 serious AI buyer review를 근거와 함께 답하게 돕는 것”입니다. 스프린트에서 반복 사용과 실제 pilot이 나오기 전까지는 scale-ready trust platform처럼 다루면 안 됩니다.

## 요청

아래 범위의 6주 검증 스프린트를 승인해주세요.

1. 엔터프라이즈에 판매 중인 AI SaaS 운영자/창업자 인터뷰 10건
2. 제품 안에서 실제 buyer-review teardown 3건
3. 제품 업그레이드 3가지
   - questionnaire import
   - persistent domain data
   - collaboration notes

중단 기준:

- 실제 심사를 제품 안으로 넣겠다는 팀이 2곳 미만
- 전용 review room 없이 incumbent questionnaire tool이면 충분하다는 반응이 반복됨
- proof workflow보다 import / ingestion이 훨씬 중요하다는 신호가 강함
