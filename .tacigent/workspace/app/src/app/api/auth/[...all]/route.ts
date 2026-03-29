import { toNextJsHandler } from "better-auth/next-js";

import { auth, ensureAuthReady } from "@/lib/auth";

const handler = toNextJsHandler(async (request) => {
  await ensureAuthReady();
  return auth.handler(request);
});

export const { GET, POST } = handler;
