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
          setErrorMessage("Use the seeded demo credentials.");
          return;
        }

        setIsPending(true);
        startTransition(async () => {
          const result = await authClient.signIn.email({
            email,
            password,
          });

          if (result.error) {
            setErrorMessage("Sign-in failed. Use the seeded demo account.");
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
        <p className="status-ink text-xs text-muted">Seeded login</p>
        <h2 className="mt-2 font-serif text-3xl text-foreground">
          Enter the review desk
        </h2>
      </div>

      <label
        className="flex flex-col gap-2 text-sm font-medium text-foreground"
        htmlFor="email"
      >
        Email
        <input
          className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-base text-foreground"
          defaultValue="demo@proofline.app"
          id="email"
          name="email"
          type="email"
        />
      </label>

      <label
        className="flex flex-col gap-2 text-sm font-medium text-foreground"
        htmlFor="password"
      >
        Password
        <input
          className="rounded-[10px] border border-border bg-transparent px-3 py-3 text-base text-foreground"
          defaultValue="proofline-demo"
          id="password"
          name="password"
          type="password"
        />
      </label>

      {errorMessage ? (
        <p className="rounded-[10px] border border-blocked/35 bg-blocked/8 px-3 py-3 text-sm text-blocked">
          {errorMessage}
        </p>
      ) : null}

      <button
        className="inline-flex h-12 items-center justify-center rounded-[10px] bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Signing In" : "Sign In"}
      </button>
    </form>
  );
}
