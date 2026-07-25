# Block production

Koinos mainnet uses Proof-of-Burn (PoB). KOIN is irreversibly burned to obtain
Virtual Hash Power (VHP), and a producer signing key is registered to the
account that owns the VHP. This role combines a hot signing key with
irreversible on-chain preparation.

!!! danger "Do not start here"
    First run a fully synchronized, healthy observer. Confirm mainnet chain ID,
    advancing fresh head, active peers and gossip, safe disk headroom, clean
    logs, working backups, and a tested disable/rollback procedure.

The current public testnet can be queried but, at the verification date, did
not publish a complete external-operator node bundle. Therefore this guide
does not pretend that a block-producer rehearsal is possible on that network.
Do not substitute Harbinger or mainnet files. Use a separately engineered
private development network or wait for an authoritative testnet operator
bundle before rehearsing.

## Separate authority and signing

Use different keys for:

- the wallet account that holds KOIN/VHP and authorizes on-chain actions;
- the hot producer key that signs blocks on the node.

The producer service uses `BASEDIR/block_producer/private.key` by default. It
generates a key when that file is absent and writes the corresponding
`public.key`. `BASEDIR` is a value in the checkout's `.env`; `.env` does not
automatically export `BASEDIR` into an interactive shell. Resolve and verify
the literal absolute value before inspecting either file.

Set a restrictive umask before the first producer start, stop the service after
key creation, and apply owner-only permissions. The helper defaults to dry-run.

<!-- node-example: harden-producer-key -->
```bash title="harden-producer-key.sh"
--8<-- "examples/node-operators/block-producer/harden-producer-key.sh:harden-producer-key"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/dev/examples/node-operators/block-producer/harden-producer-key.sh) ·
[Use locally](https://github.com/koinos/koinos-docs/tree/dev/examples/node-operators/block-producer)

Verify Unix ownership as well as mode. Encrypt the producer key before storing
an off-host recovery copy, keep decryption material separately, and test
recovery without replacing the live key.

## Verify current mainnet inputs

On **2026-07-25**, the current `koinos-cli` mainnet startup file at commit
`60caabb4c9b17c89b77f18630b0fbe144de5ba8a` registered the PoB contract at
`159myq5YUhhoVWu3wsHKHiJYKPKGUrGiyv`. A live read of that contract's ABI
confirmed the write methods `register_public_key(producer, public_key)` and
`burn(token_amount, burn_address, vhp_address)`.

These values are time-sensitive. Before signing:

1. connect the current CLI to the intended local mainnet RPC;
2. query and compare the chain ID;
3. verify the current PoB address from an official versioned CLI/startup file;
4. use CLI `help` for both dynamic PoB methods;
5. verify the KOIN decimals and convert the intended human amount to the exact
   smallest-unit integer;
6. verify wallet address, producer account, VHP recipient, producer public key,
   fees/mana, and remaining liquid KOIN;
7. review the unsigned operation or transaction summary on a second channel.

The current command shapes are shown below only as a checklist; placeholders
make them non-executable:

```text
register pob <VERIFIED_MAINNET_POB_CONTRACT>
open <WALLET_FILE>
address
pob.register_public_key <PRODUCER_ACCOUNT> <PRODUCER_PUBLIC_KEY>
pob.burn <TOKEN_AMOUNT_IN_SMALLEST_UNITS> <BURN_ADDRESS> <VHP_ADDRESS>
```

**Safety: irreversible-on-chain.** Registration changes the public-key
association. Burning permanently destroys KOIN. Never paste a historical
example amount or address, never automate either action in CI, and never burn
the full balance needed for future mana and operations.

After broadcasting, record transaction IDs and confirm finality through an
independent mainnet endpoint. Read the PoB registration back from chain before
enabling production.

## Configure, but do not start implicitly

The full mainnet example has an invalid producer placeholder. Replace it with
the exact VHP-owning producer account and compare the entire file with the
official configuration from the selected bundle.

**Safety: service-changing when installed.**

<!-- node-example: producer-config -->
```yaml title="config.yml"
--8<-- "examples/node-operators/block-producer/config.yml:producer-config"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/dev/examples/node-operators/block-producer/config.yml) ·
[Use locally](https://github.com/koinos/koinos-docs/tree/dev/examples/node-operators/block-producer)

Preserve the existing config, validate YAML and `docker compose config`, and
keep JSON-RPC private. Set `COMPOSE_PROFILES=block_producer,jsonrpc` or invoke
the explicit `block_producer` profile. Do not use `all`: it also enables every
API and index service.

Start only after the observer and on-chain registration gates pass. Watch the
bounded producer/chain/P2P logs for errors, but do not treat a local
`Produced block` message as canonical acceptance.

## Confirm canonical acceptance

The read-only verifier extracts the latest produced block ID, confirms it in
the local block store, then waits for the same ID at a separately selected
canonical endpoint.

<!-- node-example: verify-production -->
```bash title="verify-production.sh"
--8<-- "examples/node-operators/block-producer/verify-production.sh:verify-production"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/dev/examples/node-operators/block-producer/verify-production.sh) ·
[Run locally](https://github.com/koinos/koinos-docs/tree/dev/examples/node-operators/block-producer)

Alert on key-read errors, lost gossip/peers, stale head, repeated rejected
blocks, resource exhaustion, or produced blocks that never appear on the
canonical chain.

## Disable and rotate

To disable production, remove `block_producer` from `COMPOSE_PROFILES` and
recreate the selected services; confirm that the producer container is absent.
Keep the key protected while deciding whether it should remain registered.

For suspected key compromise:

1. stop and disable the producer immediately;
2. preserve logs and transaction evidence without exposing the key;
3. generate a replacement key on a hardened host with restrictive permissions;
4. verify its public key through a second channel;
5. use the current PoB ABI/CLI to re-register deliberately;
6. confirm the new association from an independent endpoint;
7. start with the replacement key and verify a canonical block;
8. revoke access to and securely retire old key copies according to policy.

Re-registration is itself an on-chain authority change. Store an encrypted
recovery generation and rehearse this sequence before an incident.
