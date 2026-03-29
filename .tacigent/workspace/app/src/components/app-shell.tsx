"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/questionnaires", label: "심사 대기열" },
  { href: "/systems", label: "시스템" },
  { href: "/evidence", label: "증빙" },
];

export function AppShell({
  children,
  userLabel,
}: {
  children: React.ReactNode;
  userLabel: string;
}) {
  const currentPath = usePathname();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] gap-6 px-6 py-6">
      <aside className="paper-panel flex w-72 shrink-0 flex-col gap-6 p-5">
        <div className="ruled-divider pb-5">
          <p className="status-ink text-xs text-muted">Proofline</p>
          <h1 className="mt-3 font-serif text-3xl text-foreground">
            심사 데스크
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            AI 구매 심사를 근거가 붙은 패킷으로 정리하고, 근거 없는 답변은
            밖으로 나가지 않게 합니다.
          </p>
        </div>

        <nav aria-label="기본 메뉴" className="flex flex-col gap-2">
          {navItems.map((item) => {
            const active = currentPath.startsWith(item.href);

            return (
              <Link
                key={item.href}
                className={cn(
                  "rounded-[10px] border px-4 py-3 text-sm font-medium transition",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-transparent text-foreground hover:bg-foreground/5",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2 rounded-[10px] border border-border bg-background/70 p-4">
          <p className="status-ink text-xs text-muted">담당자</p>
          <p className="text-sm font-medium text-foreground">{userLabel}</p>
          <p className="text-sm text-muted">로컬 Better Auth 데모 세션</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
