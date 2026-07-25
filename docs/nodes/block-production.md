# Block production

Koinos mainnet uses Proof-of-Burn (PoB). KOIN is irreversibly burned to obtain
Virtual Hash Power (VHP), and a producer signing key is registered to the
account that owns the VHP.

!!! danger "Do not start here"
    First operate a fully synchronized observer. Confirm mainnet chain ID,
    advancing fresh head, active peers and gossip, safe disk space, clean logs,
    working backups, and a tested disable and rollback procedure.

The current public testnet can be queried but, at the verification date, did
not publish a complete external-operator node bundle. Do not substitute
Harbinger or mainnet files to rehearse production there.

## Separate authority and signing

Use different keys for:

- the wallet account that holds KOIN/VHP and authorizes on-chain actions;
- the hot producer key that signs blocks on the node.

The producer service stores its generated key under
`BASEDIR/block_producer/private.key` by default and writes the corresponding
`public.key`. Confirm the literal absolute `BASEDIR` in `.env`; do not assume
that opening a shell automatically exports that value.

Before adding the producer account to `config.yml`, create the key directory
with owner-only access. Replace `koinos` with the real operator account:

```console
sudo install -d -m 700 -o koinos -g koinos \
  /var/lib/koinos/block_producer
```

Start the producer profile only long enough to create the key, then stop it:

```console
cd /opt/koinos
docker compose --profile block_producer up -d block_producer
docker compose logs --tail 50 block_producer
docker compose stop block_producer
```

Confirm that `private.key` and `public.key` now exist before continuing. Apply
owner-only permissions to the private material. These commands assume
`BASEDIR=/var/lib/koinos`:

```console
sudo chmod 700 /var/lib/koinos/block_producer
sudo chmod 600 /var/lib/koinos/block_producer/private.key
sudo chmod 644 /var/lib/koinos/block_producer/public.key
sudo chown -R koinos:koinos /var/lib/koinos/block_producer
ls -ld /var/lib/koinos/block_producer
ls -l /var/lib/koinos/block_producer
```

Verify the owner as well as the mode. Encrypt the private key before storing
an off-host recovery copy, keep the decryption material separately, and test
recovery without replacing the live key.

## Verify current mainnet inputs

On **2026-07-25**, the current `koinos-cli` mainnet startup file at commit
`60caabb4c9b17c89b77f18630b0fbe144de5ba8a` registered the PoB contract at
`159myq5YUhhoVWu3wsHKHiJYKPKGUrGiyv`. A live read of its ABI confirmed the
write methods `register_public_key(producer, public_key)` and
`burn(token_amount, burn_address, vhp_address)`.

Those values are time-sensitive. Before signing:

1. connect the current CLI to the intended local mainnet RPC;
2. query and compare the chain ID;
3. verify the current PoB address from an official versioned CLI startup file;
4. use CLI `help` for both current PoB methods;
5. verify KOIN decimals and the exact smallest-unit amount;
6. verify wallet, producer account, VHP recipient, producer public key,
   fees/mana, and remaining liquid KOIN;
7. review the transaction summary through a second channel.

The command shapes below are a non-executable checklist:

```text
register pob <VERIFIED_MAINNET_POB_CONTRACT>
open <WALLET_FILE>
address
pob.register_public_key <PRODUCER_ACCOUNT> <PRODUCER_PUBLIC_KEY>
pob.burn <TOKEN_AMOUNT_IN_SMALLEST_UNITS> <BURN_ADDRESS> <VHP_ADDRESS>
```

**Registration changes on-chain authority. Burning permanently destroys
KOIN.** Never paste a historical amount or address, and never burn the balance
needed for future mana and operations.

After broadcasting, record transaction IDs, confirm finality through an
independent mainnet endpoint, and read the producer registration back from
chain before enabling the service.

## Configure production

Edit the active `/opt/koinos/config/config.yml` from the selected official
bundle. Under `block_producer`, set only the reviewed values:

| Setting | Required decision |
| --- | --- |
| `algorithm` | `pob` for mainnet |
| `producer` | exact account that owns the VHP |
| `private-key-file` | filename inside `BASEDIR/block_producer` |
| `pob-production` | deliberate percentage from 1 to 100 |

Keep JSON-RPC private. In `.env`, set
`COMPOSE_PROFILES=block_producer,jsonrpc`; do not use `all`, which also enables
every API and index service.

Validate the complete configuration:

```console
cd /opt/koinos
docker compose config
```

Start only after the observer, key, registration, and backup gates pass:

```console
docker compose up -d
docker compose ps
docker compose logs --tail 100 --follow block_producer chain p2p
```

## Confirm production

A local “Produced block” log line is not enough. For each first-production or
post-change check:

1. record the produced block ID from the bounded producer logs;
2. query that block ID from the local block store;
3. query the same block ID through an independently operated mainnet endpoint
   or explorer;
4. confirm that both sources return the same block and height;
5. continue monitoring for rejected blocks, lost peers, stale head, key-read
   errors, and resource exhaustion.

## Disable and rotate

To disable production, remove `block_producer` from `COMPOSE_PROFILES`, apply
the Compose configuration, and confirm the container is absent:

```console
cd /opt/koinos
docker compose up -d --remove-orphans
docker compose ps
```

For suspected key compromise:

1. stop and disable the producer immediately;
2. preserve logs and transaction evidence without exposing the key;
3. generate a replacement key on a hardened host with restrictive permissions;
4. verify its public key through a second channel;
5. re-register deliberately through the current PoB ABI and CLI;
6. confirm the new association from an independent endpoint;
7. start with the replacement key and verify a canonical block;
8. revoke access to and securely retire old key copies.

Re-registration is an on-chain authority change. Store an encrypted recovery
generation and rehearse the operational sequence before an incident.
