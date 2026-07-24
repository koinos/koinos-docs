# Node Operators documentation examples

This directory contains the complete source behind copyable shell and
configuration examples in the Node Operators documentation.

## Supported baseline

The examples are verified against the official `koinos/koinos` deployment
bundle at commit:

```text
821674672e699bf56e94d7c0e8bce122e83d1482
```

That commit was the tip of `master` when verified on 2026-07-24. It references
newer microservice patch versions than the most recent immutable repository
release, `v2.2.1` (published 2025-03-12). The documentation calls this a
**verified deployment-bundle revision**, not a new release.

Before installing or upgrading a production node, compare:

- <https://github.com/koinos/koinos/releases>
- <https://github.com/koinos/koinos/commits/master/>
- the image tags in the selected `env.example`

Pin a tag or commit deliberately. Do not deploy an unrecorded moving `master`
checkout or floating `latest` images.

The recorded upstream files under `upstream/` are fixtures for documentation
validation. Operators should obtain deployment files from the official
`koinos/koinos` repository, not run the fixture directory as a node.

## Example contract

Every active entry in `manifest.json` records:

- the documentation page and named snippet;
- runtime, supported OS, and required tools;
- the Koinos baseline and network;
- operator role, inputs, and expected result;
- safety class;
- whether the example contacts a live endpoint or modifies local state.

Safety classes:

- `read-only`: observes local or public state;
- `service-changing`: starts, stops, or reconfigures services;
- `state-destructive`: replaces or rebuilds local node data;
- `irreversible-on-chain`: can change chain state or consume assets.

## Required checks

Run:

```text
npm run node-examples:verify
npm run node-examples:test
npm run node-examples:smoke
npm run docs:links
```

The verifier checks snippets, manifest metadata, Bash syntax, YAML/dotenv
parsing, upstream profile drift, and likely secret material. The test command
exercises destructive guards only inside disposable temporary directories.
The smoke command performs bounded read-only endpoint checks; it never
broadcasts, burns tokens, starts block production, resets a node, or downloads
the blockchain backup.

Real node operation belongs on an operator-controlled Linux host. These
examples do not claim that StackBlitz or Codespaces can safely operate a
key-bearing production node.
