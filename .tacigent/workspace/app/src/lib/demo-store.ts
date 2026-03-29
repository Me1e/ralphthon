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
        "LLM-powered support drafting with human approval before send.",
      evidenceCount: 2,
      id: "sys-support-copilot",
      linkedReviews: 2,
      name: "Support Copilot",
      owner: "Mina Park",
    },
    {
      archived: false,
      description:
        "Policy classifier for routing inbound tickets with human override.",
      evidenceCount: 2,
      id: "sys-policy-router",
      linkedReviews: 1,
      name: "Policy Router",
      owner: "Jules Carter",
    },
  ],
  evidence: [
    {
      archived: false,
      id: "evidence-oversight",
      linkedSystemIds: ["sys-support-copilot"],
      source: "Product requirement memo",
      strength: "high",
      title: "Human oversight runbook",
      type: "policy",
    },
    {
      archived: false,
      id: "evidence-logging",
      linkedSystemIds: ["sys-support-copilot"],
      source: "Engineering spec",
      strength: "high",
      title: "Audit event logging spec",
      type: "spec",
    },
    {
      archived: false,
      id: "evidence-boundaries",
      linkedSystemIds: ["sys-policy-router"],
      source: "Security review",
      strength: "medium",
      title: "Model boundary and escalation note",
      type: "doc",
    },
    {
      archived: false,
      id: "evidence-eval",
      linkedSystemIds: ["sys-policy-router"],
      source: "QA sheet",
      strength: "medium",
      title: "Evaluation sample set",
      type: "doc",
    },
  ],
  questionnaires: [
    {
      company: "Acme",
      dueDate: "2026-04-02",
      id: "review-acme",
      owner: "Mina Park",
      packetId: "packet-acme",
      questions: [
        {
          answer:
            "Every customer-facing draft requires a human approver before it can be sent.",
          citations: ["evidence-oversight"],
          id: "q-acme-1",
          prompt:
            "Describe human oversight for AI-generated customer communications.",
          status: "cited",
          systemId: "sys-support-copilot",
        },
        {
          answer:
            "We retain immutable event logs for each model-assisted action, including actor, system, and timestamp.",
          citations: ["evidence-logging"],
          id: "q-acme-2",
          prompt: "How do you retain audit trails for AI actions?",
          status: "cited",
          systemId: "sys-support-copilot",
        },
        {
          answer:
            "High-risk routing decisions fall back to manual review when confidence drops below the escalation threshold.",
          citations: ["evidence-boundaries"],
          id: "q-acme-3",
          prompt: "What safeguards prevent automated policy routing errors?",
          status: "cited",
          systemId: "sys-policy-router",
        },
      ],
      status: "ready",
      title: "Acme Procurement Review",
    },
    {
      company: "Helix Bank",
      dueDate: "2026-04-06",
      id: "review-helix",
      owner: "Jules Carter",
      packetId: null,
      questions: [
        {
          answer: "",
          citations: [],
          id: "q-helix-1",
          prompt:
            "Provide evidence that AI outputs cannot send regulated replies without approval.",
          status: "blocked",
          systemId: "sys-support-copilot",
        },
      ],
      status: "blocked",
      title: "Helix Bank Trust Review",
    },
  ],
  tasks: [
    {
      id: "task-helix-owner",
      owner: "Mina Park",
      questionId: "q-helix-1",
      state: "open",
      title: "Owner needed for approval evidence",
    },
  ],
  packets: [
    {
      generatedAt: "2026-03-29T12:00:00.000Z",
      id: "packet-acme",
      questions: [
        {
          answer:
            "Every customer-facing draft requires a human approver before it can be sent.",
          citations: ["evidence-oversight"],
          id: "q-acme-1",
          prompt:
            "Describe human oversight for AI-generated customer communications.",
        },
        {
          answer:
            "We retain immutable event logs for each model-assisted action, including actor, system, and timestamp.",
          citations: ["evidence-logging"],
          id: "q-acme-2",
          prompt: "How do you retain audit trails for AI actions?",
        },
        {
          answer:
            "High-risk routing decisions fall back to manual review when confidence drops below the escalation threshold.",
          citations: ["evidence-boundaries"],
          id: "q-acme-3",
          prompt: "What safeguards prevent automated policy routing errors?",
        },
      ],
      proofSummary: "3 cited answers, 0 blocked questions, owner assigned.",
      publishedForReviewId: "review-acme",
      reviewTitle: "Acme Procurement Review",
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
  return `${metrics.cited} cited answers, ${metrics.blocked} blocked questions, owner assigned.`;
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
