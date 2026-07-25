# Networks

A Koinos network is identified by its genesis data and resulting chain ID.
Peers, transactions, contract addresses, basedirs, and keys are
network-specific.

Never mix the following between networks:

- `genesis_data.json`;
- peer configuration;
- chain or block-store directories;
- producer keys or wallet assumptions;
- contract addresses;
- serialized transactions or signatures.

## Mainnet

The `config-example/` and `env.example` files in the official
[`koinos/koinos`](https://github.com/koinos/koinos) repository configure
mainnet. This is the supported deployment covered by the observer guide.

Keep mainnet in its own absolute basedir, such as `/var/lib/koinos`. Confirm
the chain ID from the running node before restoring data or performing a
signed operation.

## Current public testnet

The current Koinos Foundation public testnet provides:

- JSON-RPC: `https://testnet.koinosfoundation.org/jsonrpc`
- REST: `https://testnet.koinosfoundation.org/v1/...`
- Health: `https://testnet.koinosfoundation.org/health`
- Faucet: `https://t.me/KoinosTestnetFaucetBot`

The testnet can reset. Retrieve its current chain ID before signing, and never
use production funds or durable production-state assumptions there.

At verification time,
[`koinos/koinos-testnet`](https://github.com/koinos/koinos-testnet) published
endpoint and operations information but did **not** publish a complete
external-operator bundle containing matching Compose, environment, config,
genesis, descriptors, peers, and image tags. Endpoint access is not the same
as being able to operate another node on that network.

This guide therefore does not tell operators to copy mainnet or Harbinger
files to run the current public testnet.

## Harbinger

The upstream `koinos/koinos` repository still contains a `harbinger/` bundle.
Its last bundle update observed during this review was 2025-03-11. Harbinger
is a separate legacy/test network; it is not the current Koinos Foundation
public testnet.

Use a separate basedir and first verify whether that network is still active.

## Check an endpoint

Query the chain ID and head directly through JSON-RPC. Replace the URL with
`http://127.0.0.1:8080/` to check your local observer:

```console
curl --fail https://api.koinos.io/jsonrpc \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"chain.get_chain_id","params":{},"id":1}'
```

```console
curl --fail https://api.koinos.io/jsonrpc \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"chain.get_head_info","params":{},"id":1}'
```

Compare the local chain ID with the intended network and confirm that the head
height continues to advance.

The public testnet chain ID observed on 2026-07-25 was
`EiAIKVvm6-V2qmsmUvPJy09vCCLbtn9lHFpwrJbcTIEWRQ==`. Treat that dated value as
a comparison point, not a promise that a resettable network can never change.
