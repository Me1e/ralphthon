import Link from "next/link";
import { notFound } from "next/navigation";

import {
  createGapTaskAction,
  publishPacketAction,
  saveAnswerAction,
} from "@/app/(app)/actions";
import { StatusChip } from "@/components/status-chip";
import {
  getEvidence,
  getQuestionnaireById,
  getSystems,
  getTasksForQuestion,
} from "@/lib/demo-store";

export default async function ReviewRoomPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ question?: string }>;
}) {
  const { id } = await params;
  const { question: questionId } = await searchParams;
  const review = getQuestionnaireById(id);

  if (!review) {
    notFound();
  }

  const selectedQuestion =
    review.questions.find((item) => item.id === questionId) ??
    review.questions[0];

  if (!selectedQuestion) {
    notFound();
  }

  const systems = getSystems().filter(
    (item) => item.id === selectedQuestion.systemId,
  );
  const evidence = getEvidence().filter(
    (item) =>
      selectedQuestion.citations.includes(item.id) ||
      item.linkedSystemIds.includes(selectedQuestion.systemId),
  );
  const tasks = getTasksForQuestion(selectedQuestion.id);
  const counts = {
    blocked: review.questions.filter((item) => item.status === "blocked")
      .length,
    cited: review.questions.filter((item) => item.status === "cited").length,
    needsReview: review.questions.filter(
      (item) => item.status === "needs-review",
    ).length,
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="paper-panel flex items-end justify-between gap-6 p-6">
        <div>
          <p className="status-ink text-xs text-muted">Review room</p>
          <h2 className="mt-2 font-serif text-4xl text-foreground">
            Review Room
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            {review.title} for {review.company}. Resolve each question with
            citations before the packet ships.
          </p>
        </div>
        <form action={publishPacketAction}>
          <input name="questionnaireId" type="hidden" value={review.id} />
          <button
            className="inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
            type="submit"
          >
            Publish Packet
          </button>
        </form>
      </div>

      <div className="paper-panel grid flex-1 grid-cols-[260px_minmax(0,1fr)_320px] gap-0 overflow-hidden">
        <aside className="border-r border-border p-4">
          <div className="ruled-divider pb-4">
            <p className="status-ink text-xs text-muted">Coverage</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusChip label={`${counts.cited} cited`} status="cited" />
              <StatusChip
                label={`${counts.needsReview} needs review`}
                status="needs-review"
              />
              <StatusChip
                label={`${counts.blocked} blocked`}
                status="blocked"
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {review.questions.map((question, index) => (
              <Link
                key={question.id}
                className="block rounded-[10px] border border-border px-3 py-3 transition hover:bg-foreground/5"
                href={`/questionnaires/${review.id}?question=${question.id}`}
              >
                <p className="status-ink text-[11px] text-muted">
                  Question {index + 1}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {question.prompt}
                </p>
                <div className="mt-3">
                  <StatusChip status={question.status} />
                </div>
              </Link>
            ))}
          </div>
        </aside>

        <section className="flex flex-col border-r border-border p-6">
          <div className="ruled-divider pb-4">
            <p className="status-ink text-xs text-muted">Selected question</p>
            <h3 className="mt-3 font-serif text-3xl text-foreground">
              {selectedQuestion.prompt}
            </h3>
          </div>

          <form
            action={saveAnswerAction}
            className="mt-6 flex flex-1 flex-col gap-4"
          >
            <input name="questionnaireId" type="hidden" value={review.id} />
            <input
              name="questionId"
              type="hidden"
              value={selectedQuestion.id}
            />
            <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
              Answer
              <textarea
                className="min-h-56 rounded-[10px] border border-border bg-transparent px-4 py-4 text-sm leading-7 text-foreground"
                defaultValue={selectedQuestion.answer}
                name="answer"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedQuestion.citations.map((citationId) => (
                <span
                  key={citationId}
                  className="status-ink inline-flex items-center rounded-full border border-success/30 bg-success/8 px-3 py-1 text-[11px] text-success"
                >
                  Citation {citationId.replace("evidence-", "")}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between gap-3">
              <button
                className="inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground px-4 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
                type="submit"
              >
                Save Answer
              </button>
              <StatusChip
                label={
                  selectedQuestion.citations.length > 0
                    ? "citation required met"
                    : "missing citation"
                }
                status={
                  selectedQuestion.citations.length > 0 ? "cited" : "blocked"
                }
              />
            </div>
          </form>
        </section>

        <aside className="flex flex-col gap-6 p-5">
          <div className="ruled-divider pb-4">
            <p className="status-ink text-xs text-muted">Linked system</p>
            {systems.map((system) => (
              <div
                key={system.id}
                className="mt-3 rounded-[10px] border border-border p-4"
              >
                <p className="font-semibold text-foreground">{system.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {system.description}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="status-ink text-xs text-muted">Evidence ledger</p>
            {evidence.map((item) => (
              <div
                key={item.id}
                className="rounded-[10px] border border-border p-4"
              >
                <p className="text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-muted">{item.source}</p>
                <div className="mt-3 flex gap-2">
                  <StatusChip
                    label={item.strength}
                    status={item.strength === "high" ? "cited" : "needs-review"}
                  />
                </div>
              </div>
            ))}
          </div>

          <form
            action={createGapTaskAction}
            className="rounded-[10px] border border-border p-4"
          >
            <input name="questionnaireId" type="hidden" value={review.id} />
            <input
              name="questionId"
              type="hidden"
              value={selectedQuestion.id}
            />
            <input name="owner" type="hidden" value={review.owner} />
            <p className="status-ink text-xs text-muted">Gap task</p>
            <label className="mt-3 flex flex-col gap-2 text-sm font-medium text-foreground">
              Missing proof note
              <input
                className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
                defaultValue={
                  tasks[0]?.title ?? "Owner needed for missing proof"
                }
                name="title"
              />
            </label>
            <button
              className="mt-4 inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground px-4 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
              type="submit"
            >
              Create Gap Task
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
