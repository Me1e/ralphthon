import { betterAuth } from "better-auth";
import { getMigrations } from "better-auth/db/migration";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { authDatabase } from "@/lib/auth-db";

export const DEMO_CREDENTIALS = {
  email: "demo@proofline.app",
  name: "Proofline Demo",
  password: "proofline-demo",
};

export const auth = betterAuth({
  appName: "Proofline",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: authDatabase,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  plugins: [nextCookies()],
  rateLimit: {
    enabled: false,
  },
});

let bootstrapPromise: Promise<void> | null = null;

export function ensureAuthReady() {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      const migrations = await getMigrations(auth.options);
      await migrations.runMigrations();

      const existingUser = authDatabase
        .prepare("select id from user where email = ? limit 1")
        .get(DEMO_CREDENTIALS.email);

      if (!existingUser) {
        await auth.api.signUpEmail({
          body: DEMO_CREDENTIALS,
        });
      }
    })();
  }

  return bootstrapPromise;
}

export function ensureAuthSeeded() {
  return ensureAuthReady();
}

export async function getServerSession() {
  await ensureAuthReady();

  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireServerSession() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}
