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
          <p className="status-ink text-xs text-muted">증빙 원장</p>
          <h2 className="mt-2 font-serif text-4xl text-foreground">증빙</h2>
        </div>
        {evidence.length === 0 ? (
          <div className="px-6 py-10">
            <p className="font-semibold text-foreground">
              아직 등록된 증빙이 없습니다.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              답변을 입증할 정책, 명세, 문서를 추가하세요. 바이어가 묻기 전에
              증빙이 준비돼 있을수록 심사실이 강해집니다.
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
                  <p>
                    {item.type === "doc"
                      ? "문서"
                      : item.type === "policy"
                        ? "정책"
                        : "명세"}
                  </p>
                  <p>연결된 시스템 {item.linkedSystemIds.length}개</p>
                </div>
                <form action={archiveEvidenceAction}>
                  <input name="id" type="hidden" value={item.id} />
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
        action={upsertEvidenceAction}
        className="paper-panel flex flex-col gap-4 p-6"
      >
        <div className="ruled-divider pb-4">
          <p className="status-ink text-xs text-muted">증빙 추가</p>
          <h3 className="mt-2 font-serif text-3xl text-foreground">
            새 증빙 추가
          </h3>
        </div>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          제목
          <input
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="title"
            placeholder="사람 검토 운영 가이드"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          출처
          <input
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="source"
            placeholder="제품 요구사항 메모"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          유형
          <select
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="type"
          >
            <option value="doc">문서</option>
            <option value="policy">정책</option>
            <option value="spec">명세</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          강도
          <select
            className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-sm text-foreground"
            name="strength"
          >
            <option value="high">높음</option>
            <option value="medium">중간</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          연결할 시스템
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
          증빙 추가
        </button>
      </form>
    </div>
  );
}
