import {
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const statusConfig: Record<
  "blocked" | "cited" | "needs-review" | "published" | "ready",
  { icon: LucideIcon; tone: string }
> = {
  blocked: {
    icon: AlertTriangle,
    tone: "border-blocked/30 bg-blocked/8 text-blocked",
  },
  cited: {
    icon: CheckCircle2,
    tone: "border-success/30 bg-success/8 text-success",
  },
  "needs-review": {
    icon: FileWarning,
    tone: "border-warning/30 bg-warning/8 text-warning",
  },
  published: {
    icon: CheckCircle2,
    tone: "border-success/30 bg-success/8 text-success",
  },
  ready: {
    icon: CheckCircle2,
    tone: "border-success/30 bg-success/8 text-success",
  },
};

export function StatusChip({
  label,
  status,
}: {
  label?: string;
  status: keyof typeof statusConfig;
}) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "status-ink inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px]",
        config.tone,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{label ?? status}</span>
    </span>
  );
}
