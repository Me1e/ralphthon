import { LoadingPanel } from "@/components/loading-panel";

export default function AppLoading() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <LoadingPanel lines={2} title="심사 데스크 불러오는 중" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.8fr)]">
        <LoadingPanel lines={4} title="대기열 요약" />
        <LoadingPanel lines={4} title="다음 작업" />
      </div>
      <LoadingPanel lines={8} title="심사 대기열" />
    </div>
  );
}
