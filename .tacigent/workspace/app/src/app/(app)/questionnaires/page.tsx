import { ReviewQueueTable } from "@/components/review-queue-table";
import { getQuestionnaires } from "@/lib/demo-store";

export default async function QuestionnairesPage() {
  const reviews = getQuestionnaires();

  return <ReviewQueueTable reviews={reviews} />;
}
