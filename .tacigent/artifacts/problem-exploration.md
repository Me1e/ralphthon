# Problem Exploration

Date anchor: `2026-03-29`
Retrieved at: `2026-03-29`

## Branch 1. Hot-Signal Scout

### Candidate A. AI buyer-readiness scramble for SaaS teams shipping AI
- Fresh signal is strong across March 2026 founder and builder communities.
- Enterprise buyers are already asking AI-specific compliance and security questions before many small vendors have an answer packet.
- Regulatory timing is active, not hypothetical. The European Commission states the AI Act became effective in stages and is generally fully applicable on `2026-08-02`, while some obligations already apply earlier.

### Candidate B. Agent governance gap between demo and production
- Fresh signal is strong in developer communities.
- Teams can build agents quickly, but security/compliance blocks production because there is no audit trail, approval flow, or replayability.
- LangChain/LangSmith messaging shows the market is moving from build tooling to production observability and auditability.

### Candidate C. Tariff-driven cross-border margin shock
- Broad web heat is real and consumer-facing.
- Tariff policy updates and duty changes are still fluid, and cross-border ecommerce teams are dealing with refused deliveries, unclear landed cost, and margin compression.
- Flexport and Shopify both expose active demand for tariff/duty calculation and checkout disclosure.

## Branch 2. Direct Pain Language Scout

### Candidate A
- A founder on `r/Entrepreneurs` described receiving an EU customer questionnaire covering data handling, AI-generated content labeling, risk category, and human oversight, then realizing the team could not answer most of it.
- A `r/SaaS` discussion says some founders already lost enterprise deals because they could not answer AI compliance questions from buyers.
- Another `r/SaaS` post frames the same failure moment from the security side: enterprise buyers ask for AI security posture, but startups lack AI-specific answers.
- An enterprise AI support vendor reported that most questionnaires are still generic SaaS questionnaires awkwardly repurposed for AI, leaving significant gaps.

### Candidate B
- `r/AI_Agents` posts repeatedly describe the exact same failure moment: agent demos work, but production stops because there is no audit trail, no approval gate, and no explanation for why the agent acted.
- A regulated-firm compliance post asks who is accountable when an agent updates records or initiates approvals across systems.

### Candidate C
- A small business owner described a U.S. customer refusing delivery after a courier demanded an extra tariff bill on arrival.
- Ecommerce and logistics communities continue to discuss duty workarounds, 3PL shifts, and tariff volatility.

## Branch 3. Official Reality Scout

### Candidate A
- The European Commission says the AI Act entered into force on `2024-08-01` and is generally fully applicable on `2026-08-02`, with AI literacy rules already active from `2025-02-02` and GPAI obligations active from `2025-08-02`.
- The same official policy stack makes transparency obligations applicable on `2026-08-02`.
- Counter-signal exists: on `2026-03-13`, the Council of the EU adopted a position to delay some high-risk rule application dates to `2027-12-02` and `2028-08-02`.
- Net effect: exact regulatory scope is still moving, but buyer diligence pressure is already happening now, which increases scramble risk rather than removing it.

### Candidate B
- Candidate B shares part of Candidate A's official pressure because audit trails, human oversight, and explainability are among the themes surfacing in AI governance discussions.
- The official layer is weaker and more indirect than Candidate A because the legal trigger is not as neatly tied to one repeated buyer workflow.

### Candidate C
- Official tariff policy remains active and complicated, but direct government pages are fragmented by program, country, and goods category.
- The operational reality is real, but the official rule surface is messy and product scope risks ballooning into a customs/tax engine.

## Branch 4. Adoption / Commercial Proxy Scout

### Candidate A
- Vanta markets `Questionnaire Automation` as speeding security reviews with AI-powered automation, and says its ISO 42001 offering helps unblock larger deals faster with enterprise buyers and investors.
- Drata positions AI questionnaire assistance and security assurance as ways to answer questionnaires faster and close deals sooner.
- OneTrust's March 2026 AI Governance material explicitly frames the market as moving from manual fire drills and spreadsheets toward automated intake, evidence analysis, and embedded governance.
- Commercial inference: buyers are asking enough trust questions that incumbent trust/GRC vendors are packaging automation around them.

### Candidate B
- LangSmith is now sold as an agent engineering platform with observability, auditability, explainability, and approval workflows.
- The commercial motion is real, but the market is also visibly crowded by observability and control-plane narratives.

### Candidate C
- Flexport operates a tariff simulator updated for February 2026 changes, and Shopify supports duties/import-tax collection at checkout or via third-party apps.
- Commercial activity is real, but much of the value is already embedded in logistics, checkout, and broker ecosystems.

## Branch 5. Platform / Product-Depth Scout

### Candidate A
- Platform depth can come from a structured evidence graph:
  - AI feature inventory
  - risk classification
  - policy/evidence library
  - buyer questionnaire workspace
  - answer generation with citations
  - gap detection and remediation tasks
- This is deeper than a content generator because it becomes a system of record for AI trust responses.
- It can naturally expand into API/SDK territory later: evidence ingestion APIs, buyer-room links, and policy snapshots.

### Candidate B
- Product depth is excellent technically: identity, approval policies, immutable event trails, replay, and simulation.
- The risk is that v1 drifts into infrastructure rather than a crisp business wedge, making PMF harder to explain in five demo minutes.

### Candidate C
- Product depth is possible through HTS mapping and scenario engines, but the wedge can collapse into a calculator unless paired with fulfillment and broker integrations that are hard to prove in a repo-local demo.

## Branch 6. Counterevidence Scout

### Candidate A
- Counterevidence 1: incumbent GRC vendors already cover trust centers, questionnaire automation, and AI governance.
- Counterevidence 2: the Council's March 2026 position suggests parts of the AI Act may be delayed, so a pure "deadline compliance" wedge is fragile.
- Resolution: do not frame the problem as abstract AI Act compliance software. Frame it as `AI trust response ops` for small/Series A-B vendors who need buyer-ready answers now. Regulatory timing is a catalyst, not the sole value prop.

### Candidate B
- Counterevidence 1: observability and evaluation platforms already exist.
- Counterevidence 2: some teams can approximate the workflow with logging, manual review, and existing SIEM/IAM tools.
- Resolution: the wedge is real, but market entry is harder and the buyer can delay purchase until agents move beyond pilots.

### Candidate C
- Counterevidence 1: brokers, checkout platforms, and logistics vendors already provide parts of the solution.
- Counterevidence 2: tariff rules change quickly and could create ongoing maintenance burden disproportionate to the demo.
- Resolution: strong problem, weaker fit for the current judges and build constraints.

## Branch 7. Autonomous Buildability Selector

### Candidate A
- High buildability.
- A convincing 5-minute demo can be done with local data and no external credentials:
  - create/import AI features
  - classify risk and oversight gaps
  - upload existing evidence
  - answer a buyer questionnaire with citations
  - generate a buyer-ready packet and remediation tasks
- Strong alignment with judges:
  - VC: immediate revenue unlock and why-now catalyst
  - B2B SaaS/platform: reusable evidence/data layer
  - engineering leader: clean system design and provenance
  - Tech Lead: practical demo flow with visible end-to-end value

### Candidate B
- Medium buildability.
- Demo is feasible, but to feel real it wants live execution, policy engines, and deeper event simulations.
- Better as a future expansion or a downstream module inside Candidate A.

### Candidate C
- Medium buildability.
- A tariff simulator demo is easy, but a differentiated product that feels venture-scale without external data pipelines is harder.

## Synthesis

### Evidence-backed ranking
1. `Candidate A` — AI trust response ops for small/Series A-B SaaS vendors shipping AI
2. `Candidate B` — agent governance control plane for production approval and auditability
3. `Candidate C` — tariff transparency and landed-cost planning for cross-border ecommerce

### Why Candidate A leads
- It has the cleanest failure moment: the first buyer/procurement questionnaire or enterprise security review.
- It has the best why-now mix: fresh community pain + active regulatory catalyst + clear commercial proxy.
- It monetizes against a budget already tied to revenue: closing deals faster and preventing deal loss.
- It is narrow enough to demo crisply, but deep enough to justify a platform architecture.

### Early canonical wedge
- Segment: small and Series A-B B2B SaaS companies that recently shipped AI features
- JTBD: respond to enterprise buyer and compliance questions about AI quickly enough to pass reviews and keep deals moving
- Failure moment: a prospect or customer sends an AI-specific trust/compliance questionnaire and the team realizes their docs, logs, and answers do not exist or do not map cleanly
- Pain cluster: scattered evidence, no AI inventory, no risk classification, no answer library, no buyer-ready packet

## Source Register
- `official_primary`: European Commission AI Act policy page, accessed `2026-03-29`
- `official_primary`: Council of the EU AI streamlining position, published `2026-03-13`
- `community_social`: `r/Entrepreneurs` post on first EU customer AI Act questionnaire, published `2026-03`
- `community_social`: `r/SaaS` post on enterprise buyers asking AI Act compliance questions, published `2026-03`
- `community_social`: `r/SaaS` post on enterprise buyers asking AI security questions, published `2026-01`
- `community_social`: `r/AI_CustomerService` post on AI support automation vendor questionnaires, published `2026-02`
- `first_party`: Vanta ISO 42001 and Questionnaire Automation materials, accessed `2026-03-29`
- `first_party`: OneTrust AI Governance and Winter '26 release materials, published/accessed `2026-03`
- `first_party`: LangSmith product/blog materials, published `2026-02`
- `community_social`: `r/AI_Agents` and related posts on production governance pain, published `2026-02` to `2026-03`
- `first_party`: Flexport tariff simulator and Shopify duties materials, accessed `2026-03-29`
