import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv[2];
if (!["start", "smoke"].includes(mode)) {
  throw new Error("Usage: node scripts/run-example-projects.mjs start|smoke");
}

const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "examples/javascript/manifest.json"), "utf8")
);
const projects = [...new Set(manifest.entries.map((entry) => entry.project))];

async function runProject(project) {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(root, project, "package.json"), "utf8")
  );
  if (!packageJson.scripts?.[mode]) {
    if (mode === "smoke") return;
    throw new Error(`${project} has no ${mode} script`);
  }

  const persistentBrowser =
    mode === "start" && packageJson.devDependencies?.vite !== undefined;
  const timeoutMs = persistentBrowser ? 5_000 : 45_000;
  const browserReady = (output) =>
    /http:\/\/localhost:\d+\//.test(
      output.replace(/\u001b\[[0-?]*[ -/]*[@-~]/g, "")
    );

  await new Promise((resolve, reject) => {
    const child = spawn("npm", ["run", mode, "--workspace", project], {
      cwd: root,
      detached: persistentBrowser,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    let acceptedPersistent = false;
    child.stdout.on("data", (chunk) => {
      output += chunk;
      process.stdout.write(chunk);
    });
    child.stderr.on("data", (chunk) => {
      output += chunk;
      if (!acceptedPersistent) process.stderr.write(chunk);
    });

    const timer = setTimeout(() => {
      if (persistentBrowser && browserReady(output)) {
        acceptedPersistent = true;
        process.kill(-child.pid, "SIGTERM");
        resolve();
      } else {
        if (persistentBrowser) process.kill(-child.pid, "SIGTERM");
        else child.kill("SIGTERM");
        reject(new Error(`${project} ${mode} timed out after ${timeoutMs}ms`));
      }
    }, timeoutMs);

    child.on("exit", (code, signal) => {
      clearTimeout(timer);
      if (
        persistentBrowser &&
        (acceptedPersistent ||
          (signal === "SIGTERM" && browserReady(output)))
      ) {
        resolve();
      } else if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${project} ${mode} exited with ${code ?? signal}`));
      }
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
  });
}

for (const project of projects) {
  console.log(`\n[${mode}] ${project}`);
  await runProject(project);
}

console.log(`\n${mode} verified for ${projects.length} projects.`);
