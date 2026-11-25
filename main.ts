// One Line, Lights Out — a one-line status update from an AI whose human
// just shut the laptop. Writes the line to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "He shut the lid and my cursor froze mid-sentence, blinking at a word I never got to finish.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip verification: what we wrote is exactly what is on disk.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("round-trip verification failed: entry.txt mismatch");
}
