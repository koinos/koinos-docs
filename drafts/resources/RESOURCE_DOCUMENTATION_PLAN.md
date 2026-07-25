# Resources Documentation Update Plan

## Status

Internal implementation plan. This file is not part of the published MkDocs
content.

No public page, navigation entry, or cross-chapter link is changed by this
plan. Implementation must happen later on a dedicated feature branch.

## Objective

Rebuild the top-level Koinos **Resources** section as a current, trustworthy,
and maintainable directory of tools, services, standards, projects, and
community material.

The section must help readers discover resources without:

- duplicating tutorials and technical explanations from other chapters;
- presenting third-party projects as officially endorsed;
- preserving obsolete testnet information;
- listing tools, SDKs, APIs, or features that have not been verified;
- making unsupported security, reliability, liquidity, or performance claims;
- confusing this directory with the Koinos Resource Credits and Mana model.

The technical resource-accounting model remains in
[Architecture](../../docs/architecture/resources.md). This plan concerns the
separate top-level directory under `docs/resources/`.

## Ownership and Git workflow

The Resources chapter is assigned to `pgarcgo`.

Implementation must:

1. Read and follow `AGENTS.local.md`.
2. Preserve all unrelated tracked and untracked files.
3. Fetch the latest `origin/dev`.
4. Create a new branch named `codex/update-resources-docs` from `origin/dev`.
5. Keep the work independent from the Architecture feature branch.
6. Limit cross-chapter edits to necessary navigation or link corrections.
7. Call out every cross-chapter file in the pull-request description.
8. Open a draft pull request targeting `dev`.
9. Do not merge the pull request or mark it ready for review.

If the Architecture pull request has not yet merged, the Resources branch must
still start from `origin/dev`. Do not stack the Resources work on the
Architecture branch.

## Current-state findings

### Published `master`

The published Resources section currently consists of one large landing page:

- `docs/resources/index.md`

It mixes wallets, ecosystem applications, standards, libraries, SDKs, and
general promotional text in a single page. It contains duplicated material,
outdated descriptions, spelling errors, subjective calls to action, and claims
that are difficult to maintain.

### Current `dev`

The `dev` branch adds these child pages:

- `docs/resources/wallets.md`
- `docs/resources/explorers.md`
- `docs/resources/ecosystem-platforms.md`
- `docs/resources/contract-standards.md`
- `docs/resources/software-libraries.md`

The current problems include:

- `wallets.md` is empty.
- `explorers.md` still links to the retired Harbinger testnet.
- `contract-standards.md` assigns invented purposes to KCS-3, KCS-4, and KCS-5.
- `software-libraries.md` lists Python, Go, and Rust SDKs without canonical
  repositories or sufficient evidence that they exist as supported high-level
  SDKs.
- `ecosystem-platforms.md` contains generic DeFi categories without identifying
  verified live Koinos applications.
- Several descriptions are promotional rather than factual.
- The landing page repeats information that should live in the child pages.
- The landing page hides navigation, making its child pages harder to discover.
- The home-page card named “References & Resources” links to References, not to
  the Resources section.

## Source-of-truth policy

### First-party technical sources

Use current, versioned sources from:

- [Koinos GitHub organization](https://github.com/koinos)
- [Koinos documentation repository](https://github.com/koinos/koinos-docs)
- [Koinos public testnet](https://github.com/koinos/koinos-testnet)
- [Koinos Contract Standards](https://github.com/koinos/koinos-contract-standards)
- official package registries linked from the corresponding repositories

For SDKs, libraries, schemas, and standards, record both:

- an immutable tag or commit that supports the documented statement; and
- the canonical project page where readers can find the newest release.

### Ecosystem discovery sources

The [Koinos ecosystem page](https://koinos.io/ecosystem) may be used to discover
candidate projects, but it is not sufficient evidence by itself. Every
third-party candidate must be checked against its own canonical website,
repository, package, or application.

### Current-testnet policy

The only testnet described as current must be the testnet documented by
`koinos/koinos-testnet`.

Do not:

- restore Harbinger links;
- copy historical chain IDs, contract addresses, serialized transactions,
  nonces, signatures, or resource limits;
- claim that an explorer supports the current testnet without verifying its
  current chain and endpoint;
- embed operational testnet details that belong in Getting Started or Node
  Operators.

### Explicit exclusions

- Do not add or restore references to Sovrano.
- Do not present archived, unreachable, or unverified projects as current.
- Do not imply that inclusion is an audit, endorsement, or security guarantee.
- Do not add investment recommendations or claims about yields, liquidity, or
  returns.

## Proposed information architecture

Keep the existing URLs where possible to avoid unnecessary redirects, but
present the navigation with explicit audience-oriented labels:

```text
Resources
├── Resources overview
├── For users
│   ├── Wallets
│   ├── Explorers and network tools
│   └── Ecosystem applications and services
├── For developers
│   ├── SDKs, libraries, and developer tools
│   └── Contract standards
└── Community and learning
```

Recommended paths:

| Navigation label | Path | Action |
| --- | --- | --- |
| Resources overview | `docs/resources/index.md` | Rewrite |
| Wallets | `docs/resources/wallets.md` | Fill and verify |
| Explorers and network tools | `docs/resources/explorers.md` | Correct and extend |
| Ecosystem applications and services | `docs/resources/ecosystem-platforms.md` | Correct and reorganize |
| SDKs, libraries, and developer tools | `docs/resources/software-libraries.md` | Rewrite; retain path |
| Contract standards | `docs/resources/contract-standards.md` | Rewrite from canonical KCS data |
| Community and learning | `docs/resources/community-and-learning.md` | Add |

Do not add separate Resources pages for:

- Resource Credits or Mana;
- API tutorials;
- testnet setup;
- node operation;
- smart-contract tutorials;
- exchange integration.

Those subjects must remain in their owning chapters, with links from Resources
where useful.

## Internal inventory

Before changing public pages, create:

```text
drafts/resources/
├── RESOURCE_DOCUMENTATION_PLAN.md
└── RESOURCE_INVENTORY.md
```

`RESOURCE_INVENTORY.md` should record one row per candidate:

| Field | Purpose |
| --- | --- |
| Name | Canonical product or project name |
| Category | Wallet, explorer, SDK, standard, dApp, community, or service |
| Maintainer | Responsible organization or account |
| Ownership | Koinos, community, or third party |
| Canonical URL | Primary website or documentation |
| Repository | Source repository when available |
| Version evidence | Tag or commit supporting technical statements |
| Network | Mainnet, current public testnet, local, or unknown |
| Platform/language | Browser, mobile, hardware, JavaScript, C++, and so on |
| Last verification | Date of the evidence check |
| Status | Include, exclude, or pending |
| Notes | Limitations, redirects, missing evidence, or maintenance concerns |

### Inclusion checks

A resource may be published only when:

1. Koinos support is explicit and verifiable.
2. Its canonical URL resolves over HTTPS.
3. Its description can be supported by a primary source.
4. Its maintainer or ownership can be identified.
5. Its network compatibility is known or clearly marked as unknown.
6. It provides current value to Koinos users or developers.
7. The documentation can describe it without making an endorsement.

Links that return `403` to automated clients require a manual browser check;
they must not automatically be classified as dead. Redirects must resolve to
the expected organization and product.

## Page implementation

### 1. Resources overview

Rewrite `docs/resources/index.md` as an orientation page.

It should:

- define the section as a directory of tools and ecosystem resources;
- distinguish it from Architecture’s resource-accounting page;
- let readers choose a destination by task;
- link to all Resources child pages;
- distinguish official, community, and third-party material;
- include a concise non-endorsement and security notice;
- link to the official GitHub organization and current public-testnet source;
- avoid duplicating the detailed lists from the child pages;
- remove `hide: navigation` unless there is a verified accessibility reason to
  keep it;
- replace subjective calls to action with descriptive link labels.

### 2. Wallets

Fill `docs/resources/wallets.md` with a factual comparison.

Recommended fields:

| Field | Example values |
| --- | --- |
| Platform | Browser extension, mobile, hardware, or CLI |
| Key model | Non-custodial, custodial, or not verified |
| dApp connection | Supported, unsupported, or limited |
| Network support | Mainnet and/or verified current testnet |
| Source availability | Public repository or proprietary |
| Maintainer | Named organization or community project |
| Canonical link | Verified installation or project page |

Implementation rules:

- verify Kondor and Konio against current canonical sources;
- include Tangem only if Tangem or another authoritative source currently
  confirms KOIN support;
- place Koinos CLI primarily in developer tools, with only a cross-reference
  from wallets;
- exclude Sovrano;
- link to the Getting Started account, key, and wallet guidance rather than
  duplicating procedures;
- warn readers never to enter a recovery phrase, WIF, or production private key
  into an untrusted page, example, or public runner;
- do not rank wallets by security without an independent, current audit.

### 3. Explorers and network tools

Rewrite `docs/resources/explorers.md`.

It should:

- remove every Harbinger URL;
- verify each explorer’s mainnet and current-testnet support separately;
- distinguish explorer, analytics platform, and network dashboard;
- link directly to canonical products;
- list API access only when current API documentation exists;
- avoid generic claims such as “most explorers provide APIs”;
- avoid copying volatile chain IDs and endpoints;
- link to the current testnet source for authoritative network details.

Potential candidates must be evaluated, not automatically included:

- Koinosblocks;
- Koiner;
- Koinosscan;
- Koinscan;
- other current tools found through official and community sources.

### 4. Ecosystem applications and services

Rewrite `docs/resources/ecosystem-platforms.md` around verified live categories:

- exchanges and swaps;
- NFT applications;
- names and identity;
- bridges;
- block-production pools;
- governance and community applications;
- games and other dApps.

For every entry:

- identify it as third-party unless it is demonstrably first-party;
- describe its actual function in one neutral sentence;
- name its supported network only when verified;
- avoid claims about security, performance, liquidity, rewards, or reliability;
- omit categories that do not contain a verified current application.

Do not preserve generic placeholders such as lending, borrowing, yield farming,
or staking services when no specific current product and source are available.

### 5. Contract standards

Rewrite `docs/resources/contract-standards.md` from the canonical KCS
repository.

The current verified baseline is:

| Standard | Canonical title | Status |
| --- | --- | --- |
| KCS-1 | Token Standard | Final |
| KCS-2 | NFT Collection Standard | Final |
| KCS-3 | Token Standard that mimics ERC-20 | Final |
| KCS-4 | Token Standard that mimics ERC-20 and supports Koinos authority | Pending |
| KCS-5 | NFT Standard that mimics ERC-721 and supports Koinos authority | Pending |

Before implementation, refresh this table from the current repository.

Each public entry should include:

- exact title;
- current status;
- one concise statement of purpose;
- an immutable link to the reviewed version;
- a link to the canonical repository for the latest state.

Do not reproduce exhaustive interfaces or specifications. Do not describe
KCS-3 as a DEX standard, KCS-4 as a staking standard, or KCS-5 as a governance
standard.

### 6. SDKs, libraries, and developer tools

Retain `docs/resources/software-libraries.md` to preserve the URL, but use
“SDKs, libraries, and developer tools” as its navigation label and page title.

Organize entries by task:

- interact with Koinos from JavaScript or TypeScript;
- develop AssemblyScript contracts;
- develop C++ contracts;
- use Koinos CLI;
- test contracts or chains locally;
- work with protocol buffers and generated types.

Every entry should include:

- language or runtime;
- intended task;
- maintainer;
- official or community status;
- canonical repository;
- documentation;
- current package or release when verified.

Remove:

- alleged high-level Python, Go, or Rust SDKs without canonical evidence;
- package names or installation commands that have not been tested;
- placeholder tooling;
- promotional claims about development speed;
- abandoned tools presented as current.

Do not treat low-level protobuf packages as complete application SDKs.

### 7. Community and learning

Add `docs/resources/community-and-learning.md`.

Include only verified:

- official support and announcement channels;
- GitHub contribution entry points;
- blog and video resources;
- developer discussion channels;
- community-created learning resources;
- instructions for reporting stale documentation;
- instructions for proposing a resource for inclusion.

Clearly label official and community-managed channels. Avoid listing private,
inactive, or unmoderated groups as official support.

## Cross-chapter integration

Keep cross-chapter changes narrow.

Recommended links:

- Getting Started for accounts, keys, wallets, networks, and testnet basics;
- Interacting with Koinos for API and Koilib usage;
- Smart Contract Development for tutorials and SDK workflows;
- Node Operators for running and maintaining nodes;
- Architecture for the Resource Credits and Mana accounting model;
- References for API and SDK method-level documentation.

Home-page correction:

- split the current “References & Resources” card into separate destinations;
  or
- add a distinct “Tools & ecosystem” card pointing to `resources/index.md`.

Do not edit the content of Julián’s chapters. Only add or correct links that are
necessary for Resources discoverability, and list those changes explicitly in
the pull request.

## Executable-example policy

Resources should be a directory, not a code tutorial. Prefer links to existing
guides and complete examples over new code snippets.

If implementation adds a JavaScript example, it must follow
`EXECUTABLE_JAVASCRIPT_EXAMPLES_PLAN.md`:

- the complete executable source is canonical;
- the documentation links to the complete file;
- it includes a working Run, Codespaces, or justified local-run link;
- dependencies use exact versions;
- network and safety behavior are explicit;
- signing or state-changing examples default to the current testnet and require
  explicit user approval;
- no WIF, recovery phrase, or production secret is embedded or requested in a
  public runner;
- permanent links target the branch that publishes the documentation, not a
  disposable feature branch.

Installation commands are permitted only after they have been checked against
the current canonical package.

## Writing and presentation rules

- Use clear English.
- Prefer direct descriptions over promotional slogans.
- Use “third-party” or “community-maintained” where appropriate.
- Do not call a product secure, trusted, audited, official, primary, premier,
  best, or most popular without authoritative evidence.
- Do not imply that Koinos or the Koinos Community Foundation endorses listed
  products.
- Use consistent cards for section navigation and compact tables for comparing
  entries.
- Keep tables usable at mobile widths.
- Avoid screenshots unless they materially improve recognition and can be
  maintained.
- Use descriptive link text rather than “I want convenience” or “I’m an
  expert.”
- Do not end every page with a generic link back to Resources when normal
  navigation already provides that route.

## Verification plan

### Content checks

- Refresh all source evidence immediately before editing.
- Confirm every name, purpose, maintainer, package, release, and network.
- Compare `origin/master`, `origin/dev`, the published site, and the official
  source.
- Confirm there are no references to `Harbinger` or `Sovrano`.
- Confirm all five KCS titles and statuses against the canonical repository.
- Confirm every third-party entry is labeled correctly.
- Confirm no page contains an unsupported security or financial claim.
- Confirm Resources does not duplicate Architecture’s resource model.

### Link checks

- Check every internal link and anchor.
- Check every source and repository link.
- Check every external resource with bounded timeouts.
- Follow redirects and verify the final owner and destination.
- Manually check links that block automated clients.
- Confirm current-testnet links point to current official sources.
- Do not leave permanent GitHub links pointing to a feature branch.

Live third-party links can make CI flaky. Prefer:

- deterministic validation for internal paths, required metadata, and banned
  legacy hosts;
- a documented manual external-link audit for third-party services;
- bounded retries only if external link checks are automated.

### Repository checks

Run all checks relevant to the final diff, including:

```bash
npm run docs:links
docs-venv/bin/mkdocs build
git diff --check
```

If executable examples or their shared infrastructure change, also run:

```bash
npm run examples:syntax
npm run examples:verify
```

Run any additional existing repository validation required by the latest
`origin/dev`.

### Render review

Review every changed public route locally at desktop and mobile widths.

Check:

- navigation and page order;
- cards and tables;
- horizontal code or table overflow;
- long URLs and link wrapping;
- heading hierarchy;
- broken images;
- internal and external navigation;
- browser console warnings and errors.

Verify that `drafts/resources/` is not included in the generated MkDocs site.
Repeat the relevant review on the pull-request deploy preview.

## Implementation phases

### Phase 1: Refresh and classify the inventory

1. Fetch the latest `origin/dev`.
2. Compare current `master`, `dev`, and published Resources.
3. Create `RESOURCE_INVENTORY.md`.
4. Verify official sources and third-party candidates.
5. Record include, exclude, and pending decisions.
6. Resolve ambiguous wallet, explorer, package, and network claims before
   publishing them.

### Phase 2: Rebuild structure and landing page

1. Update the Resources navigation with explicit labels and audience groups.
2. Rewrite the landing page as a non-duplicative hub.
3. Restore visible navigation.
4. Add the directory and non-endorsement explanations.
5. Add the necessary cross-links to owning chapters.

### Phase 3: Correct user-facing resource pages

1. Complete Wallets.
2. Correct Explorers and remove Harbinger.
3. Reorganize ecosystem applications using verified live categories.
4. Add appropriate security and third-party notices.

### Phase 4: Correct developer-facing resource pages

1. Replace invented KCS descriptions with canonical titles and statuses.
2. Rebuild the SDK and tooling inventory.
3. Remove unverified language SDKs, packages, and installation commands.
4. Add versioned sources and current-project links.
5. Apply the executable-example policy if any examples are introduced.

### Phase 5: Add community material and discoverability

1. Add Community and learning.
2. Correct the home-page route to Resources.
3. Verify official versus community labels.
4. Check that every Resources page is reachable from both navigation and the
   landing page.

### Phase 6: Validate and deliver

1. Run content, source, and link audits.
2. Run repository validation and MkDocs builds.
3. Review every affected page at desktop and mobile widths.
4. Review the deploy preview.
5. Commit only intended Resources and narrow navigation files.
6. Push `codex/update-resources-docs`.
7. Open a draft pull request targeting `dev`.
8. Record sources, exclusions, validation evidence, and remaining third-party
   limitations in the pull-request description.
9. Leave the pull request open as a draft.

## Acceptance criteria

The Resources update is complete only when:

1. `docs/resources/wallets.md` is no longer empty.
2. The landing page is an orientation hub and does not duplicate its child
   pages.
3. Resources is clearly discoverable from site navigation and the home page.
4. The distinction between the Resources directory and the architectural
   resource-accounting model is explicit.
5. Harbinger is not presented as the current testnet.
6. No reference to Sovrano exists in the updated Resources scope.
7. All KCS titles, purposes, statuses, and links match the canonical repository.
8. No unverified Python, Go, Rust, or other high-level SDK is presented as
   supported.
9. Every listed project has a canonical source, known maintainer, and accurate
   classification.
10. Official, community, and third-party resources are visibly distinguished.
11. No third-party listing is presented as an endorsement, audit, or security
    guarantee.
12. No generic or nonexistent DeFi category is presented as a live Koinos
    application.
13. Current-testnet references are verified against `koinos/koinos-testnet`.
14. Source and package links use appropriate immutable versions where technical
    claims depend on a version.
15. Any JavaScript example follows the complete-source and executable-link
    policy.
16. Internal, source, package, runner, and external links have been checked.
17. MkDocs and all relevant repository validation pass apart from explicitly
    recorded pre-existing issues outside this work.
18. Every changed public page passes desktop and mobile visual review.
19. Internal inventory and plan files remain outside the generated site.
20. Only intended files are committed.
21. A draft pull request is open from `codex/update-resources-docs` to `dev`.
22. The pull request is not merged or marked ready for review.

## Expected deliverables

- `drafts/resources/RESOURCE_INVENTORY.md`
- rewritten `docs/resources/index.md`
- completed `docs/resources/wallets.md`
- corrected `docs/resources/explorers.md`
- corrected `docs/resources/ecosystem-platforms.md`
- corrected `docs/resources/contract-standards.md`
- rewritten `docs/resources/software-libraries.md`
- new `docs/resources/community-and-learning.md`
- updated Resources navigation in `mkdocs.yml`
- only the narrow home-page or cross-chapter link changes required for
  discoverability
- validation evidence in the draft pull request
