"use client";

import Link from "next/link";
import { useState } from "react";

export function PacketActions({ reviewId }: { reviewId: string }) {
  const [copyLabel, setCopyLabel] = useState("Copy Share Link");

  async function handleCopyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopyLabel("Link Copied");
    window.setTimeout(() => setCopyLabel("Copy Share Link"), 1800);
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <button
        className="inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
        onClick={handleCopyLink}
        type="button"
      >
        {copyLabel}
      </button>
      <Link
        className="inline-flex h-11 items-center justify-center rounded-[10px] border border-border px-4 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
        href={`/questionnaires/${reviewId}`}
      >
        Back to Review
      </Link>
    </div>
  );
}
