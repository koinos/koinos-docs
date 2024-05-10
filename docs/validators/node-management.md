---
icon: fontawesome/solid/list-check
---

# Node management
While our goal is to make the Koinos node as easy to use as possible, inevitably, there will be times where you need to do some maintenance on the node. Here we have listed a few common tasks and how to complete them.

---
## Updating node
The most common task will likely be updating the node. Periodically, new versions of the Koinos node will be released and you will need to update your node based on the release.

If you are running a default configuration (no changes to `.env` or any config files), you can simple bring down your node with `docker compose down`, remove `.env` and `config`, copy the release files over the existing release, and follow the [getting started guide](./guides/running-a-node.md) to bring your node back up as though it were brand new.

If you have made changes to the default configuration, your upgrade process becomes a little more tricky. You still need to bring down your node with `docker compose down`. You can then either copy the new files over your current ones and re-apply the changes you had made. Or look over the new files and selectively apply updates. When changes are made to the config files, they should be documented in the release notes for that particular node version. Regardless of what changes you have made, `koinos_descriptors.pb` and the microservice tags in `.env` should always be updated to the release version.

You can then bring your node back up with `docker compose up -d` and you should be all set!

---
## Viewing logs
Sometimes you will need to inspect the logs from the node. That may be just to check that everything is operating as normal, or to investigate a problem with the node. There are two ways to view logs. The first is through Docker Compose. The second is through logs saved to disk.

To view logs through Docker Compose, you will use the `docker compose logs` command.

To view live logs, we recommend setting a tail on logs (to avoid showing all logs) and following along with the node.

```
docker compose logs --tail 10 --follow
```

If you want to see logs over a particular range, you can use the `--since` and `--until` flags to view logs over a time range. It is also recommended whenever viewing large log messages to save them to disk or pipe through a utility, such as `less`, to improve your ability to read through the logs.

```
docker compose logs --since 2024-04-15T10:00:00Z --until 2024-04-15T10:10:00Z | less
```

The second way you can view logs is through the logs stored on disk. By default, all logs are stored on disk in their respective microservice directories under `logs`. If your basedir is set to `~/.koinos` in `.env`, then you can find chain logs at `~/.koinos/chain/logs`. These files are truncated at regular interval to make it easier to manually parse them. This is usually not the preferred method of looking through logs, but it is good to have them backed up and to know where you can find them in case you need them. For example, if you update your node, `docker compose logs` will only return logs up until the last time you brought the node up, but the log directories will have logs from before then, which can be helpful.

---
## Restart node
Rarely you may encounter a bug that requires restarting the node. First, please file a [bug report](https://github.com/koinos/koinos/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml&title=%5BBUG%5D%3A+%3Ctitle%3E) so we can try an fix the bug. Second, run this command to restart your node:

```
docker compose restart
```

``` { .txt, .no-copy }
[+] Restarting 10/10
 ✔ Container koinos-transaction_store-1    Started             1.5s
 ✔ Container koinos-grpc-1                 Started            11.2s
 ✔ Container koinos-amqp-1                 Started             6.7s
 ✔ Container koinos-jsonrpc-1              Started             1.6s
 ✔ Container koinos-contract_meta_store-1  Started             1.4s
 ✔ Container koinos-block_store-1          Started             1.7s
 ✔ Container koinos-account_history-1      Started            11.3s
 ✔ Container koinos-p2p-1                  Started             1.7s
 ✔ Container koinos-chain-1                Started            11.3s
 ✔ Container koinos-mempool-1              Started            11.3s
```

---
## Restart a microservice
If you encounter a problem with a single microservice, you can restart a microservice on its own. Please file a bug report with the corresponding microservice repository. If you cannot find it, filing a [bug report](https://github.com/koinos/koinos/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml&title=%5BBUG%5D%3A+%3Ctitle%3E) on the Koinos repo is acceptable, and we will move it to the appropriate repo. Restarting an individual microservice is the same as restarting the entire node, except you specify the microservice(s) to restart.

```
docker compose restart chain mempool
```

``` { .txt, .no-copy }
[+] Restarting 2/2
 ✔ Container koinos-chain-1    Started                         0.8s
 ✔ Container koinos-mempool-1  Started                         0.8s
```

---
## Reindex
Reindex is a term used to describe when you need to rebuild the chain state. This involves replaying each block and reconstructing the current state from scratch. This can be helpful if the chain state somehow gets corrupted. We have had reports of this happening in extreme cases such as power loss, but this is extremely unlikely. If this does happen to you, please file a [bug report](https://github.com/koinos/koinos/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml&title=%5BBUG%5D%3A+%3Ctitle%3E) so we can diagnose and fix the issue.

There are a few microservices you can reset. Those are chain, blocks tore, transaction store, contract metastore, and account history. Usually you will just need to reset the chain microservice. To do so add the following to `config.yml`.

``` { .yml }
chain:
  reset: true
```

Then restart the chain microservice:

```
docker compose restart chain
```

Immediately after restarting chain, undo the changes to `config.yml`. The next time chain start, it will reset again if you do not undo the changes, which means if the host restarts, chain will reindex again. Reindexing can take a day or two, so it is best to only do it when necessary.

---
## Resync
In the worst case scenarios, a full resync may be required. This resets all microservices back to their initial state and resyncs the entire blockchain from the p2p network as though you were starting from scratch. If you need to resync and it is not related to some other known event, please file a [bug report](https://github.com/koinos/koinos/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml&title=%5BBUG%5D%3A+%3Ctitle%3E) so we can diagnose and fix the issue.

To resync, uncomment `reset: true` in `config.yml` under the `global` section. It should look something like:

``` { .yml }
global:
  amqp: amqp://guest:guest@amqp:5672/                 # AMQP server URL
  log-level: info                                     # Log filtering level (debug, info, warn, error)
  log-color: true                                     # Enable colors in logs
  log-datetime: true                                  # Enable datetime prefix in logs
  log-dir: logs                                       # The directory in which logs are stored
  instance-id: Koinos                                 # ID that uniquely identifies the instance
  fork-algorithm: pob                                 # Fork resolution algorithm (fifo, pob, block-time)
  blacklist:                                          # RPC targets to blacklist, can be an entire microservice (i.e. chain), or specific API calls
    - block_store.add_block
    - chain.propose_block
  # jobs: 32                                          # Number of jobs to run
  reset: true                                       # DANGEROUS: Resets the entire node. To reset a single microservice, set this in the microservice config
  # whitelist:                                        # RPC targets to whitelist
  # - RPC
```

Then restart your node:

```
docker compose restart
```

Immediately after restarting the node, undo the changes in `config.yml`. The next time the node starts, it will reset again if you do not undo the changes, which means if the host restarts, the entire node will reset and begin syncing from scratch again.
