"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background text-foreground">
        <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-8 py-16">
          <div className="paper-panel w-full p-8">
            <p className="status-ink text-xs text-blocked">런타임 오류</p>
            <h1 className="mt-3 font-serif text-5xl text-foreground">
              심사 데스크에서 예기치 않은 오류가 발생했습니다.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
              현재 경로를 다시 불러오고 마지막 작업을 다시 시도해주세요. 같은
              오류가 반복되면 불확실한 상태로 진행하지 말고 제품 버그로 간주해야
              합니다.
            </p>
            {error.digest ? (
              <p className="status-ink mt-5 text-xs text-muted">
                오류 식별자 {error.digest}
              </p>
            ) : null}
            <button
              className="mt-8 inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
              onClick={reset}
              type="button"
            >
              다시 시도
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
