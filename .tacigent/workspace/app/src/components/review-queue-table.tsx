import Link from "next/link";
import { StatusChip } from "@/components/status-chip";
import type { Questionnaire } from "@/lib/demo-store";
import { formatDateLabel } from "@/lib/utils";

function getCounts(review: Questionnaire) {
  const cited = review.questions.filter(
    (item) => item.status === "cited",
  ).length;
  const blocked = review.questions.filter(
    (item) => item.status === "blocked",
  ).length;
  const needsReview = review.questions.filter(
    (item) => item.status === "needs-review",
  ).length;

  return { blocked, cited, needsReview };
}

export function ReviewQueueTable({ reviews }: { reviews: Questionnaire[] }) {
  if (reviews.length === 0) {
    return (
      <div className="paper-panel flex min-h-[320px] flex-col items-start justify-center gap-4 p-8">
        <h2 className="font-serif text-3xl text-foreground">Review Queue</h2>
        <p className="max-w-xl text-sm leading-7 text-muted">
          No active reviews yet. Seed Demo Review creates the first buyer review
          path.
        </p>
      </div>
    );
  }

  return (
    <div className="paper-panel overflow-hidden">
      <div className="ruled-divider flex items-end justify-between gap-4 px-6 py-5">
        <div>
          <p className="status-ink text-xs text-muted">Review queue</p>
          <h2 className="mt-2 font-serif text-4xl text-foreground">
            Review Queue
          </h2>
        </div>
        <p className="max-w-sm text-right text-sm leading-6 text-muted">
          Start with the review that already has proof, then compare it with the
          blocked follow-up.
        </p>
      </div>
      <div className="divide-y divide-border">
        {reviews.map((review) => {
          const counts = getCounts(review);

          return (
            <div
              key={review.id}
              className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-4 px-6 py-5"
            >
              <div className="space-y-1">
                <p className="font-semibold text-foreground">{review.title}</p>
                <p className="text-sm text-muted">
                  {review.company} · Owner {review.owner}
                </p>
              </div>
              <div className="space-y-2">
                <StatusChip label={`${counts.cited} cited`} status="cited" />
                <StatusChip
                  label={`${counts.needsReview} needs review`}
                  status="needs-review"
                />
              </div>
              <div className="space-y-2">
                <StatusChip
                  label={`${counts.blocked} blocked`}
                  status="blocked"
                />
                <p className="status-ink text-xs text-muted">
                  due {formatDateLabel(review.dueDate)}
                </p>
              </div>
              <div className="flex justify-end">
                <Link
                  className="inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
                  href={`/questionnaires/${review.id}`}
                >
                  Open Review Room
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
