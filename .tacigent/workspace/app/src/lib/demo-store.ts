export type QuestionStatus = "blocked" | "cited" | "needs-review";
export type ReviewStatus = "blocked" | "published" | "ready";

export type AISystem = {
  archived: boolean;
  description: string;
  evidenceCount: number;
  id: string;
  linkedReviews: number;
  name: string;
  owner: string;
};

export type EvidenceItem = {
  archived: boolean;
  id: string;
  linkedSystemIds: string[];
  source: string;
  strength: "high" | "medium";
  title: string;
  type: "doc" | "policy" | "spec";
};

export type GapTask = {
  id: string;
  owner: string;
  questionId: string;
  state: "open" | "resolved";
  title: string;
};

export type ReviewQuestion = {
  answer: string;
  citations: string[];
  id: string;
  prompt: string;
  status: QuestionStatus;
  systemId: string;
};

export type Questionnaire = {
  company: string;
  dueDate: string;
  id: string;
  owner: string;
  packetId: string | null;
  questions: ReviewQuestion[];
  status: ReviewStatus;
  title: string;
};

export type PacketQuestion = Pick<
  ReviewQuestion,
  "answer" | "citations" | "id" | "prompt"
>;

export type QuestionnaireMetrics = {
  blocked: number;
  cited: number;
  needsReview: number;
  publishReady: boolean;
};

export type BuyerPacket = {
  generatedAt: string;
  id: string;
  questions: PacketQuestion[];
  proofSummary: string;
  publishedForReviewId: string;
  reviewTitle: string;
  status: "published";
};

type DemoState = {
  evidence: EvidenceItem[];
  packets: BuyerPacket[];
  questionnaires: Questionnaire[];
  systems: AISystem[];
  tasks: GapTask[];
};

const seedState: DemoState = {
  systems: [
    {
      archived: false,
      description:
        "LLM이 고객 응답 초안을 만들고, 발송 전에는 반드시 사람이 승인하는 지원 시스템입니다.",
      evidenceCount: 2,
      id: "sys-support-copilot",
      linkedReviews: 2,
      name: "지원 코파일럿",
      owner: "박민아",
    },
    {
      archived: false,
      description:
        "정책 분류 모델로 들어오는 티켓을 라우팅하되, 사람이 언제든지 결과를 덮어쓸 수 있습니다.",
      evidenceCount: 2,
      id: "sys-policy-router",
      linkedReviews: 1,
      name: "정책 라우터",
      owner: "줄스 카터",
    },
  ],
  evidence: [
    {
      archived: false,
      id: "evidence-oversight",
      linkedSystemIds: ["sys-support-copilot"],
      source: "제품 요구사항 메모",
      strength: "high",
      title: "사람 검토 운영 가이드",
      type: "policy",
    },
    {
      archived: false,
      id: "evidence-logging",
      linkedSystemIds: ["sys-support-copilot"],
      source: "엔지니어링 명세",
      strength: "high",
      title: "감사 이벤트 로깅 명세",
      type: "spec",
    },
    {
      archived: false,
      id: "evidence-boundaries",
      linkedSystemIds: ["sys-policy-router"],
      source: "보안 검토 문서",
      strength: "medium",
      title: "모델 경계 및 에스컬레이션 메모",
      type: "doc",
    },
    {
      archived: false,
      id: "evidence-eval",
      linkedSystemIds: ["sys-policy-router"],
      source: "QA 검증 시트",
      strength: "medium",
      title: "평가 샘플 세트",
      type: "doc",
    },
  ],
  questionnaires: [
    {
      company: "Acme",
      dueDate: "2026-04-02",
      id: "review-acme",
      owner: "박민아",
      packetId: "packet-acme",
      questions: [
        {
          answer:
            "고객에게 나가는 모든 AI 초안은 발송 전에 반드시 사람이 승인합니다.",
          citations: ["evidence-oversight"],
          id: "q-acme-1",
          prompt:
            "AI가 생성한 고객 커뮤니케이션에 대해 어떤 사람 검토 체계가 있는지 설명해주세요.",
          status: "cited",
          systemId: "sys-support-copilot",
        },
        {
          answer:
            "모델이 관여한 각 작업에 대해 수행자, 시스템, 시각을 포함한 변경 불가능한 이벤트 로그를 보관합니다.",
          citations: ["evidence-logging"],
          id: "q-acme-2",
          prompt: "AI 관련 작업의 감사 추적은 어떻게 보관하나요?",
          status: "cited",
          systemId: "sys-support-copilot",
        },
        {
          answer:
            "고위험 라우팅 결정은 신뢰도가 에스컬레이션 임계값 아래로 떨어지면 수동 검토로 전환됩니다.",
          citations: ["evidence-boundaries"],
          id: "q-acme-3",
          prompt: "자동 정책 라우팅 오류를 막기 위한 안전장치는 무엇인가요?",
          status: "cited",
          systemId: "sys-policy-router",
        },
      ],
      status: "ready",
      title: "Acme 구매 심사",
    },
    {
      company: "Helix Bank",
      dueDate: "2026-04-06",
      id: "review-helix",
      owner: "줄스 카터",
      packetId: null,
      questions: [
        {
          answer: "",
          citations: [],
          id: "q-helix-1",
          prompt:
            "승인 없이 AI 출력이 규제 대상 답변을 발송할 수 없다는 근거를 제시해주세요.",
          status: "blocked",
          systemId: "sys-support-copilot",
        },
      ],
      status: "blocked",
      title: "Helix Bank 신뢰 심사",
    },
  ],
  tasks: [
    {
      id: "task-helix-owner",
      owner: "박민아",
      questionId: "q-helix-1",
      state: "open",
      title: "승인 관련 증빙 담당자 지정 필요",
    },
  ],
  packets: [
    {
      generatedAt: "2026-03-29T12:00:00.000Z",
      id: "packet-acme",
      questions: [
        {
          answer:
            "고객에게 나가는 모든 AI 초안은 발송 전에 반드시 사람이 승인합니다.",
          citations: ["evidence-oversight"],
          id: "q-acme-1",
          prompt:
            "AI가 생성한 고객 커뮤니케이션에 대해 어떤 사람 검토 체계가 있는지 설명해주세요.",
        },
        {
          answer:
            "모델이 관여한 각 작업에 대해 수행자, 시스템, 시각을 포함한 변경 불가능한 이벤트 로그를 보관합니다.",
          citations: ["evidence-logging"],
          id: "q-acme-2",
          prompt: "AI 관련 작업의 감사 추적은 어떻게 보관하나요?",
        },
        {
          answer:
            "고위험 라우팅 결정은 신뢰도가 에스컬레이션 임계값 아래로 떨어지면 수동 검토로 전환됩니다.",
          citations: ["evidence-boundaries"],
          id: "q-acme-3",
          prompt: "자동 정책 라우팅 오류를 막기 위한 안전장치는 무엇인가요?",
        },
      ],
      proofSummary: "근거 첨부 답변 3건, 차단된 질문 0건, 담당자 지정 완료.",
      publishedForReviewId: "review-acme",
      reviewTitle: "Acme 구매 심사",
      status: "published",
    },
  ],
};

const state = structuredClone(seedState) as DemoState;

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function deriveQuestionStatus(
  question: Pick<ReviewQuestion, "answer" | "citations">,
) {
  if (!question.answer.trim()) {
    return "blocked" as const;
  }

  if (question.citations.length === 0) {
    return "needs-review" as const;
  }

  return "cited" as const;
}

function buildPacketQuestions(review: Pick<Questionnaire, "questions">) {
  return review.questions.map(({ answer, citations, id, prompt }) => ({
    answer,
    citations: [...citations],
    id,
    prompt,
  }));
}

function buildProofSummary(review: Pick<Questionnaire, "questions">) {
  const metrics = getQuestionnaireMetrics(review);
  return `근거 첨부 답변 ${metrics.cited}건, 차단된 질문 ${metrics.blocked}건, 담당자 지정 완료.`;
}

function syncQuestionnaireStatus(review: Questionnaire) {
  const metrics = getQuestionnaireMetrics(review);

  review.status = metrics.publishReady ? "ready" : "blocked";

  return metrics;
}

function resolveGapTasks(questionId: string) {
  for (const task of state.tasks) {
    if (task.questionId === questionId && task.state === "open") {
      task.state = "resolved";
    }
  }
}

export function getQuestionnaireMetrics(
  review: Pick<Questionnaire, "questions">,
): QuestionnaireMetrics {
  const blocked = review.questions.filter(
    (item) => item.status === "blocked",
  ).length;
  const cited = review.questions.filter(
    (item) => item.status === "cited",
  ).length;
  const needsReview = review.questions.filter(
    (item) => item.status === "needs-review",
  ).length;

  return {
    blocked,
    cited,
    needsReview,
    publishReady: blocked === 0 && needsReview === 0,
  };
}

export function getSystems() {
  return state.systems.filter((item) => !item.archived);
}

export function getEvidence() {
  return state.evidence.filter((item) => !item.archived);
}

export function getQuestionnaires() {
  return state.questionnaires;
}

export function getQuestionnaireById(id: string) {
  return state.questionnaires.find((item) => item.id === id) ?? null;
}

export function getPacketById(id: string) {
  return state.packets.find((item) => item.id === id) ?? null;
}

export function getTasksForQuestion(questionId: string) {
  return state.tasks.filter((item) => item.questionId === questionId);
}

export function upsertSystem(input: {
  description: string;
  id?: string;
  name: string;
  owner: string;
}) {
  const existing = input.id
    ? state.systems.find((item) => item.id === input.id)
    : null;

  if (existing) {
    existing.description = input.description;
    existing.name = input.name;
    existing.owner = input.owner;
    return existing.id;
  }

  const nextId = makeId("sys");
  state.systems.unshift({
    archived: false,
    description: input.description,
    evidenceCount: 0,
    id: nextId,
    linkedReviews: 0,
    name: input.name,
    owner: input.owner,
  });
  return nextId;
}

export function archiveSystem(id: string) {
  const system = state.systems.find((item) => item.id === id);

  if (system) {
    system.archived = true;
  }
}

export function upsertEvidence(input: {
  id?: string;
  linkedSystemIds: string[];
  source: string;
  strength: "high" | "medium";
  title: string;
  type: "doc" | "policy" | "spec";
}) {
  const existing = input.id
    ? state.evidence.find((item) => item.id === input.id)
    : null;

  if (existing) {
    existing.linkedSystemIds = input.linkedSystemIds;
    existing.source = input.source;
    existing.strength = input.strength;
    existing.title = input.title;
    existing.type = input.type;
    return existing.id;
  }

  const nextId = makeId("evidence");
  state.evidence.unshift({
    archived: false,
    id: nextId,
    linkedSystemIds: input.linkedSystemIds,
    source: input.source,
    strength: input.strength,
    title: input.title,
    type: input.type,
  });
  return nextId;
}

export function archiveEvidence(id: string) {
  const evidence = state.evidence.find((item) => item.id === id);

  if (evidence) {
    evidence.archived = true;
  }
}

export function saveAnswer(input: {
  answer: string;
  questionId: string;
  questionnaireId: string;
}) {
  const review = getQuestionnaireById(input.questionnaireId);
  const question = review?.questions.find(
    (item) => item.id === input.questionId,
  );

  if (!review || !question) {
    return;
  }

  question.answer = input.answer;
  question.status = deriveQuestionStatus(question);

  if (question.status === "cited") {
    resolveGapTasks(question.id);
  }

  syncQuestionnaireStatus(review);
}

export function createGapTask(input: {
  owner: string;
  questionId: string;
  questionnaireId: string;
  title: string;
}) {
  const review = getQuestionnaireById(input.questionnaireId);
  const question = review?.questions.find(
    (item) => item.id === input.questionId,
  );

  if (!review || !question) {
    return;
  }

  question.status = "blocked";
  syncQuestionnaireStatus(review);

  const existingTask = state.tasks.find(
    (item) => item.questionId === input.questionId && item.state === "open",
  );

  if (existingTask) {
    existingTask.owner = input.owner;
    existingTask.title = input.title;
    return;
  }

  state.tasks.unshift({
    id: makeId("task"),
    owner: input.owner,
    questionId: input.questionId,
    state: "open",
    title: input.title,
  });
}

export function publishPacket(questionnaireId: string) {
  const review = getQuestionnaireById(questionnaireId);

  if (!review) {
    return null;
  }

  const metrics = syncQuestionnaireStatus(review);

  if (!metrics.publishReady) {
    return null;
  }

  const packetId = review.packetId ?? makeId("packet");
  const proofSummary = buildProofSummary(review);
  const questions = buildPacketQuestions(review);

  review.packetId = packetId;
  review.status = "published";

  const existingPacket = state.packets.find((item) => item.id === packetId);

  if (existingPacket) {
    existingPacket.generatedAt = new Date().toISOString();
    existingPacket.questions = questions;
    existingPacket.proofSummary = proofSummary;
    existingPacket.reviewTitle = review.title;
    return existingPacket.id;
  }

  state.packets.unshift({
    generatedAt: new Date().toISOString(),
    id: packetId,
    questions,
    proofSummary,
    publishedForReviewId: questionnaireId,
    reviewTitle: review.title,
    status: "published",
  });

  return packetId;
}
