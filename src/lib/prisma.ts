import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import os from "os";

function setupDatabase(): string {
  // If user provided a remote database URL (e.g. Postgres / Supabase / Neon), use it
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("file:")) {
    return process.env.DATABASE_URL;
  }

  // If running in Vercel / AWS Lambda serverless environment
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDir = os.tmpdir();
    const tmpDbPath = path.join(tmpDir, "dev.db");

    if (!fs.existsSync(tmpDbPath)) {
      const candidates = [
        path.join(process.cwd(), "prisma", "dev.db"),
        path.join(process.cwd(), "dev.db"),
      ];

      for (const candidate of candidates) {
        if (fs.existsSync(/*turbopackIgnore: true*/ candidate)) {
          try {
            fs.copyFileSync(candidate, tmpDbPath);
            console.log(`[Prisma] Initialized serverless SQLite DB at ${tmpDbPath}`);
            break;
          } catch (err) {
            console.error(`[Prisma] Failed to copy from ${candidate}:`, err);
          }
        }
      }
    }

    const resolvedUrl = `file:${tmpDbPath}`;
    process.env.DATABASE_URL = resolvedUrl;
    return resolvedUrl;
  }

  // Local development / build
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "file:./dev.db";
  }
  return process.env.DATABASE_URL;
}

const dbUrl = setupDatabase();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
