import { mkdirSync } from "node:fs";
import { join } from "node:path";

import Database from "better-sqlite3";

const databaseDir = join(process.cwd(), "data");
const databasePath = join(databaseDir, "proofline-auth.sqlite");

type GlobalWithAuthDatabase = typeof globalThis & {
  __prooflineAuthDatabase?: Database.Database;
};

mkdirSync(databaseDir, { recursive: true });

const globalForAuthDatabase = globalThis as GlobalWithAuthDatabase;

export const authDatabase =
  globalForAuthDatabase.__prooflineAuthDatabase ?? new Database(databasePath);

authDatabase.pragma("journal_mode = WAL");

if (!globalForAuthDatabase.__prooflineAuthDatabase) {
  globalForAuthDatabase.__prooflineAuthDatabase = authDatabase;
}
