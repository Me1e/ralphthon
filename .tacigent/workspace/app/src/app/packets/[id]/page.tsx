import { notFound } from "next/navigation";

import { PacketActions } from "@/components/packet-actions";
import { StatusChip } from "@/components/status-chip";
import { getPacketById, getQuestionnaireById } from "@/lib/demo-store";
import { formatDateLabel } from "@/lib/utils";

export default async function PacketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const packet = getPacketById(id);

  if (!packet) {
    notFound();
  }

  const review = getQuestionnaireById(packet.publishedForReviewId);

  if (!review) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-8 py-10">
      <header className="paper-panel p-8">
        <p className="status-ink text-xs text-muted">바이어 패킷</p>
        <h1 className="mt-3 font-serif text-5xl text-foreground">
          바이어 패킷
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <StatusChip status="published" />
          <p className="text-sm text-muted">
            {packet.reviewTitle} · generated{" "}
            {formatDateLabel(packet.generatedAt)}
          </p>
        </div>
        <PacketActions reviewId={review.id} />
      </header>

      <section className="paper-panel p-8">
        <div className="ruled-divider pb-5">
          <p className="status-ink text-xs text-muted">근거 요약</p>
          <h2 className="mt-2 font-serif text-3xl text-foreground">
            {packet.reviewTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            {packet.proofSummary}
          </p>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="rounded-[10px] border border-border bg-background/70 p-5">
            <p className="status-ink text-xs text-muted">목차</p>
            <ol className="mt-4 space-y-3">
              {packet.questions.map((question, index) => (
                <li key={question.id}>
                  <a
                    className="text-sm leading-6 text-foreground transition hover:text-success"
                    href={`#${question.id}`}
                  >
                    {index + 1}. {question.prompt}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="space-y-8">
            {packet.questions.map((question, index) => (
              <section id={question.id} key={question.id} className="space-y-3">
                <p className="status-ink text-xs text-muted">
                  질문 {index + 1}
                </p>
                <h3 className="font-semibold text-foreground">
                  {question.prompt}
                </h3>
                <p className="text-sm leading-7 text-foreground">
                  {question.answer || "아직 답변이 없습니다."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {question.citations.map((citation) => (
                    <StatusChip
                      key={citation}
                      label={`근거 ${citation.replace("evidence-", "")}`}
                      status="cited"
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
