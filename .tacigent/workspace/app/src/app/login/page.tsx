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
            Turn the first AI buyer review from a Slack fire drill into a cited
            packet.
          </p>
          <p>
            The desk is seeded with one ready review and one blocked review so
            the demo can show both proof and gaps.
          </p>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="paper-panel p-5">
            <dt className="status-ink text-xs text-success">Cited answers</dt>
            <dd className="mt-3 font-serif text-3xl text-foreground">3</dd>
          </div>
          <div className="paper-panel p-5">
            <dt className="status-ink text-xs text-warning">
              Blocked follow-up
            </dt>
            <dd className="mt-3 font-serif text-3xl text-foreground">1</dd>
          </div>
        </dl>
        <p className="status-ink text-xs text-muted">
          Demo credentials: {DEMO_CREDENTIALS.email} /{" "}
          {DEMO_CREDENTIALS.password}
        </p>
      </section>
      <LoginForm />
    </main>
  );
}
