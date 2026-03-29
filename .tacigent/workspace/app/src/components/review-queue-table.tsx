import Link from "next/link";

import { StatusChip } from "@/components/status-chip";
import { getQuestionnaireMetrics, type Questionnaire } from "@/lib/demo-store";
import { cn, formatDateLabel } from "@/lib/utils";

function getFilterHref(filter: QueueFilter) {
  return filter === "all"
    ? "/questionnaires"
    : `/questionnaires?filter=${filter}`;
}

type QueueFilter = "all" | "blocked" | "ready";

export function ReviewQueueTable({
  currentFilter,
  reviews,
}: {
  currentFilter: QueueFilter;
  reviews: Questionnaire[];
}) {
  const totalBlockedQuestions = reviews.reduce(
    (count, review) => count + getQuestionnaireMetrics(review).blocked,
    0,
  );
  const publishReadyReviews = reviews.filter((review) => {
    return getQuestionnaireMetrics(review).publishReady;
  }).length;

  if (reviews.length === 0) {
    return (
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="paper-panel p-5">
            <p className="status-ink text-xs text-muted">Active reviews</p>
            <p className="mt-3 font-serif text-4xl text-foreground">0</p>
          </div>
          <div className="paper-panel p-5">
            <p className="status-ink text-xs text-muted">Blocked questions</p>
            <p className="mt-3 font-serif text-4xl text-foreground">0</p>
          </div>
          <div className="paper-panel p-5">
            <p className="status-ink text-xs text-muted">Publish ready</p>
            <p className="mt-3 font-serif text-4xl text-foreground">0</p>
          </div>
        </div>
        <div className="paper-panel flex min-h-[320px] flex-col items-start justify-center gap-4 p-8">
          <h2 className="font-serif text-3xl text-foreground">Review Queue</h2>
          <p className="max-w-xl text-sm leading-7 text-muted">
            No active reviews yet. Seed Demo Review creates the first buyer
            review path.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.8fr)]">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="paper-panel p-5">
            <p className="status-ink text-xs text-muted">Active reviews</p>
            <p className="mt-3 font-serif text-4xl text-foreground">
              {reviews.length}
            </p>
            <p className="mt-2 text-sm text-muted">
              Buyer-review paths currently in the desk.
            </p>
          </div>
          <div className="paper-panel p-5">
            <p className="status-ink text-xs text-muted">Blocked questions</p>
            <p className="mt-3 font-serif text-4xl text-foreground">
              {totalBlockedQuestions}
            </p>
            <p className="mt-2 text-sm text-muted">
              Missing proof that still needs remediation.
            </p>
          </div>
          <div className="paper-panel p-5">
            <p className="status-ink text-xs text-muted">Publish ready</p>
            <p className="mt-3 font-serif text-4xl text-foreground">
              {publishReadyReviews}
            </p>
            <p className="mt-2 text-sm text-muted">
              Reviews that can ship as cited packets now.
            </p>
          </div>
        </div>
        <div className="paper-panel flex flex-col justify-between p-5">
          <div>
            <p className="status-ink text-xs text-muted">
              Recommended next step
            </p>
            <p className="mt-3 font-serif text-3xl text-foreground">
              Start with proof, then inspect the gap.
            </p>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            Open the ready review first to see the full workflow. Then compare
            it with the blocked follow-up to see what Proofline surfaces when
            proof is missing.
          </p>
        </div>
      </div>
      <div className="paper-panel overflow-hidden">
        <div className="ruled-divider flex items-end justify-between gap-4 px-6 py-5">
          <div>
            <p className="status-ink text-xs text-muted">Review queue</p>
            <h2 className="mt-2 font-serif text-4xl text-foreground">
              Review Queue
            </h2>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {(["all", "ready", "blocked"] as QueueFilter[]).map((filter) => (
              <Link
                key={filter}
                className={cn(
                  "status-ink rounded-full border px-3 py-2 text-[11px] transition",
                  currentFilter === filter
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:bg-foreground/5 hover:text-foreground",
                )}
                href={getFilterHref(filter)}
              >
                {filter === "all"
                  ? "All reviews"
                  : filter === "ready"
                    ? "Ready first"
                    : "Blocked only"}
              </Link>
            ))}
          </div>
        </div>
        <div className="divide-y divide-border">
          {reviews.map((review) => {
            const counts = getQuestionnaireMetrics(review);
            const reviewReady = counts.publishReady;
            const rowLabel = reviewReady
              ? "Ready to publish"
              : "Proof gap open";

            return (
              <div
                key={review.id}
                className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-4 px-6 py-5"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-semibold text-foreground">
                      {review.title}
                    </p>
                    <StatusChip
                      label={rowLabel}
                      status={reviewReady ? "ready" : "blocked"}
                    />
                  </div>
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
                    {reviewReady ? "Open Ready Review" : "Resolve Proof Gap"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
