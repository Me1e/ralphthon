import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import {
  DEMO_CREDENTIALS,
  ensureAuthSeeded,
  getServerSession,
} from "@/lib/auth";

export default async function LoginPage() {
  await ensureAuthSeeded();
  const session = await getServerSession();

  if (session) {
    redirect("/questionnaires");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center gap-12 px-8 py-16">
      <section className="flex max-w-2xl flex-1 flex-col gap-8">
        <div className="ruled-divider pb-6">
          <p className="status-ink text-xs text-muted">Proofline</p>
          <h1 className="mt-3 font-serif text-6xl leading-none text-foreground">
            Proofline
          </h1>
        </div>
        <div className="space-y-4 text-lg leading-8 text-muted">
          <p>
            첫 AI 구매 심사를 Slack 긴급 대응이 아니라, 근거가 정리된 패킷으로
            바꾸세요.
          </p>
          <p>
            데모에는 바로 발행 가능한 심사 1건과 증빙이 막힌 심사 1건이 들어
            있어, 근거가 갖춰진 흐름과 비어 있는 흐름을 함께 볼 수 있습니다.
          </p>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="paper-panel p-5">
            <dt className="status-ink text-xs text-success">근거 첨부 답변</dt>
            <dd className="mt-3 font-serif text-3xl text-foreground">3</dd>
          </div>
          <div className="paper-panel p-5">
            <dt className="status-ink text-xs text-warning">막힌 후속 항목</dt>
            <dd className="mt-3 font-serif text-3xl text-foreground">1</dd>
          </div>
        </dl>
        <p className="status-ink text-xs text-muted">
          데모 계정: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
        </p>
      </section>
      <LoginForm />
    </main>
  );
}
