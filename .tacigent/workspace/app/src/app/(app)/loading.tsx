import { LoadingPanel } from "@/components/loading-panel";

export default function AppLoading() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <LoadingPanel lines={2} title="Loading review desk" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.8fr)]">
        <LoadingPanel lines={4} title="Queue summary" />
        <LoadingPanel lines={4} title="Next step" />
      </div>
      <LoadingPanel lines={8} title="Review queue" />
    </div>
  );
}
