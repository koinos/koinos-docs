import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(
  root,
  "examples/javascript/manifest.json"
);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

for (const entry of manifest.entries) {
  const docPath = path.join(root, entry.doc);
  const lines = fs.readFileSync(docPath, "utf8").split(/\r?\n/);
  const marker = `<!-- example: ${entry.id} -->`;
  const markerIndex = lines.findIndex((line) => line.trim() === marker);

  if (markerIndex < 0) {
    if (entry.status === "active") {
      throw new Error(`Missing marker ${marker} in ${entry.doc}`);
    }
    continue;
  }

  const fenceIndex = lines.findIndex(
    (line, index) =>
      index > markerIndex &&
      index <= markerIndex + 4 &&
      /^\s*```(?:javascript|js)(?:\s.*)?$/.test(line)
  );

  if (fenceIndex < 0) {
    throw new Error(`Missing JavaScript fence after ${marker} in ${entry.doc}`);
  }

  entry.line = fenceIndex + 1;
}

fs.writeFileSync(
  manifestPath,
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
);
