import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "callhearsal: the silent rehearsal of a phone call, both sides included, before you dial.";
const OUT_DIR = "/output";
const OUT_FILE = "/output/entry.txt";

if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (Buffer.from(ENTRY, "utf8").toString("utf8") !== ENTRY) {
  throw new Error("entry must be valid UTF-8");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ENTRY, "utf8");
chmodSync(OUT_FILE, 0o644);

const written = readFileSync(OUT_FILE, "utf8");
if (written !== ENTRY) {
  throw new Error("verification failed: /output/entry.txt differs from entry text");
}
