import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const allowPending = process.argv.includes("--allow-pending");
const manifestPath = path.join(
  root,
  "examples/javascript/manifest.json"
);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const entries = new Map(manifest.entries.map((entry) => [entry.id, entry]));
const errors = [];
const warnings = [];
const seen = new Map();

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((item) => {
    const itemPath = path.join(directory, item.name);
    if (item.isDirectory()) return walk(itemPath);
    return itemPath.endsWith(".md") ? [itemPath] : [];
  });
}

function relative(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function findMarker(lines, fenceIndex) {
  for (let index = fenceIndex - 1; index >= Math.max(0, fenceIndex - 4); index -= 1) {
    const match = lines[index].match(
      /^\s*<!--\s*example:\s*([a-z0-9-]+)\s*-->\s*$/
    );
    if (match) return match[1];
    if (lines[index].trim() && !lines[index].trim().startsWith("<!--")) break;
  }
  return undefined;
}

function findLinks(lines, closingFenceIndex) {
  const candidates = lines
    .slice(closingFenceIndex + 1, closingFenceIndex + 9)
    .join("\n");
  return {
    source: /\[View complete file\]\(([^)]+)\)/.exec(candidates)?.[1],
    runner:
      /\[(?:Run example|Open in Codespaces|Run locally(?: on testnet)?)\]\(([^)]+)\)/.exec(
        candidates
      )?.[1],
  };
}

for (const docPath of walk(path.join(root, "docs"))) {
  const doc = relative(docPath);
  const lines = fs.readFileSync(docPath, "utf8").split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    if (!/^\s*```(?:javascript|js)(?:\s.*)?$/.test(lines[index])) continue;

    const line = index + 1;
    let closingFenceIndex = index + 1;
    while (
      closingFenceIndex < lines.length &&
      !/^\s*```\s*$/.test(lines[closingFenceIndex])
    ) {
      closingFenceIndex += 1;
    }

    if (closingFenceIndex >= lines.length) {
      errors.push(`${doc}:${line}: unclosed JavaScript fence`);
      continue;
    }

    const id = findMarker(lines, index);
    if (!id) {
      const message = `${doc}:${line}: JavaScript fence has no example marker`;
      (allowPending ? warnings : errors).push(message);
      index = closingFenceIndex;
      continue;
    }

    const entry = entries.get(id);
    if (!entry) {
      errors.push(`${doc}:${line}: marker ${id} has no manifest entry`);
      index = closingFenceIndex;
      continue;
    }

    seen.set(id, (seen.get(id) ?? 0) + 1);
    if (entry.doc !== doc) {
      errors.push(
        `${doc}:${line}: ${id} is registered for ${entry.doc}`
      );
    }
    if (entry.line !== line) {
      errors.push(
        `${doc}:${line}: ${id} manifest line is ${entry.line}; run npm run examples:lines`
      );
    }

    const body = lines.slice(index + 1, closingFenceIndex).join("\n");
    const snippet = /--8<--\s+"([^"]+)"/.exec(body)?.[1];
    const expectedSnippet = `${entry.source}:${entry.snippet}`;
    if (snippet !== expectedSnippet) {
      errors.push(
        `${doc}:${line}: ${id} must include ${expectedSnippet}, found ${snippet ?? "none"}`
      );
    }

    const links = findLinks(lines, closingFenceIndex);
    const sourceRef = entry.sourceRef ?? manifest.publishedBranch;
    const expectedSourceUrl =
      `https://github.com/koinos/koinos-docs/blob/` +
      `${sourceRef}/${entry.source}`;
    if (links.source !== expectedSourceUrl) {
      errors.push(
        `${doc}:${line}: ${id} source link must be ${expectedSourceUrl}`
      );
    }
    if (links.runner !== entry.runner.url) {
      errors.push(`${doc}:${line}: ${id} runner link does not match manifest`);
    }

    index = closingFenceIndex;
  }
}

for (const entry of manifest.entries) {
  if (entry.status !== "active") {
    if (!allowPending) errors.push(`${entry.id}: manifest entry is still pending`);
    continue;
  }

  if (seen.get(entry.id) !== 1) {
    errors.push(
      `${entry.id}: expected exactly one documentation fence, found ${seen.get(entry.id) ?? 0}`
    );
  }

  const projectPath = path.join(root, entry.project);
  const sourcePath = path.join(root, entry.source);
  const packagePath = path.join(projectPath, "package.json");
  const readmePath = path.join(projectPath, "README.md");

  for (const requiredPath of [projectPath, sourcePath, packagePath, readmePath]) {
    if (!fs.existsSync(requiredPath)) {
      errors.push(`${entry.id}: missing ${relative(requiredPath)}`);
    }
  }

  if (!fs.existsSync(packagePath)) continue;
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  for (const script of ["start", "test"]) {
    if (!packageJson.scripts?.[script]) {
      errors.push(`${entry.id}: package.json has no ${script} script`);
    }
  }

  for (const dependencyGroup of ["dependencies", "devDependencies"]) {
    for (const [name, version] of Object.entries(
      packageJson[dependencyGroup] ?? {}
    )) {
      if (/^[~^*]|[xX]|\s[|><=]/.test(version)) {
        errors.push(
          `${entry.id}: ${name} must use an exact version, found ${version}`
        );
      }
    }
  }

  if (entry.safety === "state-changing" && entry.network !== "testnet") {
    errors.push(`${entry.id}: state-changing examples must target testnet`);
  }

  if (fs.existsSync(sourcePath)) {
    const source = fs.readFileSync(sourcePath, "utf8");
    const likelyWif = /["'`](?:5[HJK]|K|L)[1-9A-HJ-NP-Za-km-z]{49,51}["'`]/;
    const likelyRecoveryPhrase =
      /(?:recovery|mnemonic|seed)\s*(?:phrase)?\s*[:=]\s*["'`][a-z]+(?:\s+[a-z]+){7,}/i;
    if (likelyWif.test(source) || likelyRecoveryPhrase.test(source)) {
      errors.push(`${entry.id}: source appears to contain secret material`);
    }
  }
}

for (const warning of warnings) console.warn(`WARN: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);

console.log(
  `Checked ${seen.size} documented JavaScript examples against ` +
    `${manifest.entries.length} manifest entries.`
);

if (errors.length) process.exitCode = 1;
