"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  return (
    <form
      className="paper-panel flex w-full max-w-md flex-col gap-5 p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setErrorMessage("");
        const formData = new FormData(event.currentTarget);

        const email = formData.get("email");
        const password = formData.get("password");

        if (typeof email !== "string" || typeof password !== "string") {
          setErrorMessage("미리 준비된 데모 계정을 사용해주세요.");
          return;
        }

        setIsPending(true);
        startTransition(async () => {
          const result = await authClient.signIn.email({
            email,
            password,
          });

          if (result.error) {
            setErrorMessage("로그인에 실패했습니다. 데모 계정을 사용해주세요.");
            setIsPending(false);
            return;
          }

          router.push("/questionnaires");
          router.refresh();
          setIsPending(false);
        });
      }}
    >
      <div className="ruled-divider pb-4">
        <p className="status-ink text-xs text-muted">데모 로그인</p>
        <h2 className="mt-2 font-serif text-3xl text-foreground">
          심사 데스크로 들어가기
        </h2>
      </div>

      <label
        className="flex flex-col gap-2 text-sm font-medium text-foreground"
        htmlFor="email"
      >
        이메일
        <input
          className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-base text-foreground"
          defaultValue="demo@proofline.app"
          id="email"
          name="email"
          placeholder="demo@proofline.app"
          required
          type="email"
        />
      </label>

      <label
        className="flex flex-col gap-2 text-sm font-medium text-foreground"
        htmlFor="password"
      >
        비밀번호
        <input
          className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-base text-foreground"
          defaultValue="proofline-demo"
          id="password"
          name="password"
          placeholder="proofline-demo"
          required
          type="password"
        />
      </label>

      {errorMessage ? (
        <p
          aria-live="polite"
          className="rounded-[10px] border border-blocked/35 bg-blocked/8 px-3 py-3 text-sm text-blocked"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        className="inline-flex h-12 items-center justify-center rounded-[10px] bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "로그인 중" : "로그인"}
      </button>
    </form>
  );
}
