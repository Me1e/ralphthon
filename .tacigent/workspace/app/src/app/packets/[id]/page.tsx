import { notFound } from "next/navigation";

import { StatusChip } from "@/components/status-chip";
import {
  getPacketById,
  getQuestionnaireById,
  getQuestionnaires,
} from "@/lib/demo-store";
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

  const review =
    getQuestionnaireById(packet.publishedForReviewId) ??
    getQuestionnaires().find((item) => item.packetId === packet.id);

  if (!review) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-8 py-10">
      <header className="paper-panel p-8">
        <p className="status-ink text-xs text-muted">Buyer packet</p>
        <h1 className="mt-3 font-serif text-5xl text-foreground">
          Buyer Packet
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <StatusChip status="published" />
          <p className="text-sm text-muted">
            {review.title} · generated {formatDateLabel(packet.generatedAt)}
          </p>
        </div>
      </header>

      <section className="paper-panel p-8">
        <div className="ruled-divider pb-5">
          <p className="status-ink text-xs text-muted">Proof summary</p>
          <h2 className="mt-2 font-serif text-3xl text-foreground">
            {review.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            {packet.proofSummary}
          </p>
        </div>

        <div className="mt-8 space-y-8">
          {review.questions.map((question, index) => (
            <section key={question.id} className="space-y-3">
              <p className="status-ink text-xs text-muted">
                Question {index + 1}
              </p>
              <h3 className="font-semibold text-foreground">
                {question.prompt}
              </h3>
              <p className="text-sm leading-7 text-foreground">
                {question.answer || "No answer yet."}
              </p>
              <div className="flex flex-wrap gap-2">
                {question.citations.map((citation) => (
                  <StatusChip
                    key={citation}
                    label={`Citation ${citation.replace("evidence-", "")}`}
                    status="cited"
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
