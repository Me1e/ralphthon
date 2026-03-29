import { ReviewQueueTable } from "@/components/review-queue-table";
import { getQuestionnaires } from "@/lib/demo-store";

type QueueFilter = "all" | "blocked" | "ready";

export default async function QuestionnairesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const currentFilter: QueueFilter =
    filter === "blocked" || filter === "ready" ? filter : "all";
  const allReviews = getQuestionnaires();
  const reviews = allReviews.filter((review) => {
    if (currentFilter === "all") {
      return true;
    }

    if (currentFilter === "blocked") {
      return review.status === "blocked";
    }

    return review.status === "ready" || review.status === "published";
  });

  return <ReviewQueueTable currentFilter={currentFilter} reviews={reviews} />;
}
