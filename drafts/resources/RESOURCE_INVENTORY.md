# Resources inventory

> **Internal documentation record — not published by MkDocs**
>
> This inventory records the evidence used for the Resources directory review.
> Inclusion means that the linked resource and the limited purpose described in
> the public documentation were verified on the date shown. It is not an audit,
> endorsement, or guarantee of availability.

## Review rules

- Verify a project through its canonical site, repository, package registry, or
  an official Koinos source.
- Use the current public testnet repository as the authority for testnet claims.
- Do not infer ownership, maintenance, network support, or security from a name.
- Exclude resources that are unreachable, materially stale, unsupported, or
  lack enough primary evidence.
- Recheck all included resources before each Resources update.

**Verification date for every candidate row in this inventory: 2026-07-25.**

## Wallet candidates

| Resource | Category | Maintainer | Ownership | Canonical URL | Repository | Version evidence | Supported network | Status | Limitations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Kondor | Browser wallet | Julián González | Community-maintained | [Website](https://kondorwallet.com/) | [joticajulian/kondor](https://github.com/joticajulian/kondor) | Repository activity and current Chrome Web Store listing checked 2026-07-25 | Koinos; the user must verify the selected network before signing | Include | Browser extension; compatibility and network selection can change |
| Tangem | Hardware-wallet system | Tangem | Third-party | [KOIN support page](https://tangem.com/en/cryptocurrencies/koinos/) | Not published for the Koinos integration | Current Tangem asset page explicitly lists Koinos support | Koinos | Include | Proprietary product; documentation does not assess firmware, custody design, or security |
| Konio | Mobile wallet | Not verified | Third-party | `https://konio.io/` | Not verified | Domain redirected to an unrelated parked/insecure destination on 2026-07-25 | Not verified | Exclude | No current canonical source could be established |
| My Koinos Wallet / Portal | Web wallet | Not verified | Community/third-party | No current canonical URL verified | Not verified | Only older secondary documentation found | Not verified | Exclude | Insufficient current primary evidence |
| Koinos CLI | Command-line account and transaction tool | Koinos Group | Official | [Repository](https://github.com/koinos/koinos-cli) | [koinos/koinos-cli](https://github.com/koinos/koinos-cli) | [v2.0.0](https://github.com/koinos/koinos-cli/releases/tag/v2.0.0) | Network depends on the selected endpoint | Cross-reference | Developer/power-user tool, not presented as a consumer wallet |

## Explorers and network-tool candidates

| Resource | Category | Maintainer | Ownership | Canonical URL | Repository | Version evidence | Supported network | Status | Limitations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Koinosblocks | Block explorer | Engrave | Community-maintained | [koinosblocks.com](https://koinosblocks.com/) | [GitLab](https://gitlab.com/engrave/koinos/koinosblocks) | Live head height compared with an official mainnet API on 2026-07-25 | Mainnet verified | Include | No current-public-testnet compatibility or maintained public API documentation verified |
| Koiner | Explorer/analytics candidate | Not verified | Third-party | `https://koiner.app/` | Not verified | DNS resolution failed on 2026-07-25 | Not verified | Exclude | Site unreachable; features and ownership could not be verified |
| KoinosScan | Block explorer candidate | KoinosScan project | Third-party | [koinosscan.com](https://koinosscan.com/) | Not verified | Displayed head was materially behind the official mainnet head on 2026-07-25 | Mainnet, but stale at verification | Exclude | Not sufficiently synchronized for a current directory entry |
| Koinscan | Block explorer and network dashboard | Armana | Third-party | [koinscan.com](https://www.koinscan.com/) | Not verified | Live site build `v0.1.0` (`e1b4fbe`); displayed head was within three blocks of the official mainnet API during review | Mainnet verified | Include | Site identifies itself as early beta; no current-public-testnet compatibility, public source repository, or public API documentation verified |
| Koinos public testnet repository | Network status and configuration | Koinos Group | Official | [koinos/koinos-testnet](https://github.com/koinos/koinos-testnet) | [koinos/koinos-testnet](https://github.com/koinos/koinos-testnet) | Commit [`0c37959`](https://github.com/koinos/koinos-testnet/commit/0c37959074d1d66bfafb90f44d5a6c5c5c1c5a50) and release [`v0.1.0-public-testnet`](https://github.com/koinos/koinos-testnet/releases/tag/v0.1.0-public-testnet) | Current public testnet | Include as network source | Not a graphical explorer |

## Ecosystem application and service candidates

| Resource | Category | Maintainer | Ownership | Canonical URL | Repository | Version evidence | Supported network | Status | Limitations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| KoinDX | Decentralized exchange application | KoinDX | Third-party | [koindx.com](https://koindx.com/) | [KoinDX GitHub](https://github.com/koindx) | Live application and project links checked 2026-07-25 | Mainnet verified through the live application | Include | No claims about liquidity, pricing, returns, or contract security |
| Kollection | NFT marketplace source candidate | Kollection | Third-party | [GitHub organization](https://github.com/kollection-nft) | [Marketplace repository](https://github.com/kollection-nft/marketplace) | GitHub organization and source remain available; `kollection.app` failed DNS during final review | No live network compatibility verified | Exclude from live application directory | Source is available, but no consistently reachable current application was verified |
| Koinos Account Protocol (KAP) | Account naming candidate | Top Level Accounts | Third-party | `https://kap.domains/` | Not verified | Domain redirected to an expired-domain service during the final URL audit | Not verified | Exclude | No current canonical application destination remained available |
| Vortex Bridge | Cross-chain bridge | Vortex | Third-party | [vortexbridge.io](https://vortexbridge.io/) | Not verified | Live bridge interface checked 2026-07-25 | Networks shown by the live application; users must recheck before use | Include | Bridge use has third-party and cross-chain risks; no security assessment performed |
| Fogata | Block-production pool interface | Fogata / Julián González | Third-party | [fogata.io](https://fogata.io/) | [joticajulian/fogata](https://github.com/joticajulian/fogata) | Live pool interface checked 2026-07-25 | Mainnet entry only | Include | No reward, availability, or performance claims |
| BurnKoin | Block-production pool interface | Luke Willis / BurnKoin project | Third-party | [burnkoin.com](https://burnkoin.com/) | [Pool contracts](https://github.com/lukemwillis/koinos-burn-pool) and [web interface](https://github.com/lukemwillis/koinos-burn-pool-ui) | Live pool interface and project links checked 2026-07-25 | Mainnet entry only | Include | Linked repositories are older than the live site; no reward, availability, or performance claims |
| Koin Krew | Community application portal | Koin Krew project | Third-party | [koincrew.com](https://koincrew.com/) | Not verified | Live site and [application portal](https://app.koincrew.com/) checked 2026-07-25 | Koinos mainnet interface verified from current token, contract, and application destinations | Include | Wallet-connected token, NFT, airdrop, and ownership-verification features; no source repository or contract assessment verified |
| Koinos One | Desktop node-management application | Community contributors led by Pablo García | Community-maintained; repository hosted by `koinos` | [Repository](https://github.com/koinos/koinos-one) | [koinos/koinos-one](https://github.com/koinos/koinos-one) | Release [`v1.1.1`](https://github.com/koinos/koinos-one/releases/tag/v1.1.1); commit [`1e84415`](https://github.com/koinos/koinos-one/commit/1e844159973765615f72bd35c6c546f739322c66) | Koinos mainnet capability documented; selected network must be verified | Include | Community-driven experimental macOS-first application; official reference node remains the microservice implementation |
| Teleno | Monolithic native Koinos-compatible node | Community contributors led by Pablo García | Community-maintained; repository hosted by `koinos` | [Repository](https://github.com/koinos/teleno) | [koinos/teleno](https://github.com/koinos/teleno) | Release [`teleno-node-v1.1.0`](https://github.com/koinos/teleno/releases/tag/teleno-node-v1.1.0); commit [`787d7cf`](https://github.com/koinos/teleno/commit/787d7cf37e5d2134ebc72faf944381a6aa4462a3) | Koinos mainnet compatibility documented; selected network must be verified | Include | Experimental single-binary alternative; official reference node remains the microservice implementation |
| KoinCity | Application/platform candidate | Not verified | Third-party | `https://koincity.com/` | Not verified | DNS resolution failed during browser review on 2026-07-25 | Not verified | Exclude | Current application and purpose could not be verified |
| Krypto Bulls | Game candidate | Krypto Bulls | Third-party | [kryptobulls.io](https://kryptobulls.io/) | Not verified | Site displayed “Coming Soon” on 2026-07-25 | Not verified | Exclude | No live application verified |
| Koinos Garden | Investment/community candidate | Koinos Garden | Third-party | [koinosgarden.com](https://koinosgarden.com/) | Not verified | Discovery source reviewed 2026-07-25 | Not applicable | Exclude | Outside the narrow application-directory scope and would require financial context |

## Contract standards

Canonical repository: [koinos/koinos-contract-standards](https://github.com/koinos/koinos-contract-standards).
The reviewed immutable revision is commit
[`ef6f3d8`](https://github.com/koinos/koinos-contract-standards/commit/ef6f3d8edc75673842e927edba1232fe47df51e4).

| Resource | Category | Maintainer | Ownership | Canonical URL | Repository | Version evidence | Supported network | Status | Limitations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| KCS-1 | Contract standard | Listed KCS authors and Koinos repository maintainers | Official repository | [Latest](https://github.com/koinos/koinos-contract-standards/blob/master/KCSs/kcs-1.md) | Canonical repository above | Reviewed at `ef6f3d8`: “Token Standard”, Final | Network-independent interface | Include | Summary does not replace the specification |
| KCS-2 | Contract standard | Listed KCS authors and Koinos repository maintainers | Official repository | [Latest](https://github.com/koinos/koinos-contract-standards/blob/master/KCSs/kcs-2.md) | Canonical repository above | Reviewed at `ef6f3d8`: “NFT Collection Standard”, Final | Network-independent interface | Include | Summary does not replace the specification |
| KCS-3 | Contract standard | Listed KCS authors and Koinos repository maintainers | Official repository | [Latest](https://github.com/koinos/koinos-contract-standards/blob/master/KCSs/kcs-3.md) | Canonical repository above | Reviewed at `ef6f3d8`: “Token Standard that mimics ERC-20”, Final | Network-independent interface | Include | Summary does not replace the specification |
| KCS-4 | Contract standard | Listed KCS authors and Koinos repository maintainers | Official repository | [Latest](https://github.com/koinos/koinos-contract-standards/blob/master/KCSs/kcs-4.md) | Canonical repository above | Reviewed at `ef6f3d8`: title recorded in public page, Pending | Network-independent interface | Include | Pending status may change |
| KCS-5 | Contract standard | Listed KCS authors and Koinos repository maintainers | Official repository | [Latest](https://github.com/koinos/koinos-contract-standards/blob/master/KCSs/kcs-5.md) | Canonical repository above | Reviewed at `ef6f3d8`: title recorded in public page, Pending | Network-independent interface | Include | Pending status may change |

## SDK, library, and developer-tool candidates

| Resource | Category | Maintainer | Ownership | Canonical URL | Repository | Version evidence | Supported network | Status | Limitations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Koilib | JavaScript/TypeScript blockchain interaction | Julián González | Community-maintained | [npm](https://www.npmjs.com/package/koilib) | [joticajulian/koilib](https://github.com/joticajulian/koilib) | npm `9.2.0`; commit [`ae5b267`](https://github.com/joticajulian/koilib/commit/ae5b2671ee5f31cb9c8f66f3007a4451026d3ec7) | Endpoint-dependent | Include | Application library, not a node implementation |
| Koinos AssemblyScript SDK | Smart-contract SDK | Koinos Group | Official | [Repository](https://github.com/koinos/koinos-sdk-as) | Same | npm `@koinos/sdk-as` `1.4.0`; commit [`d93ad34`](https://github.com/koinos/koinos-sdk-as/commit/d93ad345a34fa65bfd7a25ec5fc3c7ad9d428f21) | Contract/runtime version-dependent | Include | Verify compatibility for the target chain release |
| Koinos AssemblyScript SDK CLI | Contract project CLI | Koinos Group | Official | [npm](https://www.npmjs.com/package/@koinos/sdk-as-cli) | [koinos/koinos-sdk-as-cli](https://github.com/koinos/koinos-sdk-as-cli) | npm `1.0.2`; commit [`6c0a7cb`](https://github.com/koinos/koinos-sdk-as-cli/commit/6c0a7cb18533a02e442998de0d4575e263077b34) | Contract/runtime version-dependent | Include | Published package version differs from the repository package manifest |
| Koinos C++ SDK | Smart-contract SDK | Koinos Group | Official | [Repository](https://github.com/koinos/koinos-sdk-cpp) | Same | Release [`v1.0.0`](https://github.com/koinos/koinos-sdk-cpp/releases/tag/v1.0.0) | Contract/runtime version-dependent | Include | Older release; verify compatibility before starting a new project |
| Koinos CLI | Command-line interaction | Koinos Group | Official | [Repository](https://github.com/koinos/koinos-cli) | Same | Release [`v2.0.0`](https://github.com/koinos/koinos-cli/releases/tag/v2.0.0) | Endpoint-dependent | Include | Transactions may be state-changing; inspect before signing |
| Koinos local testnet | Local integration environment | Koinos Group | Official | [Repository](https://github.com/koinos/koinos-local-testnet) | Same | Commit [`2508a39`](https://github.com/koinos/koinos-local-testnet/commit/2508a39826d6632238edd8a1138c1b42c7ca8cbd) | Local development network | Include | Separate from the current public testnet |
| Koinos Mock VM | Local contract testing | Koinos Group | Official | [npm](https://www.npmjs.com/package/@koinos/mock-vm) | [koinos/koinos-mock-vm](https://github.com/koinos/koinos-mock-vm) | npm `1.2.0`; commit [`b7bcd44`](https://github.com/koinos/koinos-mock-vm/commit/b7bcd4483447c0d70529ff9d4d5fe4dd5d6b25e7) | Local test runtime | Include | A mock does not replace integration testing |
| Koinos protocol definitions | Protocol schemas and generated bindings | Koinos Group | Official | [Repository](https://github.com/koinos/koinos-proto) | Same | Release [`v2.6.0`](https://github.com/koinos/koinos-proto/releases/tag/v2.6.0) | Protocol version-dependent | Include | Generated bindings are low-level protocol types, not complete SDKs |
| Arkinos | Development framework candidate | Not verified | Community/third-party | npm listing only | Not verified | No sufficiently current canonical support evidence established | Not verified | Exclude | Maintenance and current compatibility not established |
| Python, Go, and Rust high-level SDK claims | High-level SDK candidates | Not verified | Not verified | None | None | No current canonical supported implementations established | Not verified | Exclude | Protocol bindings must not be described as complete high-level SDKs |

## Community and learning sources

| Resource | Category | Maintainer | Ownership | Canonical URL | Repository | Version evidence | Supported network | Status | Limitations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Koinos website | Project information | Koinos Group | Official | [koinos.io](https://koinos.io/) | Not applicable | Live site checked 2026-07-25 | General | Include | Ecosystem listings are discovery leads, not verification by themselves |
| Koinos documentation | Documentation | Koinos Docs contributors | Official | [docs.koinos.io](https://docs.koinos.io/) | [koinos/koinos-docs](https://github.com/koinos/koinos-docs) | Current published site and repository checked 2026-07-25 | General | Include | Report stale content through the repository issue tracker |
| Koinos GitHub organization | Source and contribution | Koinos Group | Official | [github.com/koinos](https://github.com/koinos) | Organization repositories | Live organization checked 2026-07-25 | General | Include | Individual repository status must still be checked |
| Koinos Telegram | Community discussion | Koinos community moderators | Officially linked community channel | [telegram.koinos.io](https://telegram.koinos.io/) | Not applicable | Official redirect and destination checked 2026-07-25 | General | Include | Public chat; verify advice before acting |
| Koinos Discord | Community/developer discussion | Koinos community moderators | Officially linked community channel | [discord.koinos.io](https://discord.koinos.io/) | Not applicable | Linked from the current official website on 2026-07-25 | General | Include | Invite/redirect behavior can change |
| Koinos YouTube | Video learning and project updates | Koinos Group | Official | [YouTube channel](https://www.youtube.com/@koinosgroup) | Not applicable | Current channel checked 2026-07-25 | General | Include | Older videos may describe obsolete networks or releases |
| Koinos Medium | Project articles | Koinos Network | Official project publication | [Medium publication](https://medium.com/koinosnetwork) | Not applicable | Current publication checked 2026-07-25 | General | Include | Older articles may be historical |
| Koinos on X | Project updates | Koinos Network | Official | [x.com/koinosnetwork](https://x.com/koinosnetwork) | Not applicable | Linked from the current official website on 2026-07-25 | General | Include | Not a substitute for versioned technical documentation |

## Public-page decisions

- Public wallet entries: Kondor and Tangem. Koinos CLI is a developer-tool
  cross-reference.
- Public explorer entries: Koinosblocks and Koinscan for mainnet. The official
  current-public-testnet repository is linked as the network authority because
  no current public-testnet explorer was verified.
- Public ecosystem entries: KoinDX, Vortex Bridge, Koin Krew, Fogata, BurnKoin,
  Koinos One, and Teleno.
- Public developer entries: Koilib, the AssemblyScript SDK and CLI, the C++ SDK,
  Koinos CLI, local testnet, Mock VM, and protocol definitions.
- A resource may be reconsidered after its maintainer supplies a canonical URL,
  ownership information, supported-network evidence, and a reproducible current
  verification path.
- Website PR
  [koinos/koinos-io-website#142](https://github.com/koinos/koinos-io-website/pull/142)
  was used as a discovery source for Koinscan, Koin Krew, Koinos One, Teleno,
  and the updated Kollection destination. Each candidate was independently
  checked; the website list was not treated as verification by itself.
