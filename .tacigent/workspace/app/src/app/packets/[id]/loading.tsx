import { LoadingPanel } from "@/components/loading-panel";

export default function PacketLoading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-8 py-10">
      <LoadingPanel lines={3} title="Loading buyer packet" />
      <LoadingPanel lines={8} title="Loading proof summary" />
    </main>
  );
}
