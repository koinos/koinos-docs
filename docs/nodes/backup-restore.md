# Backup and restore

This chapter gives a direct, staged procedure for recovering a Koinos node.

The public backup is useful for avoiding a full mainnet synchronization. It is
not a replacement for your private configuration, peer identity, wallet, or
producer-key backups.

The example paths below are:

- `/opt/koinos`: the official deployment checkout;
- `/var/lib/koinos`: the active node data;
- `/srv/koinos-restore`: temporary download and extraction space.

Confirm your real paths in `.env` before running any command. Do not adapt this
procedure to another network.

## What to back up privately

Keep separate recovery copies according to their sensitivity:

| Data | Typical location | Recovery purpose |
| --- | --- | --- |
| deployment and configuration | checkout, `.env`, `config/` | reproduce the reviewed node |
| producer and wallet keys | operator-defined key storage | recover authority |
| P2P identity | `BASEDIR/p2p` | retain the peer identity |
| core public data | `BASEDIR/chain`, `BASEDIR/block_store` | avoid a full synchronization |
| optional indexes | transaction, account, contract metadata stores | avoid index rebuild time |

Encrypt keys and identities before copying them off-host. Store the decryption
secret separately and test a restoration in an isolated directory.

## About the public mainnet backup

Verified on **2026-07-25**, the Koinos Foundation seed host published:

- `koinos-backup.tar.gz`;
- `koinos-backup.tar.gz.metadata`;
- `koinos-backup.tar.gz.sha256`.

The observed metadata dated the snapshot **2026-07-19 02:39:13 UTC** and
reported approximately **57 GB compressed**. Always open the current
[backup directory](https://seed.koinosfoundation.org/backups/) and read the
current metadata before downloading. The filename, size, date, checksum, and
layout can change.

!!! warning "Do not extract the archive directly into `/`"
    The published metadata currently shows a direct extraction command. Do
    not use it. First verify the checksum and archive paths, extract into a
    staging directory, and install only `chain` and `block_store`.

## 1. Prepare enough space

You need room for:

- the compressed archive;
- the extracted `chain` and `block_store`;
- the previous local data retained for rollback.

Check both the active data filesystem and staging filesystem:

```console
df -h /var/lib/koinos /srv
du -sh /var/lib/koinos
```

Create a staging directory owned by the node operator:

```console
sudo install -d -m 750 -o koinos -g koinos /srv/koinos-restore
cd /srv/koinos-restore
```

Replace `koinos` with the real operator account.

## 2. Download the metadata and backup

Download the three current files directly from the Foundation seed:

```console
curl --fail --location --remote-name \
  https://seed.koinosfoundation.org/backups/koinos-backup.tar.gz.metadata
curl --fail --location --remote-name \
  https://seed.koinosfoundation.org/backups/koinos-backup.tar.gz.sha256
curl --fail --location --continue-at - --remote-name \
  https://seed.koinosfoundation.org/backups/koinos-backup.tar.gz
```

`--continue-at -` allows `curl` to resume an interrupted large download.

Read the metadata before continuing:

```console
less koinos-backup.tar.gz.metadata
```

Stop if it does not describe the intended mainnet backup or if you cannot
provide the required free space.

## 3. Verify the download and archive paths

Print the downloaded archive checksum:

```console
sha256sum koinos-backup.tar.gz
```

Then display the published checksum:

```console
cat koinos-backup.tar.gz.sha256
```

The two 64-character SHA-256 values must match exactly. The published file
currently contains the seed host's absolute source path, so running
`sha256sum -c` against it directly is not portable.

Inspect the archive member names without extracting anything:

```console
tar -tzf koinos-backup.tar.gz | less
```

Continue only when:

- no member begins with `/`;
- no member contains `../`;
- the listing contains `.koinos/chain/`;
- the listing contains `.koinos/block_store/`.

If the current archive uses a different layout, stop and review the procedure
instead of guessing new extraction paths.

## 4. Stop the node and preserve local state

From the official checkout, stop the node cleanly:

```console
cd /opt/koinos
docker compose stop
docker compose ps
```

Wait until no Koinos service is running.

Create a dated rollback directory. Replace the date in this example with the
actual maintenance date:

```console
sudo mkdir /var/lib/koinos-before-restore-2026-07-25
```

Move the current core data there:

```console
sudo mv /var/lib/koinos/chain \
  /var/lib/koinos-before-restore-2026-07-25/
sudo mv /var/lib/koinos/block_store \
  /var/lib/koinos-before-restore-2026-07-25/
```

Also move any existing `mempool`, `transaction_store`, `account_history`, and
`contract_meta_store` directories into the same rollback directory. Move only
directories that exist.

Do **not** move or replace:

- `.env` or the deployment checkout;
- `config/`;
- the local `p2p` directory;
- wallets or producer keys.

## 5. Extract only the core public data

Return to the staging directory and create an empty extraction target:

```console
cd /srv/koinos-restore
mkdir extracted
```

Extract only the two paths confirmed in the listing:

```console
tar -xzf koinos-backup.tar.gz -C extracted \
  .koinos/chain .koinos/block_store
```

Copy the staged core data into the active basedir:

```console
sudo cp -a extracted/.koinos/chain /var/lib/koinos/
sudo cp -a extracted/.koinos/block_store /var/lib/koinos/
sudo chown -R --reference=/var/lib/koinos \
  /var/lib/koinos/chain /var/lib/koinos/block_store
```

Before startup, confirm that `chain.verify-blocks` is `true` in the active
`/opt/koinos/config/config.yml`. Keep the active mainnet genesis data,
descriptors, peer identity, and image versions from your reviewed deployment
bundle.

## 6. Start and validate

Start the same profiles that were active before the restore:

```console
cd /opt/koinos
docker compose up -d
docker compose ps
docker compose logs --tail 100 --follow chain block_store p2p
```

Do not remove the rollback directory yet. Confirm:

- every expected container remains running;
- the local chain ID is mainnet;
- block verification reports no errors;
- the head advances and becomes recent;
- peers and gossip are active;
- disk space remains safe;
- any enabled JSON-RPC, REST, or gRPC endpoint responds normally.

Optional index services will rebuild their local data because this procedure
installs only `chain` and `block_store`.

## Roll back

If validation fails:

1. stop the node cleanly;
2. move the newly installed `chain` and `block_store` into a separate failed
   restore directory;
3. move the previous directories from
   `/var/lib/koinos-before-restore-2026-07-25/` back into
   `/var/lib/koinos/`;
4. restore any previous optional-index directories;
5. start the previous reviewed deployment and run the same health checks.

Do not delete either generation until the recovered node has remained healthy.

The current public testnet has query endpoints but no verified public
external-operator bundle. Do not substitute testnet or Harbinger files into
this mainnet procedure.
