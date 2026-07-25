# Networks

A Koinos network is identified by its genesis data and resulting chain ID.
Peers, transactions, contract addresses, basedirs, and keys are
network-specific.

Never mix:

- `genesis_data.json`;
- peer configuration;
- chain or block-store directories;
- producer keys or wallet assumptions;
- contract addresses;
- serialized transactions or signatures

between networks.

## Mainnet

The `config-example/` and `env.example` files in the official
[`koinos/koinos`](https://github.com/koinos/koinos) repository configure
mainnet. This is the supported default deployment bundle covered by the
observer guide.

Keep mainnet in its own absolute basedir, such as `/var/lib/koinos`. Confirm the
chain ID from the running node before restoring data or performing any signed
operation.

## Current public testnet

The current Koinos Foundation public testnet provides:

- JSON-RPC: `https://testnet.koinosfoundation.org/jsonrpc`
- REST: `https://testnet.koinosfoundation.org/v1/...`
- Health: `https://testnet.koinosfoundation.org/health`
- Faucet: `https://t.me/KoinosTestnetFaucetBot`

The testnet can reset. Retrieve its current chain ID before signing, and never
use production funds or durable production-state assumptions there.

At verification time, [`koinos/koinos-testnet`](https://github.com/koinos/koinos-testnet)
published endpoint and operations material but did **not** publish a complete
external operator bundle containing Compose, environment, config, genesis,
descriptors, peers, and compatible image tags. Endpoint access is not the same
as being able to run another node on that network.

This documentation therefore does not claim that copying the mainnet or
Harbinger bundle will start a node on the current public testnet.

## Harbinger

The upstream `koinos/koinos` repository still contains a `harbinger/` bundle.
Its last bundle update observed during this review was 2025-03-11. Harbinger is
a separate legacy/test network; it is not the current Koinos Foundation public
testnet.

Use a separate basedir and verify whether that network is still active before
using its files.

## Verify an endpoint

**Safety: read-only.** The script reads chain ID and head. Passing an expected
chain ID makes a mismatch fail closed.

<!-- node-example: query-network -->
```bash title="query-network.sh"
--8<-- "examples/node-operators/networks/query-network.sh:query-network"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/dev/examples/node-operators/networks/query-network.sh) ·
[Run locally](https://github.com/koinos/koinos-docs/tree/dev/examples/node-operators/networks)

The public testnet chain ID verified on 2026-07-25 was
`EiAIKVvm6-V2qmsmUvPJy09vCCLbtn9lHFpwrJbcTIEWRQ==`. Treat that value as a
verification expectation, not a promise that a resettable network can never
change.
