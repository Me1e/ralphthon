import { archiveSystemAction, upsertSystemAction } from "@/app/(app)/actions";
import { getSystems } from "@/lib/demo-store";

export default async function SystemsPage() {
  const systems = getSystems();

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="paper-panel overflow-hidden">
        <div className="ruled-divider px-6 py-5">
          <p className="status-ink text-xs text-muted">시스템 목록</p>
          <h2 className="mt-2 font-serif text-4xl text-foreground">시스템</h2>
        </div>
        {systems.length === 0 ? (
          <div className="px-6 py-10">
            <p className="font-semibold text-foreground">
              아직 등록된 시스템이 없습니다.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              바이어 질문이 참조하는 AI 시스템을 등록하면, 답변을 자유 서술
              메모가 아니라 실제 시스템 단위로 연결할 수 있습니다.
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
                  <p>담당자 {system.owner}</p>
                  <p>연결된 증빙 {system.evidenceCount}건</p>
                </div>
                <form action={archiveSystemAction}>
                  <input name="id" type="hidden" value={system.id} />
                  <button
                    className="inline-flex h-10 items-center justify-center rounded-[10px] border border-border px-3 text-sm font-medium text-foreground transition hover:bg-foreground/5"
                    type="submit"
                  >
                    보관
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
          <p className="status-ink text-xs text-muted">시스템 추가</p>
          <h3 className="mt-2 font-serif text-3xl text-foreground">
            새 시스템
          </h3>
        </div>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          이름
          <input
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="name"
            placeholder="지원 코파일럿"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          담당자
          <input
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="owner"
            placeholder="박민아"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          설명
          <textarea
            className="min-h-36 rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="description"
            placeholder="시스템이 무엇을 하는지와 사람이 어디에서 통제하는지 설명해주세요."
            required
          />
        </label>
        <button
          className="inline-flex h-11 items-center justify-center rounded-[10px] border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
          type="submit"
        >
          새 시스템 추가
        </button>
      </form>
    </div>
  );
}
