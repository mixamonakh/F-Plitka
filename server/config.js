import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseEnv } from "node:util";

export function loadContactEnv(root = process.cwd()) {
  const env = {};
  for (const file of [
    ".env",
    ".env.local",
    ".env.production",
    ".env.production.local",
  ]) {
    try {
      Object.assign(env, parseEnv(readFileSync(resolve(root, file), "utf8")));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  return { ...env, ...process.env };
}
