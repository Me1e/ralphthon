export function LoadingPanel({
  lines = 3,
  title,
}: {
  lines?: number;
  title: string;
}) {
  const skeletonLines = [
    { id: "lead", width: "72%" },
    { id: "support-a", width: "64%" },
    { id: "support-b", width: "88%" },
    { id: "support-c", width: "58%" },
    { id: "support-d", width: "81%" },
    { id: "support-e", width: "69%" },
    { id: "support-f", width: "84%" },
    { id: "support-g", width: "61%" },
  ].slice(0, lines);

  return (
    <div className="paper-panel animate-pulse p-6">
      <p className="status-ink text-xs text-muted">{title}</p>
      <div className="mt-4 space-y-3">
        {skeletonLines.map((line) => (
          <div
            key={`${title}-${line.id}`}
            className="h-4 rounded-full bg-foreground/8"
            style={{ width: line.width }}
          />
        ))}
      </div>
    </div>
  );
}
