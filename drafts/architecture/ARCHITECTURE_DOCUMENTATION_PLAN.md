# Architecture Documentation Plan

> [!IMPORTANT]
> **Internal planning document — not published.** This file and the material under
> `drafts/architecture/` are outside the MkDocs `docs_dir`. They are inputs for
> future documentation work, not approved user-facing documentation.

## Objective

Create a technically accurate, maintainable Architecture chapter for Koinos
without carrying forward stale operational guidance or exposing unfinished
material to readers.

The first input to that work is the
[internal microservices foundation](microservices/README.md). It recovers useful
structural knowledge from the historical Koinos One documentation and reconciles
it with versioned current Koinos sources. It is deliberately not part of the
published site.

## Boundaries for the current phase

- Keep `drafts/architecture/` as internal technical source material; adapt it
  for readers instead of publishing it directly.
- Public Architecture changes may update `mkdocs.yml` and `docs/architecture/`
  after a claim has been verified against the selected source baseline.
- Do not present the internal drafts as complete or authoritative user
  documentation.
- Do not copy the historical Koinos One pages wholesale.
- Do not import Knodel- or Windows-specific instructions, GarageMQ details,
  stale image versions, seed addresses, ports, storage estimates, recovery
  procedures, or unverified performance claims.
- Keep node operation, configuration, ports, backup and restore, publishing,
  and deployment workflows in the Node Operators chapter.
- Keep implementation details for privileged system contracts in the System
  Contracts chapter, linking from Architecture only when architectural context
  is necessary.
- Use stable, versioned official sources for every technical claim promoted to
  public documentation.

## Phase 1 — Build the internal source foundation

Status: **completed in `drafts/architecture/microservices/`**

1. Record the source boundaries and pinned revisions in the
   [microservices draft index](microservices/README.md).
2. Establish a current system-level model in
   [Microservices overview](microservices/overview.md).
3. Explain RabbitMQ, protobuf RPC, and broadcast relationships in
   [Internal messaging](microservices/internal-messaging.md).
4. Draft one technical record for every current service:

   - Chain
   - Block Store
   - P2P
   - Mempool
   - Transaction Store
   - Block Producer
   - JSON-RPC
   - gRPC
   - REST
   - Contract Meta Store
   - Account History

5. Use the same structure for each service: purpose; dependencies and inputs;
   outputs, RPCs, and broadcasts; persistent state; failure and consistency
   considerations; publication verification; and versioned sources.
6. Mark uncertainties explicitly instead of filling gaps with assumptions.

Deliverable: a reviewable internal technical baseline, still outside the
published site.

## Phase 2 — Verify against current official Koinos

Status: **completed for the current documentation baseline**

Before editorial work, select the Koinos release or commit that the next
documentation update will describe. Then:

1. Recheck the Compose service set, profiles, and dependency graph at that exact
   revision.
2. Recheck RPC methods, message envelopes, and broadcasts against the matching
   `koinos-proto` revision.
3. Review each service repository at a compatible tag or commit for:

   - state ownership and storage engine;
   - startup and catch-up dependencies;
   - inputs and outputs;
   - fork and irreversible-block handling;
   - failure behavior and rebuildability;
   - public-interface versus internal-interface responsibilities.

4. Resolve every item under each draft's “Verification before publication”
   section.
5. Record source links using immutable tags or full commit hashes.
6. Ask the relevant Koinos maintainers to review areas where code alone does not
   establish the intended architecture.

Deliverable: a technically verified foundation tied to one coherent Koinos
revision.

The selected deployment baseline is the official `koinos` bundle at commit
`821674672e699bf56e94d7c0e8bce122e83d1482`, including the service tags in its
`env.example`. RPC and broadcast descriptions use `koinos-proto` v2.6.0 and
were checked against the descriptor shipped by the bundle. Public pages avoid
claims that are not established by this baseline.

## Phase 3 — Design the future reader journey

Status: **completed for the current Architecture update**

Define the audience and information architecture before modifying public pages.
The likely Architecture structure is:

1. **Architecture overview** — system boundaries, the microservice model, data
   flow, and the distinction between internal messaging and peer-to-peer
   networking.
2. **Microservices** — a readable overview plus focused service pages, derived
   from the verified internal foundation.
3. **Consensus and Proof of Burn** — architectural behavior only; operational
   production setup remains in Node Operators.
4. **Smart contracts, ABI, system calls, and serialization** — runtime
   boundaries and data contracts, without duplicating SDK tutorials.
5. **Resources** — architectural resource accounting and relevant links.

During this phase:

- identify beginner, application-developer, contract-developer, and operator
  needs;
- decide which service details belong on individual pages and which belong in
  diagrams or reference tables;
- remove empty or redundant navigation destinations;
- separate durable concepts from release-specific implementation notes;
- replace stale or invented terminology with established Koinos terms;
- link to Node Operators and System Contracts instead of duplicating their
  procedures.

Deliverable: an approved public outline and editorial brief. No public content
is promoted merely because the internal drafts exist.

## Phase 4 — Promotion into published documentation

Status: **in progress; implementation completed and validation pending**

Only after technical and editorial review:

1. Update the Architecture landing page and navigation.
2. Replace or remove empty microservice placeholders.
3. Adapt verified material from the drafts for the intended audience; do not
   simply move files from `drafts/` to `docs/`.
4. Update the overview, Microservices, Proof of Burn, ABI, system calls,
   Resources, Smart Contracts, and Serialization pages as required by the
   approved outline.
5. Add diagrams only where they make service boundaries or data flow easier to
   understand.
6. Add versioned official references close to the claims they support.
7. Keep operational commands and procedures in Node Operators.

Promotion checks:

- no unresolved verification markers;
- no empty public navigation targets;
- no stale network, version, port, or deployment claims;
- no duplicated operator or system-contract procedures;
- terminology matches current official Koinos repositories;
- maintainers have reviewed safety- or consensus-sensitive explanations.

## Validation for future published changes

Run the repository's normal validation plus focused Architecture checks:

- validate all local and external links;
- build MkDocs with strict warnings where supported;
- inspect navigation and previous/next relationships;
- review every changed page at desktop and mobile widths;
- check tables, diagrams, code overflow, anchor links, and browser console
  errors;
- confirm versioned source links resolve to the intended revision;
- run `git diff --check`;
- confirm that only intended files are tracked.

## Current completion condition

The present phase is complete when the internal foundation remains outside the
generated site, the public Architecture reader journey contains no empty
destinations, every published technical claim is supported by the selected
versioned sources, repository link and MkDocs checks pass without new warnings,
and desktop and mobile review finds no navigation, layout, or console problem.
