import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const allowUnmanaged = process.argv.includes("--allow-unmanaged");
const examplesRoot = path.join(root, "examples/node-operators");
const manifest = JSON.parse(
  fs.readFileSync(path.join(examplesRoot, "manifest.json"), "utf8")
);
const metadata = JSON.parse(
  fs.readFileSync(path.join(examplesRoot, "upstream/metadata.json"), "utf8")
);
const entries = new Map(manifest.entries.map((entry) => [entry.id, entry]));
const errors = [];
const warnings = [];
const seen = new Map();
const safetyClasses = new Set(manifest.safetyClasses);

if (!/^[0-9a-f]{40}$/.test(manifest.publishedRevision ?? "")) {
  errors.push("manifest publishedRevision must be a full Git commit");
} else {
  const commit = spawnSync(
    "git",
    ["cat-file", "-e", `${manifest.publishedRevision}^{commit}`],
    { cwd: root, encoding: "utf8" }
  );
  if (commit.status !== 0) {
    errors.push(
      `manifest publishedRevision is not available locally: ` +
        `${manifest.publishedRevision}`
    );
  }
}

function relative(target) {
  return path.relative(root, target).split(path.sep).join("/");
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function markerBefore(lines, fenceIndex) {
  for (
    let index = fenceIndex - 1;
    index >= Math.max(0, fenceIndex - 5);
    index -= 1
  ) {
    const match = lines[index].match(
      /^\s*<!--\s*node-example:\s*([a-z0-9-]+)\s*-->\s*$/
    );
    if (match) return match[1];
    if (lines[index].trim() && !lines[index].trim().startsWith("<!--")) break;
  }
  return undefined;
}

function linksAfter(lines, closingFenceIndex) {
  const candidates = lines
    .slice(closingFenceIndex + 1, closingFenceIndex + 10)
    .join("\n");
  return {
    source: /\[View complete file\]\(([^)]+)\)/.exec(candidates)?.[1],
    run:
      /\[(?:Run locally|Use locally|Validate locally)\]\(([^)]+)\)/.exec(
        candidates
      )?.[1],
  };
}

const governedFence =
  /^\s*```(?:bash|sh|shell|console|yaml|yml|dotenv|nginx|caddyfile)(?:\s.*)?$/i;

for (const docPath of walk(path.join(root, "docs/nodes")).filter((file) =>
  file.endsWith(".md")
)) {
  const doc = relative(docPath);
  const lines = fs.readFileSync(docPath, "utf8").split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    if (!governedFence.test(lines[index])) continue;

    let closingFenceIndex = index + 1;
    while (
      closingFenceIndex < lines.length &&
      !/^\s*```\s*$/.test(lines[closingFenceIndex])
    ) {
      closingFenceIndex += 1;
    }
    if (closingFenceIndex >= lines.length) {
      errors.push(`${doc}:${index + 1}: unclosed governed fence`);
      continue;
    }

    const id = markerBefore(lines, index);
    if (!id) {
      const message =
        `${doc}:${index + 1}: governed fence has no node-example marker`;
      (allowUnmanaged ? warnings : errors).push(message);
      index = closingFenceIndex;
      continue;
    }

    const entry = entries.get(id);
    if (!entry) {
      errors.push(`${doc}:${index + 1}: ${id} has no manifest entry`);
      index = closingFenceIndex;
      continue;
    }

    seen.set(id, (seen.get(id) ?? 0) + 1);
    if (entry.doc !== doc) {
      errors.push(`${id}: expected doc ${entry.doc}, found ${doc}`);
    }

    const body = lines.slice(index + 1, closingFenceIndex).join("\n");
    const snippet = /--8<--\s+"([^"]+)"/.exec(body)?.[1];
    const expectedSnippet = `${entry.source}:${entry.snippet}`;
    if (snippet !== expectedSnippet) {
      errors.push(
        `${doc}:${index + 1}: ${id} must include ${expectedSnippet}`
      );
    }

    const links = linksAfter(lines, closingFenceIndex);
    const expectedSource =
      `https://github.com/koinos/koinos-docs/blob/` +
      `${manifest.publishedRevision}/${entry.source}`;
    if (links.source !== expectedSource) {
      errors.push(`${id}: source link must be ${expectedSource}`);
    }
    if (links.run !== entry.runUrl) {
      errors.push(`${id}: local-run link does not match manifest`);
    }

    index = closingFenceIndex;
  }
}

const requiredFields = [
  "id",
  "status",
  "doc",
  "purpose",
  "runtime",
  "os",
  "tools",
  "baseline",
  "network",
  "role",
  "inputs",
  "expected",
  "safety",
  "source",
  "snippet",
  "runUrl",
  "liveAccess",
  "modifies",
  "automated",
];

for (const entry of manifest.entries) {
  for (const field of requiredFields) {
    if (!(field in entry)) errors.push(`${entry.id}: missing field ${field}`);
  }
  if (entry.status !== "active") {
    errors.push(`${entry.id}: manifest entry is not active`);
  }
  if (!safetyClasses.has(entry.safety)) {
    errors.push(`${entry.id}: unknown safety class ${entry.safety}`);
  }
  if (entry.baseline !== metadata.deploymentBundle.commit) {
    errors.push(`${entry.id}: baseline does not match upstream metadata`);
  }
  if (
    !entry.runUrl.includes(
      `/koinos/koinos-docs/tree/${manifest.publishedRevision}/`
    )
  ) {
    errors.push(`${entry.id}: run URL is not pinned to publishedRevision`);
  }
  if (seen.get(entry.id) !== 1) {
    errors.push(
      `${entry.id}: expected one documentation fence, found ` +
        `${seen.get(entry.id) ?? 0}`
    );
  }

  const sourcePath = path.join(root, entry.source);
  if (!fs.existsSync(sourcePath)) {
    errors.push(`${entry.id}: missing source ${entry.source}`);
    continue;
  }

  const source = fs.readFileSync(sourcePath, "utf8");
  const publishedSource = spawnSync(
    "git",
    ["show", `${manifest.publishedRevision}:${entry.source}`],
    { cwd: root, encoding: "utf8" }
  );
  if (
    publishedSource.status !== 0 ||
    publishedSource.stdout !== source
  ) {
    errors.push(
      `${entry.id}: canonical source differs from publishedRevision snapshot`
    );
  }
  const start = `[start:${entry.snippet}]`;
  const end = `[end:${entry.snippet}]`;
  if (!source.includes(start) || !source.includes(end)) {
    errors.push(`${entry.id}: missing named snippet ${entry.snippet}`);
  }

  const likelyWif = /(?:5[HJK]|K|L)[1-9A-HJ-NP-Za-km-z]{49,51}/;
  const likelyMnemonic =
    /(?:mnemonic|recovery|seed)\s*(?:phrase)?\s*[:=]\s*["'][a-z]+(?:\s+[a-z]+){7,}/i;
  const telegramToken = /\b[0-9]{8,12}:[A-Za-z0-9_-]{30,}\b/;
  const privateKeyBlock =
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/;
  const credentialAssignment =
    /(?:password|passwd|api[_-]?key|access[_-]?token|secret)\s*[:=]\s*["']?(?!REPLACE|PLACEHOLDER|CHANGEME|EXAMPLE)[A-Za-z0-9_+./=-]{12,}/i;
  if (
    likelyWif.test(source) ||
    likelyMnemonic.test(source) ||
    telegramToken.test(source) ||
    privateKeyBlock.test(source) ||
    credentialAssignment.test(source)
  ) {
    errors.push(`${entry.id}: source appears to contain secret material`);
  }

  if (entry.safety === "read-only" && entry.modifies.length !== 0) {
    errors.push(`${entry.id}: read-only example declares modifications`);
  }

  if (
    entry.safety === "state-destructive" &&
    (!/DRY RUN/.test(source) ||
      !/--apply/.test(source) ||
      !/--basedir/.test(source))
  ) {
    errors.push(
      `${entry.id}: destructive helper lacks dry-run, apply, or basedir guard`
    );
  }

  if (
    entry.safety === "irreversible-on-chain" &&
    (entry.automated || /\b(?:broadcast|burn)\b.*(?:true|yes|1)/i.test(source))
  ) {
    errors.push(`${entry.id}: irreversible example must not run automatically`);
  }
}

for (const shellPath of walk(examplesRoot).filter((file) =>
  file.endsWith(".sh")
)) {
  const result = spawnSync("bash", ["-n", shellPath], { encoding: "utf8" });
  if (result.status !== 0) {
    errors.push(`${relative(shellPath)}: Bash syntax failed: ${result.stderr}`);
  }
  const source = fs.readFileSync(shellPath, "utf8");
  if (!source.startsWith("#!/usr/bin/env bash\nset -euo pipefail\n")) {
    errors.push(`${relative(shellPath)}: missing strict Bash header`);
  }
}

for (const yamlPath of walk(examplesRoot).filter((file) =>
  /\.ya?ml$/.test(file)
)) {
  const result = spawnSync(
    "python3",
    [
      "-c",
      "import sys,yaml; yaml.safe_load(open(sys.argv[1], encoding='utf-8'))",
      yamlPath,
    ],
    { encoding: "utf8" }
  );
  if (result.status !== 0) {
    errors.push(`${relative(yamlPath)}: YAML parse failed: ${result.stderr}`);
  }
}

for (const envPath of walk(examplesRoot).filter((file) =>
  /(?:^|\/)(?:env\.example|[^/]+\.env\.example)$/.test(file)
)) {
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    if (!line.trim() || line.trim().startsWith("#")) return;
    if (!/^[A-Z][A-Z0-9_]*=/.test(line)) {
      errors.push(`${relative(envPath)}:${index + 1}: invalid dotenv entry`);
    }
  });
}

for (const markdownPath of walk(examplesRoot).filter((file) =>
  file.endsWith(".md")
)) {
  const markdown = fs.readFileSync(markdownPath, "utf8");
  for (const match of markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (
      /^(?:https?:|mailto:|#)/.test(target) ||
      target.includes("://")
    ) {
      continue;
    }
    const pathOnly = decodeURIComponent(target.split("#", 1)[0]);
    if (!pathOnly) continue;
    const resolved = path.resolve(path.dirname(markdownPath), pathOnly);
    if (!resolved.startsWith(`${root}${path.sep}`) || !fs.existsSync(resolved)) {
      errors.push(
        `${relative(markdownPath)}: missing local Markdown target ${target}`
      );
    }
  }
}

const compose = fs.readFileSync(
  path.join(examplesRoot, "upstream/docker-compose.yml"),
  "utf8"
);
const services = new Map();
let currentService;
for (const line of compose.split(/\r?\n/)) {
  const service = /^ {3}([a-z][a-z0-9_]*):$/.exec(line)?.[1];
  if (service) {
    currentService = service;
    services.set(service, []);
    continue;
  }
  const profileList = /profiles:\s*\[([^\]]+)\]/.exec(line)?.[1];
  if (currentService && profileList) {
    services.set(
      currentService,
      [...profileList.matchAll(/"([^"]+)"/g)].map((match) => match[1])
    );
  }
}

for (const required of metadata.requiredServices) {
  if (!services.has(required) || services.get(required).length !== 0) {
    errors.push(`upstream profile drift: required service ${required}`);
  }
}
for (const [profile, expectedServices] of Object.entries(metadata.profiles)) {
  const actual = [...services]
    .filter(([, profiles]) => profiles.includes(profile))
    .map(([service]) => service)
    .sort();
  const expected = [...expectedServices].sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    errors.push(
      `upstream profile drift for ${profile}: expected ${expected}, got ${actual}`
    );
  }
}

if (!allowUnmanaged) {
  const allNodeDocs = walk(path.join(root, "docs/nodes"))
    .filter((file) => file.endsWith(".md"))
    .map((file) => fs.readFileSync(file, "utf8"))
    .join("\n");
  const stalePatterns = [
    ["block_production", "stale profile name"],
    ["genesis_data.yml", "stale genesis filename"],
    ["GRPC_PORT=8090", "stale gRPC port"],
    ["$KOINOS_BASEDIR", "nonexistent basedir variable"],
  ];
  for (const [pattern, description] of stalePatterns) {
    if (allNodeDocs.includes(pattern)) {
      errors.push(`${description}: ${pattern}`);
    }
  }
  if (/\b(?:TLN|Teleno)\b/i.test(allNodeDocs)) {
    errors.push("Node Operators contains excluded product material");
  }
}

for (const warning of warnings) console.warn(`WARN: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);
console.log(
  `Checked ${seen.size} Node Operators examples against ` +
    `${manifest.entries.length} active manifest entries.`
);
if (errors.length) process.exitCode = 1;
