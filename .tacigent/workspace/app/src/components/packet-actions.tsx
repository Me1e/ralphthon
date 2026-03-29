"use client";

import Link from "next/link";
import { useState } from "react";

export function PacketActions({ reviewId }: { reviewId: string }) {
  const [copyLabel, setCopyLabel] = useState("공유 링크 복사");

  async function handleCopyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopyLabel("링크 복사 완료");
    window.setTimeout(() => setCopyLabel("공유 링크 복사"), 1800);
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
        심사 화면으로 돌아가기
      </Link>
    </div>
  );
}
