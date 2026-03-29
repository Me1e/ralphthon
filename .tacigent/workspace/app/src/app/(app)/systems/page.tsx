import { archiveSystemAction, upsertSystemAction } from "@/app/(app)/actions";
import { getSystems } from "@/lib/demo-store";

export default async function SystemsPage() {
  const systems = getSystems();

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="paper-panel overflow-hidden">
        <div className="ruled-divider px-6 py-5">
          <p className="status-ink text-xs text-muted">System roster</p>
          <h2 className="mt-2 font-serif text-4xl text-foreground">Systems</h2>
        </div>
        {systems.length === 0 ? (
          <div className="px-6 py-10">
            <p className="font-semibold text-foreground">No systems yet.</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              Add the AI systems that buyer questions refer to so answers can be
              mapped to one concrete system instead of free-form notes.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {systems.map((system) => (
              <div
                key={system.id}
                className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] gap-4 px-6 py-5"
              >
                <div>
                  <p className="font-semibold text-foreground">{system.name}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {system.description}
                  </p>
                </div>
                <div className="space-y-2 text-sm text-muted">
                  <p>Owner {system.owner}</p>
                  <p>{system.evidenceCount} linked evidence items</p>
                </div>
                <form action={archiveSystemAction}>
                  <input name="id" type="hidden" value={system.id} />
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
        action={upsertSystemAction}
        className="paper-panel flex flex-col gap-4 p-6"
      >
        <div className="ruled-divider pb-4">
          <p className="status-ink text-xs text-muted">Create system</p>
          <h3 className="mt-2 font-serif text-3xl text-foreground">
            New System
          </h3>
        </div>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Name
          <input
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="name"
            placeholder="Support Copilot"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Owner
          <input
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="owner"
            placeholder="Mina Park"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Description
          <textarea
            className="min-h-36 rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="description"
            placeholder="Explain what the system does and where human control sits."
            required
          />
        </label>
        <button
          className="inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
          type="submit"
        >
          New System
        </button>
      </form>
    </div>
  );
}
