# Koinos Documentation: Four-Chapter Consolidated Change Report

> **Internal review document.** This file is stored under `drafts/` and is not
> included in the published MkDocs site.

## 1. Purpose

This report describes the complete documentation update assigned to pgarcgo:

1. Getting Started
2. Node Operators
3. Architecture
4. Resources

It compares the consolidated result with the exact state of the shared `dev`
branch immediately before the first merge in this workstream. It also records
the pull-request lineage, cross-chapter changes, removed material, safety
decisions, source baselines, validation evidence, and the remaining integration
steps.

The report is intended to let a reviewer understand the whole update without
having to reconstruct it from the individual pull requests.

## 2. Comparison baseline and method

### 2.1 Original state

The comparison baseline is:

```text
00a8ef863e2eefa07b540d772725a5c372f1c92d
```

This is the first parent of merge commit `fe6a39c`, which merged PR #232 on
2026-07-23. It is therefore the exact `dev` tree immediately before the first
merged documentation update in this four-chapter workstream.

The baseline is deliberately not `master`. The work was assigned and developed
against `dev`, and `dev` already differed from the published branch before this
update began.

### 2.2 Current and proposed states

| State | Revision | Meaning |
| --- | --- | --- |
| Original `dev` baseline | `00a8ef8` | State before the first merge |
| Current `origin/dev` | `1ad7f58` | Includes PRs #232, #233, and #234 |
| Node Operators head | `8d1ccfd` | PR #235 |
| Architecture head | `8fd77d7` | PR #236 |
| Resources head | `4fd37da` | PR #237 |
| Consolidated branch | `codex/update-four-chapters-docs` | Current `dev` plus the three open chapter branches and this report |

### 2.3 Diff construction

The complete change set is calculated as:

1. `00a8ef8..origin/dev` for the already merged Getting Started and associated
   executable-example/testnet work;
2. `origin/dev..8d1ccfd` for Node Operators;
3. `origin/dev..8fd77d7` for Architecture;
4. `origin/dev..4fd37da` for Resources;
5. a real, conflict-free merge of the three open branch heads on top of
   `origin/dev`.

The resulting pre-report tree contains:

| Metric | Total |
| --- | ---: |
| Unique changed paths | 142 |
| Added files | 63 |
| Deleted files | 1 |
| Modified files | 78 |
| Insertions | 12,410 |
| Deletions | 5,703 |

The one deleted file is `docs/getting-started/sovrano-wallet.md`.

### 2.4 Change volume by area

| Area | Files | Insertions | Deletions |
| --- | ---: | ---: | ---: |
| Getting Started | 8 | 623 | 1,213 |
| Node Operators | 12 | 2,002 | 690 |
| Legacy Validators compatibility pages | 9 | 54 | 677 |
| Architecture | 20 | 1,036 | 801 |
| Resources | 7 | 574 | 281 |
| Other public documentation | 25 | 595 | 1,996 |
| Internal drafts and evidence | 17 | 2,080 | 0 |
| Executable JavaScript examples | 33 | 2,333 | 0 |
| Verification scripts | 6 | 1,812 | 0 |
| GitHub workflow | 1 | 44 | 0 |
| Root configuration and dependency files | 4 | 1,257 | 45 |

“Other public documentation” includes the explicitly authorized
cross-chapter executable-example and REST/testnet updates, plus the narrow home
page Resources link.

## 3. Pull-request history and current status

| PR | Title | State | Role in the consolidated update |
| --- | --- | --- | --- |
| #231 | Modernize Getting Started documentation | Closed, unmerged | Superseded by #232 |
| #232 | Make JavaScript examples executable | Merged into `dev` | Getting Started rewrite plus executable-example framework |
| #233 | Fix Getting Started example links | Merged into `dev` | Makes development-branch source and runner links usable |
| #234 | Refresh REST and public testnet guidance | Merged into `dev` | Follow-up correction of stale REST/testnet material |
| #235 | Simplify and correct Node Operators procedures | Open draft | Consolidated here |
| #236 | Rebuild Architecture chapter | Open draft | Consolidated here |
| #237 | Update Resources documentation | Open draft | Consolidated here |

All three open PRs were based on `origin/dev` revision `1ad7f58`. Before
consolidation, GitHub reported all three as clean and mergeable, with successful
GitHub verification and Netlify deploy-preview checks.

## 4. Chapter 1: Getting Started

### 4.1 Original problems

The baseline mixed introductory material with promotional or invented claims,
obsolete network information, incorrect commands, unsupported packages, and
outdated wallet instructions. Important examples included:

- Harbinger was presented as the public testnet.
- Testnet configuration encouraged fixed values even though the network can
  reset.
- The CLI page described npm installation and command forms that do not belong
  to the official Go-based Koinos CLI.
- Kondor instructions included obsolete extension/platform information.
- Tooling pages referred to nonexistent or incorrectly named packages.
- Sovrano occupied a complete wallet page despite lacking suitable current
  evidence for inclusion.
- JavaScript pages contained partial snippets without a canonical complete
  executable file.
- Several examples used stale APIs, placeholders, or unsafe mainnet-oriented
  transaction guidance.

### 4.2 Public Getting Started pages

| Page | Change |
| --- | --- |
| `docs/getting-started/index.md` | Replaced the broad promotional landing page with task-based entry points for learning, wallet setup, and development. Added a complete read-only KOIN balance example, source link, runnable project, key-safety warning, concise concept table, and official entry points. |
| `docs/getting-started/what-is-koinos.md` | Reframed the introduction around verifiable protocol concepts: Mana, WebAssembly, upgradeable system contracts, Proof of Burn, microservices, and network types. Removed unsupported benefits and marketing claims. |
| `docs/getting-started/accounts-keys-wallets.md` | Defined accounts, addresses, public/private keys, WIF, recovery phrases, wallet responsibilities, programmable authority, sharing rules, backup guidance, and network verification. |
| `docs/getting-started/mainnet-vs-testnet.md` | Replaced Harbinger-era guidance with the current Koinos Foundation public testnet. Added current JSON-RPC/REST/health paths, live read-only Koilib examples, dynamic chain-ID retrieval, Telegram faucet workflow, reset warnings, and separate mainnet/testnet safety rules. |
| `docs/getting-started/kondor-wallet.md` | Updated the page for Kondor 2 and the current Chrome extension. Covered verified installation, creation/import, sending, network selection, dApp approval, encrypted backup, recovery limitations, and current troubleshooting. Removed obsolete Firefox and legacy browser-global guidance. |
| `docs/getting-started/cli-wallet.md` | Replaced invented npm-style CLI usage with the official Go CLI release/build path and its interactive commands. Documented connection, wallet creation/import, balances, transfers, ABI registration, sessions, testnet use, terminal-history risks, and WIF/password handling. |
| `docs/getting-started/tooling-overview.md` | Reorganized tools by purpose. Corrected Koilib, Kondor, Koinos CLI, AssemblyScript SDK/CLI, C++ SDK, Arkinos package naming, endpoints, explorer use, and official/community ownership. Added complete executable Koilib and Kondor examples. |
| `docs/getting-started/sovrano-wallet.md` | Deleted. All tracked Sovrano navigation entries and Getting Started cross-references were removed. |

### 4.3 Executable JavaScript example system

PR #232 expanded beyond Getting Started because the approved rule applies to
all active JavaScript examples: every displayed snippet must have one canonical
complete source file and a truthful execution path.

The merged framework provides:

- 50 inventoried active examples across 20 documentation pages;
- seven self-contained projects under `examples/javascript/`;
- exact dependency versions and npm workspaces;
- checked PyMdown snippet inclusion from canonical source files;
- complete-source links and runner/local-run instructions;
- unit tests, clean-start checks, and live read-only smoke tests;
- a machine-readable manifest recording source, page, runtime, network, safety
  class, dependencies, project, runner, and canonical section;
- syntax, manifest, link, start, test, and smoke verification scripts;
- CI execution on documentation/example changes and on pushes to `dev` and
  `master`.

The seven projects are:

| Project | Purpose |
| --- | --- |
| `browser/kondor-dapp` | Browser wallet detection, connection, and local message signing with explicit user approval |
| `contracts/testnet-contract-client` | Testnet contract interaction client with dry-run/default safety |
| `getting-started/network-provider` | Read mainnet and public-testnet chain information |
| `getting-started/read-koin-balance` | Read a public KOIN balance without a secret |
| `interacting/read-only-queries` | Complete read-only query examples |
| `references/koilib-api-tour` | Verified Koilib provider, signer, transaction, contract, serializer, and utility behavior |
| `testnet/transaction-workflows` | Testnet transaction construction and optional, explicitly gated broadcast workflows |

Safety decisions include:

- mainnet examples are read-only;
- transaction/deployment examples target the current public testnet;
- state-changing projects default to dry-run;
- testnet broadcast requires both `BROADCAST=true` and a locally supplied
  `TESTNET_WIF`;
- no hosted runner requests a WIF, private key, recovery phrase, wallet
  password, or production secret;
- Kondor approvals remain separate user gestures;
- the faucet is documented but Telegram credentials and faucet-account access
  are not automated.

### 4.4 Cross-chapter pages changed by the example rollout

These changes were explicitly authorized to replace or support JavaScript
examples; they are not general rewrites of the chapters assigned to Julián.

| Area | Files | Purpose |
| --- | --- | --- |
| Smart contracts | `docs/contracts/quick-start.md` | Replaced incomplete JavaScript with the complete testnet contract-client project and safe execution guidance. |
| Common Tasks | `docs/exchanges/transfer.md` | Replaced transaction snippets with the canonical testnet workflow and clear broadcast controls. |
| Governance | `docs/governance/submit-proposal.md` | Replaced proposal snippets with dry-run/testnet-safe source. |
| Interacting | `kondor-wallet.md`, `multiple-operations.md`, `quick-start.md`, `read-contract-data.md`, `rest-api.md`, `submit-transaction.md`, `testnet.md`, `tutorials/frontend-guide.md` | Connected all active examples to complete source, reduced duplicate partial code, corrected current APIs, and applied testnet/dry-run safety. |
| Koilib reference | `contract-class.md`, `provider-class.md`, `serializer-class.md`, `signer-class.md`, `transaction-class.md`, `util-functions.md` | Replaced placeholder behavior with verified Koilib 9.2.0 exports and canonical example sections. |

### 4.5 Development-link correction

PR #233 corrected a post-merge problem: the new source and StackBlitz links
initially targeted `master`, where the example files did not yet exist.

The five affected Getting Started links and their manifest entries now use
`dev`. Other examples retained their prior published-source policy. This made
the Getting Started source files and runners testable from the development
deployment without pointing permanent links at a disposable feature branch.

### 4.6 REST and public-testnet follow-up

PR #234 was a separate but related correction after the Getting Started merge.
It applied only the still-valid parts of the older PR #230 to the newer `dev`
tree:

- current mainnet and public-testnet REST/JSON-RPC endpoints;
- transaction preparation with an explicit statement that preparation does not
  sign or broadcast;
- the current testnet server in the embedded Swagger document;
- current public-testnet and Telegram faucet guidance;
- dynamic testnet chain-ID lookup for offline signing;
- current REST and multisig connection guidance;
- warnings against reusing historical serialized transactions, nonces,
  signatures, resource values, or chain IDs.

Changed paths:

- `docs/developers/index.md`
- `docs/developers/rest.md`
- `docs/developers/swagger.json`
- `docs/developers/testnet.md`
- `docs/exchanges/multisig.md`
- `docs/exchanges/offline-signing.md`
- `docs/exchanges/rest.md`

### 4.7 Getting Started workstream impact

The complete baseline-to-current-`dev` change is:

```text
75 files changed, 5,228 insertions, 3,207 deletions
```

Breakdown:

| Change | Files | Insertions | Deletions |
| --- | ---: | ---: | ---: |
| PR #232 | 68 | 5,060 | 3,138 |
| PR #233 | 5 | 22 | 16 |
| PR #234 | 7 | 162 | 69 |

Some paths appear in more than one PR, so the PR file counts are not additive.

## 5. Chapter 2: Node Operators

### 5.1 Original problems

The baseline mixed short, incomplete operator notes with speculative
configuration and generated helper-oriented material. It did not provide a
reliable end-to-end production path. Important gaps included:

- unsafe or ambiguous use of Compose profiles, including `all`;
- no concise standard-node happy path;
- unverified hardware/storage numbers;
- weak synchronization and health criteria;
- peer detection that could confuse the node's own address with a connected
  peer;
- a permanent `RestartCount == 0` expectation rather than restart-loop
  detection;
- incomplete firewall activation/recovery checks;
- incomplete update rollback when using `/opt/koinos-next`;
- no executable checksum- and path-safe public-backup restore;
- insufficient separation of wallet authority, producer keys, and P2P identity;
- duplicated content under the old `validators/` URL space;
- audit-style or invented terminology that did not match normal operator
  language.

### 5.2 Operator pages

| Page | Change |
| --- | --- |
| `docs/nodes/index.md` | Rebuilt the landing page around standard nodes, public API nodes, and block producers. Added task cards, role/service/exposure/risk guidance, versioned baseline, and a warning that `all` includes block production. |
| `docs/nodes/requirements.md` | Replaced stale fixed requirements with role-based planning starts, measured disk evidence, Ubuntu/Linux scope, Docker/SSD/time/bandwidth requirements, direct host checks, and measurement-based tuning. |
| `docs/nodes/running-node.md` | Added the complete standard-node happy path: host preparation, immutable release/commit selection, official configuration, validation/start, synchronization interpretation, service/restart checks, fresh/advancing head checks, gossip and peer checks, disk checks, and clean stop/start. |
| `docs/nodes/networks.md` | Added explicit separation of mainnet, the current public testnet, and legacy Harbinger. Documented the lack of a verified external-operator bundle for the current testnet and added direct chain-ID/head checks. |
| `docs/nodes/docker-profiles.md` | Documented required services and each verified optional profile. Replaced `all` as a quick start with least-profile guidance and explicit service inspection. |
| `docs/nodes/microservices.md` | Added an operator-oriented service matrix covering purpose, required/optional status, profiles, and default host bindings. Linked deeper behavior to Architecture. |
| `docs/nodes/configuration.md` | Tied `.env`, Compose, YAML, genesis, descriptors, and RabbitMQ files to the selected official revision. Added versioned discovery for options, environment, services, profiles, service `--help`, and `multiaddr`, plus one-change and upgrade-drift procedures. |
| `docs/nodes/rpc-node.md` | Reframed the page as a public API node procedure. Added loopback bindings, local JSON-RPC/REST/gRPC verification, UFW recovery access and activation, nginx/TLS/CORS/rate/timeout configuration, and external two-location exposure verification. |
| `docs/nodes/block-production.md` | Added concise PoB/VHP concepts without executable irreversible burns. Separated wallet authority from the hot producer key, verified current inputs, documented producer configuration, required independent block verification, and added disable/key-rotation procedures. |
| `docs/nodes/security.md` | Added exposure-by-purpose, host/account controls, API boundaries, supply-chain/change controls, key separation, encrypted backups, and incident readiness. |
| `docs/nodes/management.md` | Rebuilt routine health, clean service control, executable update/rollback, reindex, resync, restore selection, rollback-copy preservation, and incident evidence procedures. |
| `docs/nodes/backup-restore.md` | Added a complete public-mainnet-backup procedure with capacity planning, metadata/checksum download, archive traversal/link validation, chain-ID verification, stopped-state preservation, selective extraction, block verification, validation, and executable rollback. |

### 5.3 Corrected functional checks

The final procedures specifically correct four previously identified functional
problems:

1. **Peer detection:** only entries under `Connected peers` count. The node's
   `My address` line cannot satisfy the check.
2. **Restart health:** the procedure compares service/container/restart
   snapshots over 30 seconds. A stable historical nonzero count is allowed;
   an increasing count, missing service, non-running state, recreation, or loop
   fails.
3. **UFW activation:** recovery SSH is tested in a second session before
   activation; UFW is explicitly enabled; status, listeners, and external
   exposure are verified.
4. **Update rollback:** both `/opt/koinos` and `/opt/koinos-next` use explicit
   Compose project name `koinos`, preventing an accidental second
   `koinos-next` project. Exact activation and rollback commands are included.

### 5.4 Safety protections

The Node Operators update preserves these boundaries:

- no `--profile all` quick start;
- no executable KOIN burn, producer-registration, or other irreversible
  transaction;
- Harbinger is not described as the current public testnet;
- checksums, archive-member paths, chain IDs, and restored blocks are verified;
- existing data is moved to rollback copies rather than deleted;
- wallet/producer authority is separated from P2P identity;
- producer output is verified by exact block ID locally and independently;
- update, restore, reindex, and resync procedures have executable rollback;
- public helper scripts or documentation-owned operator tools are not added.

### 5.5 Legacy URL compatibility

Nine former `docs/validators/` pages are reduced to concise compatibility pages
that direct readers to the maintained Node Operators locations:

- `validators/index.md`
- `validators/configuration.md`
- `validators/docker-compose-profiles.md`
- `validators/microservices.md`
- `validators/node-management.md`
- `validators/node-requirements.md`
- `validators/node-security.md`
- `validators/guides/block-production.md`
- `validators/guides/running-a-node.md`

This removes duplicated instructions while retaining useful old URLs.

### 5.6 Command verification

`scripts/verify-node-operator-commands.mjs` was added and exposed through
`npm run node-commands:verify`. It verifies documented blocks, ordering,
expected safeguards, and negative fixtures, including:

- own-address-only P2P logs;
- increasing restart counts and restart-loop states;
- missing firewall confirmation/activation;
- incorrect Compose project handling during update/rollback;
- backup checksum and archive safety;
- chain-ID, block, key, and data-preservation rules.

The source PR validation covered 90 command blocks and 455 assertions.

### 5.7 Node Operators impact

```text
25 files changed, 3,451 insertions, 1,389 deletions
```

This includes 12 maintained Node Operators pages, nine legacy compatibility
pages, navigation, the command verifier, the package script, and the CI step.

## 6. Chapter 3: Architecture

### 6.1 Original problems

The baseline Architecture chapter had an incomplete structure:

- the microservices overview was not properly exposed in navigation;
- individual service pages existed as empty placeholders;
- REST was absent;
- messaging was described too narrowly;
- Proof of Burn and Resources contained historical formula/parameter detail
  that was difficult to maintain and easy to misapply;
- ABI, system calls, smart contracts, and serialization mixed implementation
  detail with incomplete or stale explanations;
- operational instructions and system-contract internals were not consistently
  separated from architecture;
- sources were not consistently tied to one coherent versioned deployment.

### 6.2 Public architecture pages

| Page | Change |
| --- | --- |
| `docs/architecture/index.md` | Rebuilt as a task-oriented architecture hub covering services, messaging, runtime, ABI/serialization, system calls, resource accounting, and Proof of Burn. Added a coherent source baseline. |
| `docs/architecture/microservices.md` | Added the complete official service topology, Mermaid overview, required/optional service table, state ownership, consistency meaning, and internal/external boundaries. |
| `docs/architecture/interprocess-communication.md` | Reframed as internal messaging through RabbitMQ/AMQP. Distinguished RPC from broadcasts, added routing diagrams, and explained delivery, redelivery, fork, lag, and non-atomic database behavior. |
| `docs/architecture/smart-contracts.md` | Explained the Chain/WASM execution boundary, read-only versus transaction calls, state commits, nested calls, logs/events, forks, and user/system contract separation. |
| `docs/architecture/contract-abi.md` | Defined method records, entry points, protobuf argument/result types, read-only metadata, descriptor sets, tool usage, and the limitation that an ABI does not validate implementation behavior. |
| `docs/architecture/system-calls.md` | Defined system calls, native thunks, system-contract overrides, capability groups, determinism, authority, and the consensus/security boundary. |
| `docs/architecture/serialization.md` | Expanded protobuf coverage across protocol objects, RPC, broadcasts, runtime, and ABI. Distinguished schema from wire data and explained signed/hashed canonicity risks. |
| `docs/architecture/resources.md` | Replaced difficult-to-maintain formula detail with the stable compute/network/disk model, account RC/mana, payer semantics, block limits, resource markets, and Architecture/Operations/System Contracts boundaries. |
| `docs/architecture/proof-of-burn.md` | Replaced historical parameters and executable implications with KOIN-to-VHP, effective VHP, VRF/eligibility, VHP consumption/replenishment, and service/system-contract responsibility boundaries. |

### 6.3 Individual microservice pages

Every service page uses a common structure: purpose, dependencies/inputs,
outputs/RPC or broadcasts where applicable, state ownership, failure and
consistency meaning, and immutable source links.

| Service | Architectural coverage |
| --- | --- |
| Chain | Consensus validation, transaction/block execution, fork choice, canonical state, service queries, and broadcasts |
| Block Store | Durable blocks/receipts, lookup interfaces, synchronization use, BadgerDB ownership, and the distinction between stored and canonical |
| P2P | Peer protocols, gossip, synchronization, local validation of received data, peer identity, and the node-to-node boundary |
| Mempool | Pending transactions, nonce/RC reservations, fork-aware transient state, producer input, and invalidation/expiry behavior |
| Transaction Store | Transaction lookup as a derived BadgerDB index that may lag or follow fork changes |
| Block Producer | Optional candidate assembly/signing/submission, dependencies, authority boundary, and the fact that Chain still validates/canonicalizes |
| JSON-RPC | HTTP/protobuf translation, descriptor use, routing, allow/deny configuration, target-service availability, and uncertain timeout semantics |
| gRPC | Typed external protobuf gateway, exposed-service scope, schema compatibility, target-service state, and retry differences |
| REST | Current REST/OpenAPI layer backed by JSON-RPC, transformation/caching layers, downstream dependencies, and freshness limitations |
| Contract Meta Store | Derived ABI/metadata index, lag/fork behavior, and non-authoritative meaning |
| Account History | Fork-aware per-account derived history, catch-up dependencies, pagination caveats, and non-authoritative balance/nonce meaning |

### 6.4 Versioned technical baseline

The public Architecture chapter is grounded in:

- official `koinos/koinos` deployment commit
  `821674672e699bf56e94d7c0e8bce122e83d1482`;
- the coherent service image versions selected by that deployment;
- `koinos-proto` v2.6.0;
- current official Chain, PoB, VHP, resource-contract, ABI, and service
  repositories at immutable tags or commits.

Historical Koinos One microservice documents were used only as structural
research. Knodel/Windows procedures, GarageMQ details, stale versions, ports,
seed addresses, storage estimates, recovery steps, and unverified performance
claims were not imported.

### 6.5 Internal foundation

Fifteen tracked files under `drafts/architecture/` preserve the research and
future editorial plan outside the public MkDocs tree:

- `ARCHITECTURE_DOCUMENTATION_PLAN.md`;
- microservices `README.md`;
- internal messaging and overview drafts;
- service drafts for Chain, Block Store, P2P, Mempool, Transaction Store,
  Block Producer, JSON-RPC, gRPC, REST, Contract Meta Store, and Account
  History.

The drafts are explicitly marked internal/not published and retain verification
notes that would be distracting in the end-user journey.

### 6.6 Deliberately excluded or delegated material

- Node commands, ports, backup/restore, and production workflows remain under
  Node Operators.
- Privileged contract implementation detail remains under System Contracts.
- Contract build/deploy procedures remain under Smart Contract Development.
- No executable irreversible PoB transaction was added.
- Teleno, TLN, and monolithic-node architecture are outside this chapter.
- Historical consensus parameters and unverified performance claims were not
  restored.

### 6.7 Architecture impact

```text
36 files changed, 2,380 insertions, 818 deletions
```

This includes 20 public Architecture pages, 15 internal draft/foundation files,
and navigation.

## 7. Chapter 4: Resources

### 7.1 Original problems

The baseline Resources section mixed unrelated directory categories, repeated
child-page content on the landing page, and contained unverified or invented
project descriptions. Important examples included:

- no substantive wallets page;
- Harbinger-era explorer/network information;
- nonexistent or unsupported Python, Go, and Rust high-level SDK claims;
- incorrect invented meanings for KCS-3, KCS-4, and KCS-5;
- promotional descriptions without ownership, source, network, or limitation
  evidence;
- no clear distinction between official, community-maintained, and third-party
  projects;
- no process for reporting stale entries or proposing additions;
- possible confusion between the Resources directory and Architecture's
  Resource Credits/Mana model.

### 7.2 Public Resources pages

| Page | Change |
| --- | --- |
| `docs/resources/index.md` | Rebuilt as a concise task-based directory. Distinguished it from Architecture Resources, explained ownership classifications and non-endorsement, and linked user, developer, community, and related-documentation paths without duplicating child pages. |
| `docs/resources/wallets.md` | Completed the empty page with factual Kondor and Tangem comparison, command-line-wallet section, kcli evidence/limitations, Koinos CLI cross-reference, and recovery phrase/WIF/private-key warnings. |
| `docs/resources/explorers.md` | Removed Harbinger and stale explorer assumptions. Added verified mainnet entries for Koinosblocks, KoinosScan, and Koinscan; distinguished ownership, source/API evidence, network support, beta/lag/finality limitations, and current-testnet authority. |
| `docs/resources/ecosystem-platforms.md` | Reorganized verified live entries into exchange, bridge, community applications, block-production pools, and node software. Added neutral KoinDX, Vortex Bridge, Koin Krew, Fogata, BurnKoin, Koinos One, and Teleno entries with ownership/source/release limitations. |
| `docs/resources/software-libraries.md` | Preserved the URL but reframed the page as SDKs, libraries, and developer tools. Organized Koilib, AssemblyScript SDK/CLI, C++ SDK, Koinos CLI, local testnet, Mock VM, and koinos-proto by task with verified versions/commits. Removed unsupported high-level SDK claims. |
| `docs/resources/contract-standards.md` | Rebuilt from the canonical standards repository. Recorded exact titles and statuses for KCS-1 through KCS-5, immutable reviewed sources, latest links, concise purposes, and separation from governance proposals. |
| `docs/resources/community-and-learning.md` | Added official sources, Telegram/Discord/X, articles/videos, chapter learning paths, secret-handling cautions, stale-documentation reporting instructions, and evidence requirements for proposing a Resources entry. |
| `docs/index.md` | Made Resources discoverable from the home page by separating the previous combined References/Resources card into distinct destinations. |

### 7.3 Wallet decisions

- **Kondor:** community-maintained Chromium extension; maintainer and source are
  identified; current install source and network/signing checks are emphasized.
- **Tangem:** included only after its current canonical asset page confirmed
  Koinos support; classified third-party; no unsupported dApp or open-source
  claim is made.
- **kcli:** included as a community-maintained command-line wallet after source,
  build, command-surface, mainnet, and current-testnet review.
- **Koinos CLI:** cross-linked primarily as a developer/terminal tool.
- **Sovrano:** not restored.

The kcli entry records version `1.4.0` at commit `c263df6`, source-only
installation, command-line/terminal secret exposure, production dependency
advisories, and the verified risk that a saved mainnet RPC can override a
`--network testnet` label. No state-changing kcli command was executed during
verification.

### 7.4 Explorer decisions

- **Koinosblocks:** community-maintained mainnet explorer with public source;
  no undocumented API claim.
- **KoinosScan:** community-maintained mainnet explorer/analytics platform led
  by interfecto. Documents search, recent blocks/transactions/producers,
  KOIN/VHP balances and holders, transfers, distributions, historical claim
  analytics, immutable Token Tracker source, public indexer API scope, and
  intentional indexing through the last irreversible block.
- **Koinscan:** third-party mainnet explorer, labeled early beta; no public
  source/API/testnet support inferred.
- **Current public testnet:** no graphical explorer claimed. The official
  `koinos/koinos-testnet` repository remains the authority.

The previous assumption that KoinosScan was stale was corrected: the observed
height difference matched its deliberate approximately 60-block LIB indexing
policy.

### 7.5 Ecosystem decisions

The Koinos website and website PR #142 were treated only as discovery sources.
Every candidate was checked independently.

Included projects use neutral descriptions and explicit classifications.
Directory text makes no claim about security, audits, liquidity, returns,
rewards, uptime, performance, reliability, or endorsement.

Koinos One and Teleno are described as community-led experimental alternatives;
the official microservice-based Koinos node remains the production reference.
Kollection and other candidates without a consistently reachable current
application or sufficient evidence remain excluded from the live directory.

### 7.6 Developer tool and KCS corrections

- Koilib 9.2.0 is community-maintained and linked to reviewed source.
- Official AssemblyScript SDK 1.4.0 and SDK CLI 1.0.2 are separated.
- The C++ SDK is described from its current release.
- Koinos CLI v2.0.0 is presented as state-capable terminal tooling.
- Local testnet and Mock VM are distinguished from the public testnet.
- Generated protobuf bindings are not presented as complete high-level SDKs.
- Supposed Python, Go, Rust, and other unsupported high-level SDKs were removed.
- KCS-1 to KCS-3 are recorded as Final; KCS-4 and KCS-5 as Pending at the
  reviewed canonical commit.
- The invented “DEX,” “staking,” and “governance token” descriptions for
  KCS-3/4/5 were removed.

### 7.7 Internal plan and inventory

Two tracked files remain outside the published site:

- `drafts/resources/RESOURCE_DOCUMENTATION_PLAN.md`
- `drafts/resources/RESOURCE_INVENTORY.md`

The inventory records category, maintainer, ownership, canonical URL,
repository/version evidence, network, verification date, inclusion decision,
and limitations for included and excluded candidates.

### 7.8 Resources impact

```text
11 files changed, 1,352 insertions, 290 deletions
```

This includes seven Resources pages, one narrow home-page change, two internal
files, and navigation.

## 8. Cross-cutting repository changes

### 8.1 Navigation

The consolidated `mkdocs.yml`:

- removes Sovrano from Getting Started;
- exposes the maintained Node Operators sequence, including Networks and Backup
  and restore;
- removes the duplicate Validators navigation;
- restores the Microservices overview and Internal messaging to Architecture;
- nests all 11 service pages, including REST;
- groups Architecture runtime, resource, and Proof-of-Burn content;
- organizes Resources into user, developer, and community paths.

All three open branches modified `mkdocs.yml`. The real consolidated merge
resolved those edits automatically and preserved all three navigation changes.

### 8.2 CI and local verification

The documentation workflow now runs:

```text
npm run examples:verify
npm run examples:syntax
npm run examples:test
npm run examples:start
npm run examples:smoke
npm run node-commands:verify
npm run docs:links
mkdocs build
```

The workflow uses a full Git history so immutable example/source snapshots can
be checked.

### 8.3 Source policy

Across the four chapters:

- current first-party or canonical sources are preferred;
- version-dependent technical claims use immutable tags or commits;
- canonical current links are also provided where useful;
- resettable testnet values are queried rather than treated as permanent;
- ownership and maintenance are stated rather than inferred;
- historical material is used only when current official sources verify it;
- the documentation does not claim that inclusion is an endorsement or audit.

### 8.4 Safety policy

The consolidated documentation consistently:

- avoids production secrets in examples;
- keeps mainnet JavaScript read-only;
- gates testnet state changes explicitly;
- avoids executable irreversible burns or authority changes;
- separates wallet, producer, and peer identities;
- requires chain-ID and endpoint verification;
- preserves data and rollback paths;
- validates external archives before extraction;
- treats public/community tools as independently operated and potentially
  delayed, unavailable, or unsafe.

## 9. Validation evidence

### 9.1 Source pull requests

The original source PRs reported successful:

- JavaScript syntax, manifest, unit, start, and smoke checks;
- 50-example inventory verification;
- Node command verifier with 90 blocks and 455 assertions;
- documentation link checks;
- normal MkDocs builds;
- `git diff --check`;
- immutable source-link audits;
- external URL checks with bounded timeouts and manual follow-up where
  automated access was rejected;
- desktop and mobile visual review;
- GitHub Actions verification;
- Netlify deploy previews.

### 9.2 Known pre-existing strict-build warnings

The source branches consistently identified two `origin/dev` warnings outside
this work:

1. `mkdocs.yml` references missing `exchanges/jsonrpc.md`.
2. `docs/index.md` links to missing `interacting/koilib.md`.

They were not introduced by these chapter updates.

### 9.3 Consolidated-branch validation

The complete combined tree passed:

- clean dependency installation with `npm ci --ignore-scripts`;
- JavaScript syntax checks for the verification scripts;
- `npm run examples:verify`: 50 documented examples matched 50 manifest
  entries;
- `npm run examples:syntax`: 22 JavaScript files;
- `npm run examples:test`: 23 tests passed across seven workspaces;
- `npm run examples:start`: all seven projects started successfully;
- `npm run examples:smoke`: all seven projects passed, including live read-only
  mainnet and current-public-testnet checks;
- `npm run node-commands:verify`: 90 command blocks and 455 assertions;
- `npm run docs:links`: passed with the two documented pre-existing
  exceptions;
- normal MkDocs build: passed;
- generated-site scan: no Architecture draft, Resources draft, or report
  content appeared in the site output;
- `git diff --check`: passed.

The strict MkDocs build stopped only on the same two pre-existing warnings
listed above. It introduced no new strict-build warning.

The combined navigation and representative landing/detail pages were also
reviewed locally at desktop and mobile widths before delivery. The final
remote GitHub and deploy-preview checks are recorded in the consolidated pull
request.

## 10. Merge and review considerations

### 10.1 Why the consolidated PR cannot show Getting Started as a new diff

Getting Started and its executable-example support are already present in
`dev` through PRs #232–#234. GitHub compares the final tree of the head with the
current base tree; it does not show identical files as changed merely because a
new branch contains their history.

Therefore:

- the consolidated PR's **Files changed** view shows Node Operators,
  Architecture, Resources, and this report;
- this report records the complete four-chapter comparison back to `00a8ef8`;
- merging the consolidated PR once will leave `dev` with all four completed
  chapters.

Reverting or force-resetting `dev` only to make Getting Started reappear in the
PR diff would add risk without changing the intended final content.

### 10.2 Integration simulation

Before creating the consolidated branch:

- each pair of #235, #236, and #237 was merged virtually without conflict;
- all three were merged virtually without conflict;
- the real consolidated branch then merged all three cleanly;
- the resulting pre-report tree matched the simulated combined tree exactly.

### 10.3 Review order

A practical review order is:

1. Getting Started sections in this report and the already merged PRs
   #232–#234;
2. Node Operators, because it establishes the production/operator vocabulary;
3. Architecture, because it explains the same services without operational
   commands;
4. Resources, because it links to the other chapters and classifies external
   projects;
5. navigation, cross-links, CI, and this report.

## Appendix A: Exact changed public documentation paths

### A.1 Already merged baseline-to-`dev` paths

```text
docs/contracts/quick-start.md
docs/developers/index.md
docs/developers/rest.md
docs/developers/swagger.json
docs/developers/testnet.md
docs/exchanges/multisig.md
docs/exchanges/offline-signing.md
docs/exchanges/rest.md
docs/exchanges/transfer.md
docs/getting-started/accounts-keys-wallets.md
docs/getting-started/cli-wallet.md
docs/getting-started/index.md
docs/getting-started/kondor-wallet.md
docs/getting-started/mainnet-vs-testnet.md
docs/getting-started/sovrano-wallet.md (deleted)
docs/getting-started/tooling-overview.md
docs/getting-started/what-is-koinos.md
docs/governance/submit-proposal.md
docs/interacting/kondor-wallet.md
docs/interacting/multiple-operations.md
docs/interacting/quick-start.md
docs/interacting/read-contract-data.md
docs/interacting/rest-api.md
docs/interacting/submit-transaction.md
docs/interacting/testnet.md
docs/interacting/tutorials/frontend-guide.md
docs/references/koilib/contract-class.md
docs/references/koilib/provider-class.md
docs/references/koilib/serializer-class.md
docs/references/koilib/signer-class.md
docs/references/koilib/transaction-class.md
docs/references/koilib/util-functions.md
```

### A.2 Node Operators paths

```text
docs/nodes/backup-restore.md
docs/nodes/block-production.md
docs/nodes/configuration.md
docs/nodes/docker-profiles.md
docs/nodes/index.md
docs/nodes/management.md
docs/nodes/microservices.md
docs/nodes/networks.md
docs/nodes/requirements.md
docs/nodes/rpc-node.md
docs/nodes/running-node.md
docs/nodes/security.md
docs/validators/configuration.md
docs/validators/docker-compose-profiles.md
docs/validators/guides/block-production.md
docs/validators/guides/running-a-node.md
docs/validators/index.md
docs/validators/microservices.md
docs/validators/node-management.md
docs/validators/node-requirements.md
docs/validators/node-security.md
```

### A.3 Architecture paths

```text
docs/architecture/contract-abi.md
docs/architecture/index.md
docs/architecture/interprocess-communication.md
docs/architecture/microservices.md
docs/architecture/microservices/account-history.md
docs/architecture/microservices/block-producer.md
docs/architecture/microservices/block-store.md
docs/architecture/microservices/contract-meta-store.md
docs/architecture/microservices/grpc.md
docs/architecture/microservices/json-rpc.md
docs/architecture/microservices/koinos-chain.md
docs/architecture/microservices/mempool.md
docs/architecture/microservices/p2p.md
docs/architecture/microservices/rest.md
docs/architecture/microservices/transaction-store.md
docs/architecture/proof-of-burn.md
docs/architecture/resources.md
docs/architecture/serialization.md
docs/architecture/smart-contracts.md
docs/architecture/system-calls.md
```

### A.4 Resources paths

```text
docs/index.md
docs/resources/community-and-learning.md
docs/resources/contract-standards.md
docs/resources/ecosystem-platforms.md
docs/resources/explorers.md
docs/resources/index.md
docs/resources/software-libraries.md
docs/resources/wallets.md
```

## Appendix B: Exact support, example, draft, and verification paths

### B.1 Root and CI

```text
.github/workflows/javascript-examples.yml
.gitignore
mkdocs.yml
package-lock.json
package.json
```

### B.2 Verification scripts

```text
scripts/check-documentation-links.mjs
scripts/check-javascript-syntax.mjs
scripts/run-example-projects.mjs
scripts/sync-javascript-example-lines.mjs
scripts/verify-javascript-examples.mjs
scripts/verify-node-operator-commands.mjs
```

### B.3 Executable JavaScript example files

```text
examples/javascript/README.md
examples/javascript/manifest.json
examples/javascript/browser/kondor-dapp/README.md
examples/javascript/browser/kondor-dapp/index.html
examples/javascript/browser/kondor-dapp/package.json
examples/javascript/browser/kondor-dapp/src/main.js
examples/javascript/browser/kondor-dapp/src/wallet.js
examples/javascript/browser/kondor-dapp/src/wallet.test.js
examples/javascript/browser/kondor-dapp/vite.config.js
examples/javascript/contracts/testnet-contract-client/README.md
examples/javascript/contracts/testnet-contract-client/index.js
examples/javascript/contracts/testnet-contract-client/index.test.js
examples/javascript/contracts/testnet-contract-client/package.json
examples/javascript/getting-started/network-provider/README.md
examples/javascript/getting-started/network-provider/index.js
examples/javascript/getting-started/network-provider/index.test.js
examples/javascript/getting-started/network-provider/package.json
examples/javascript/getting-started/read-koin-balance/README.md
examples/javascript/getting-started/read-koin-balance/index.js
examples/javascript/getting-started/read-koin-balance/index.test.js
examples/javascript/getting-started/read-koin-balance/package.json
examples/javascript/interacting/read-only-queries/README.md
examples/javascript/interacting/read-only-queries/index.js
examples/javascript/interacting/read-only-queries/index.test.js
examples/javascript/interacting/read-only-queries/package.json
examples/javascript/references/koilib-api-tour/README.md
examples/javascript/references/koilib-api-tour/index.js
examples/javascript/references/koilib-api-tour/index.test.js
examples/javascript/references/koilib-api-tour/package.json
examples/javascript/testnet/transaction-workflows/README.md
examples/javascript/testnet/transaction-workflows/index.js
examples/javascript/testnet/transaction-workflows/index.test.js
examples/javascript/testnet/transaction-workflows/package.json
```

### B.4 Architecture drafts

```text
drafts/architecture/ARCHITECTURE_DOCUMENTATION_PLAN.md
drafts/architecture/microservices/README.md
drafts/architecture/microservices/internal-messaging.md
drafts/architecture/microservices/overview.md
drafts/architecture/microservices/services/account-history.md
drafts/architecture/microservices/services/block-producer.md
drafts/architecture/microservices/services/block-store.md
drafts/architecture/microservices/services/chain.md
drafts/architecture/microservices/services/contract-meta-store.md
drafts/architecture/microservices/services/grpc.md
drafts/architecture/microservices/services/json-rpc.md
drafts/architecture/microservices/services/mempool.md
drafts/architecture/microservices/services/p2p.md
drafts/architecture/microservices/services/rest.md
drafts/architecture/microservices/services/transaction-store.md
```

### B.5 Resources drafts

```text
drafts/resources/RESOURCE_DOCUMENTATION_PLAN.md
drafts/resources/RESOURCE_INVENTORY.md
```
