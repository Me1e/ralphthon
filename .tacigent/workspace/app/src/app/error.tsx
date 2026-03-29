"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-8 py-16">
          <div className="paper-panel w-full p-8">
            <p className="status-ink text-xs text-blocked">Runtime error</p>
            <h1 className="mt-3 font-serif text-5xl text-foreground">
              The review desk hit an unexpected error.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
              Reset the route and try the last action again. If the same failure
              repeats, treat it as a product bug rather than continuing with an
              uncertain state.
            </p>
            {error.digest ? (
              <p className="status-ink mt-5 text-xs text-muted">
                digest {error.digest}
              </p>
            ) : null}
            <button
              className="mt-8 inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
              onClick={reset}
              type="button"
            >
              Retry Route
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
