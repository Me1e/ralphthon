import {
  archiveEvidenceAction,
  upsertEvidenceAction,
} from "@/app/(app)/actions";
import { getEvidence, getSystems } from "@/lib/demo-store";

export default async function EvidencePage() {
  const evidence = getEvidence();
  const systems = getSystems();

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="paper-panel overflow-hidden">
        <div className="ruled-divider px-6 py-5">
          <p className="status-ink text-xs text-muted">Evidence ledger</p>
          <h2 className="mt-2 font-serif text-4xl text-foreground">Evidence</h2>
        </div>
        {evidence.length === 0 ? (
          <div className="px-6 py-10">
            <p className="font-semibold text-foreground">No evidence yet.</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              Add the policy, spec, or doc that proves an answer. The review
              room is stronger when evidence exists before the buyer asks.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {evidence.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] gap-4 px-6 py-5"
              >
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-2 text-sm text-muted">{item.source}</p>
                </div>
                <div className="space-y-2 text-sm text-muted">
                  <p>{item.type}</p>
                  <p>{item.linkedSystemIds.length} linked systems</p>
                </div>
                <form action={archiveEvidenceAction}>
                  <input name="id" type="hidden" value={item.id} />
                  <button
                    className="inline-flex h-10 items-center justify-center rounded-[10px] border border-border px-3 text-sm font-medium text-foreground transition hover:bg-foreground/5"
                    type="submit"
                  >
                    Archive
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </section>

      <form
        action={upsertEvidenceAction}
        className="paper-panel flex flex-col gap-4 p-6"
      >
        <div className="ruled-divider pb-4">
          <p className="status-ink text-xs text-muted">Create evidence</p>
          <h3 className="mt-2 font-serif text-3xl text-foreground">
            Add Evidence
          </h3>
        </div>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Title
          <input
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="title"
            placeholder="Human oversight runbook"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Source
          <input
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="source"
            placeholder="Product requirement memo"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Type
          <select
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="type"
          >
            <option value="doc">Doc</option>
            <option value="policy">Policy</option>
            <option value="spec">Spec</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Strength
          <select
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="strength"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Linked systems
          <input
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            defaultValue={systems.map((item) => item.id).join(", ")}
            name="linkedSystemIds"
            placeholder="sys-support-copilot, sys-policy-router"
            required
          />
        </label>
        <button
          className="inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
          type="submit"
        >
          Add Evidence
        </button>
      </form>
    </div>
  );
}
