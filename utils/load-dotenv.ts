import dotenv from "dotenv";
import fs from "fs";
import path from "path";

/**
 * Resolve .env from several likely locations so both CLI and the
 * Playwright Cursor/VS Code extension can find it (cwd can differ).
 */
const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(__dirname, "..", ".env"), 
];

const envPath = envCandidates.find((candidate) => fs.existsSync(candidate));

if (envPath) {
  dotenv.config({ path: envPath });
}
