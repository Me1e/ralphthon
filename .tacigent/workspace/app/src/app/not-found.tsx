import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-8 py-16">
      <div className="paper-panel w-full p-8">
        <p className="status-ink text-xs text-blocked">Not found</p>
        <h1 className="mt-3 font-serif text-5xl text-foreground">
          That review surface does not exist.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
          The route may be stale, the packet may have been removed, or the
          review id is wrong. Return to the queue and reopen the record from the
          desk.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
            href="/questionnaires"
          >
            Return to Review Queue
          </Link>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-[10px] border border-border px-4 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
            href="/login"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
