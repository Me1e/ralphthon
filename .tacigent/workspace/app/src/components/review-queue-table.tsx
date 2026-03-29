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
            <p className="status-ink text-xs text-muted">활성 심사</p>
            <p className="mt-3 font-serif text-4xl text-foreground">0</p>
          </div>
          <div className="paper-panel p-5">
            <p className="status-ink text-xs text-muted">막힌 질문</p>
            <p className="mt-3 font-serif text-4xl text-foreground">0</p>
          </div>
          <div className="paper-panel p-5">
            <p className="status-ink text-xs text-muted">발행 가능</p>
            <p className="mt-3 font-serif text-4xl text-foreground">0</p>
          </div>
        </div>
        <div className="paper-panel flex min-h-[320px] flex-col items-start justify-center gap-4 p-8">
          <h2 className="font-serif text-3xl text-foreground">심사 대기열</h2>
          <p className="max-w-xl text-sm leading-7 text-muted">
            아직 활성 심사가 없습니다. 데모 심사를 추가하면 첫 바이어 심사
            흐름을 바로 볼 수 있습니다.
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
            <p className="status-ink text-xs text-muted">활성 심사</p>
            <p className="mt-3 font-serif text-4xl text-foreground">
              {reviews.length}
            </p>
            <p className="mt-2 text-sm text-muted">
              지금 데스크에서 처리 중인 바이어 심사 흐름입니다.
            </p>
          </div>
          <div className="paper-panel p-5">
            <p className="status-ink text-xs text-muted">막힌 질문</p>
            <p className="mt-3 font-serif text-4xl text-foreground">
              {totalBlockedQuestions}
            </p>
            <p className="mt-2 text-sm text-muted">
              아직 보강이 필요한 증빙 공백입니다.
            </p>
          </div>
          <div className="paper-panel p-5">
            <p className="status-ink text-xs text-muted">발행 가능</p>
            <p className="mt-3 font-serif text-4xl text-foreground">
              {publishReadyReviews}
            </p>
            <p className="mt-2 text-sm text-muted">
              지금 바로 근거 패킷으로 발행할 수 있는 심사입니다.
            </p>
          </div>
        </div>
        <div className="paper-panel flex flex-col justify-between p-5">
          <div>
            <p className="status-ink text-xs text-muted">추천 다음 단계</p>
            <p className="mt-3 font-serif text-3xl text-foreground">
              먼저 근거가 있는 흐름을 보고, 그다음 공백을 확인하세요.
            </p>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            먼저 발행 가능한 심사를 열어 전체 흐름을 확인하세요. 그다음 막힌
            심사를 열면 Proofline이 증빙 공백을 어떻게 드러내는지 볼 수
            있습니다.
          </p>
        </div>
      </div>
      <div className="paper-panel overflow-hidden">
        <div className="ruled-divider flex items-end justify-between gap-4 px-6 py-5">
          <div>
            <p className="status-ink text-xs text-muted">심사 대기열</p>
            <h2 className="mt-2 font-serif text-4xl text-foreground">
              심사 대기열
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
                  ? "전체 심사"
                  : filter === "ready"
                    ? "발행 가능 우선"
                    : "막힌 항목만"}
              </Link>
            ))}
          </div>
        </div>
        <div className="divide-y divide-border">
          {reviews.map((review) => {
            const counts = getQuestionnaireMetrics(review);
            const reviewReady = counts.publishReady;
            const rowLabel = reviewReady ? "발행 가능" : "증빙 공백 있음";

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
                    {review.company} · 담당 {review.owner}
                  </p>
                </div>
                <div className="space-y-2">
                  <StatusChip
                    label={`${counts.cited}건 근거 첨부`}
                    status="cited"
                  />
                  <StatusChip
                    label={`${counts.needsReview}건 검토 필요`}
                    status="needs-review"
                  />
                </div>
                <div className="space-y-2">
                  <StatusChip
                    label={`${counts.blocked}건 차단됨`}
                    status="blocked"
                  />
                  <p className="status-ink text-xs text-muted">
                    마감 {formatDateLabel(review.dueDate)}
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link
                    className="inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
                    href={`/questionnaires/${review.id}`}
                  >
                    {reviewReady ? "발행 가능 심사 열기" : "증빙 공백 해결하기"}
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
