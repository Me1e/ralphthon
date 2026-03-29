import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-8 py-16">
      <div className="paper-panel w-full p-8">
        <p className="status-ink text-xs text-blocked">찾을 수 없음</p>
        <h1 className="mt-3 font-serif text-5xl text-foreground">
          요청한 심사 화면이 없습니다.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
          주소가 오래되었거나, 패킷이 삭제되었거나, 심사 ID가 잘못되었을 수
          있습니다. 대기열로 돌아가 데스크에서 다시 열어주세요.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
            href="/questionnaires"
          >
            심사 대기열로 돌아가기
          </Link>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-[10px] border border-border px-4 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
            href="/login"
          >
            로그인으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
