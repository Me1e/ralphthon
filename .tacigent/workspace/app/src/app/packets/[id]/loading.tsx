import { LoadingPanel } from "@/components/loading-panel";

export default function PacketLoading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-8 py-10">
      <LoadingPanel lines={3} title="바이어 패킷 불러오는 중" />
      <LoadingPanel lines={8} title="근거 요약 불러오는 중" />
    </main>
  );
}
