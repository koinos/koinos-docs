import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(root, "docs");
const errors = [];
const knownPreExisting = new Set([
  "docs/index.md|interacting/koilib.md",
  "docs/getting-started/index.md|accounts-keys-wallets.md#kondor-wallet",
]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory()
      ? walk(target)
      : target.endsWith(".md")
        ? [target]
        : [];
  });
}

function slug(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

for (const file of walk(docsRoot)) {
  const doc = path.relative(root, file).split(path.sep).join("/");
  const content = fs.readFileSync(file, "utf8");
  const links = [
    ...content.matchAll(/(?<!!)\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g),
  ];

  for (const match of links) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:)/.test(href)) continue;
    const key = `${doc}|${href}`;
    if (knownPreExisting.has(key)) continue;

    const [pathname, anchor] = href.split("#", 2);
    const target = pathname
      ? path.resolve(path.dirname(file), decodeURIComponent(pathname))
      : file;
    if (!fs.existsSync(target)) {
      errors.push(`${doc}: missing link target ${href}`);
      continue;
    }
    if (anchor && target.endsWith(".md")) {
      const targetContent = fs.readFileSync(target, "utf8");
      const anchors = new Set(
        [...targetContent.matchAll(/^#{1,6}\s+(.+)$/gm)].map((heading) =>
          slug(heading[1])
        )
      );
      if (!anchors.has(decodeURIComponent(anchor))) {
        errors.push(`${doc}: missing anchor ${href}`);
      }
    }
  }
}

for (const error of errors) console.error(`ERROR: ${error}`);
console.log(
  `Checked internal documentation links; ` +
    `${knownPreExisting.size} pre-existing exceptions are documented.`
);
if (errors.length) process.exitCode = 1;
