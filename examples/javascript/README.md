# JavaScript documentation examples

This directory contains the complete source behind every fenced JavaScript
example in the Koinos documentation.

## Project contract

Each independently runnable example has its own directory and must contain:

- a `package.json` with exact dependency versions;
- an `npm start` script;
- an `npm test` script;
- complete JavaScript source;
- a README that states the runtime, network, safety class, inputs, and expected
  output.

Projects must not depend on files outside their own directory. This allows a
runner such as StackBlitz to import a project subdirectory directly.

## Documentation contract

Each `javascript` or `js` fence in `docs/` must:

1. have an `<!-- example: EXAMPLE_ID -->` marker;
2. include its source through `pymdownx.snippets`;
3. have a **View complete file** link;
4. have a truthful **Run example**, **Open in Codespaces**, or **Run locally**
   link;
5. have a corresponding entry in `manifest.json`.

Run the enforcement checks with:

```bash
npm run examples:verify
npm run examples:syntax
npm run examples:test
npm run examples:start
npm run examples:smoke
npm run docs:links
```

Use `npm run examples:lines` after moving an example within a Markdown page.
The permanent source and runner links use `master`, the repository's default
and publication branch. During pull-request review, exercise an equivalent URL
with the feature branch substituted; never commit a disposable branch in a
permanent documentation link.

The CI workflow installs all workspaces from the lockfile, runs every project
start command with a bound, executes tests and safe live smoke reads, builds
the browser tutorial, checks links, and builds MkDocs.

## Safety classes

- `read-only`: may query a documented public endpoint automatically.
- `dry-run`: constructs or simulates an operation and must not broadcast.
- `state-changing`: must target testnet and require explicit confirmation
  before broadcasting.
- `browser-wallet`: requires a user-controlled wallet approval and must explain
  hosted-runner limitations.
- `user-approval`: requires an explicit wallet action but does not broadcast in
  the documented project.
- `credential-required`: loads a dedicated testnet credential locally and must
  never ask for it in a hosted runner.

Never put a WIF, recovery phrase, wallet password, or production secret in an
example or public browser runner.
