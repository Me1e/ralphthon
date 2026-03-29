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
  getQuestionnaireMetrics,
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
  const counts = getQuestionnaireMetrics(review);
  const publishReady = counts.publishReady;
  const selectedQuestionIndex = review.questions.findIndex(
    (item) => item.id === selectedQuestion.id,
  );

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="paper-panel flex items-end justify-between gap-6 p-6">
        <div>
          <p className="status-ink text-xs text-muted">심사실</p>
          <h2 className="mt-2 font-serif text-4xl text-foreground">심사실</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            {review.company}의 {review.title}입니다. 패킷을 발행하기 전에 각
            질문을 근거와 함께 정리해야 합니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusChip
              label={publishReady ? "패킷 발행 가능" : "아직 증빙 부족"}
              status={publishReady ? "ready" : "blocked"}
            />
            <StatusChip
              label={`질문 ${selectedQuestionIndex + 1} / ${review.questions.length}`}
              status="needs-review"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          {review.packetId ? (
            <Link
              className="inline-flex h-11 items-center justify-center rounded-[10px] border border-border px-4 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
              href={`/packets/${review.packetId}`}
            >
              현재 패킷 보기
            </Link>
          ) : null}
          <form action={publishPacketAction}>
            <input name="questionnaireId" type="hidden" value={review.id} />
            <button
              className="inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:border-border disabled:bg-transparent disabled:text-muted disabled:hover:opacity-100"
              disabled={!publishReady}
              type="submit"
            >
              패킷 발행
            </button>
          </form>
          {!publishReady ? (
            <p className="max-w-xs text-right text-sm leading-6 text-muted">
              모든 질문에 근거가 붙고 증빙 공백이 없어질 때까지 발행은 잠겨
              있습니다.
            </p>
          ) : null}
        </div>
      </div>

      <div className="paper-panel grid flex-1 grid-cols-[260px_minmax(0,1fr)_320px] gap-0 overflow-hidden">
        <aside className="border-r border-border p-4">
          <div className="ruled-divider pb-4">
            <p className="status-ink text-xs text-muted">진행 현황</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusChip
                label={`${counts.cited}건 근거 첨부`}
                status="cited"
              />
              <StatusChip
                label={`${counts.needsReview}건 검토 필요`}
                status="needs-review"
              />
              <StatusChip
                label={`${counts.blocked}건 차단됨`}
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
                  질문 {index + 1}
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
            <p className="status-ink text-xs text-muted">선택된 질문</p>
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
              답변
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
                  근거 {citationId.replace("evidence-", "")}
                </span>
              ))}
            </div>
            <div className="mt-auto rounded-[12px] border border-border/80 bg-background/75 p-4">
              <p className="status-ink text-xs text-muted">답변 작업 영역</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                문구가 정리되면 답변을 저장하세요. 모든 질문이 근거와 함께
                정리되거나, 부족한 부분이 명시적으로 드러나 있을 때 발행이 가장
                안전합니다.
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  className="inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground px-4 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
                  type="submit"
                >
                  답변 저장
                </button>
                <StatusChip
                  label={
                    selectedQuestion.citations.length > 0
                      ? "근거 요구 충족"
                      : "근거 없음"
                  }
                  status={
                    selectedQuestion.citations.length > 0 ? "cited" : "blocked"
                  }
                />
              </div>
            </div>
          </form>
        </section>

        <aside className="flex flex-col gap-6 p-5">
          <div className="ruled-divider pb-4">
            <p className="status-ink text-xs text-muted">연결된 시스템</p>
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
            <p className="status-ink text-xs text-muted">증빙 원장</p>
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
                    label={item.strength === "high" ? "높음" : "중간"}
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
            <p className="status-ink text-xs text-muted">공백 해결 작업</p>
            <label className="mt-3 flex flex-col gap-2 text-sm font-medium text-foreground">
              부족한 증빙 메모
              <input
                className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
                defaultValue={tasks[0]?.title ?? "부족한 증빙 담당자 지정 필요"}
                name="title"
              />
            </label>
            <button
              className="mt-4 inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground px-4 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
              type="submit"
            >
              공백 해결 작업 만들기
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
