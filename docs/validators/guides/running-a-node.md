# Running a Koinos node

The Koinos cluster is comprised of multiple microservices. To simplify the deployment of the Koinos cluster, it is recommended to use the provided Docker compose script to launch a local node. The most time consuming part would be installing Docker, after that its just a matter of cloning the repository and running a single command.

Before running a Koinos node, you should check that your system meets the Koinos node [minimum requirements](../node-requirements.md).

## Installing on macOS/Linux

1. Download and install [Docker](https://www.docker.com/products/docker-desktop)
2. Clone (or download) the Koinos repository from [github](http://github.com/koinos/koinos)
3. Copy `config-example` to `config` and `env.example` to `.env`
4. Open the terminal in the downloaded directory and run the following command:

```console
docker compose --profile all up -d
```

## Installing on Windows

1. Download and install Docker
2. Clone (or download) the Koinos repository from [github](http://github.com/koinos/koinos)
3. Copy `config-example` to `config` and `env.example` to `.env`
4. Edit the first line in the .env file to read:

```console
BASEDIR=c:\koinos
```

5. Open the terminal in the downloaded directory and run the following command:

```console
docker compose up -d
```

## Monitor the node

The above commands started a node in daemon mode, meaning the node is running in the background. This is usually preferable because you can close the terminal window used the start the node and it will continue running.

If you want the quickly check the status of your node run the following:

```
docker compose logs --tail 10 --follow
```

This will show the last 10 log lines from each microservice and then continue to follow the node live. The output will look something like:

``` { .txt, .no-copy }
mempool-1      | 2024-04-29 21:06:10.777572 (mempool.Koinos) [koinos_mempool.cpp:93] <info>: Recently added 0 transaction(s)
mempool-1      | 2024-04-29 21:07:10.878249 (mempool.Koinos) [koinos_mempool.cpp:93] <info>: Recently added 0 transaction(s)
mempool-1      | 2024-04-29 21:08:10.990809 (mempool.Koinos) [koinos_mempool.cpp:93] <info>: Recently added 0 transaction(s)
mempool-1      | 2024-04-29 21:09:11.102835 (mempool.Koinos) [koinos_mempool.cpp:93] <info>: Recently added 0 transaction(s)
mempool-1      | 2024-04-29 21:10:11.194259 (mempool.Koinos) [koinos_mempool.cpp:93] <info>: Recently added 0 transaction(s)
mempool-1      | 2024-04-29 21:11:11.280454 (mempool.Koinos) [koinos_mempool.cpp:93] <info>: Recently added 0 transaction(s)
mempool-1      | 2024-04-29 21:12:11.358301 (mempool.Koinos) [koinos_mempool.cpp:93] <info>: Recently added 0 transaction(s)
mempool-1      | 2024-04-29 21:13:11.469843 (mempool.Koinos) [koinos_mempool.cpp:93] <info>: Recently added 0 transaction(s)
mempool-1      | 2024-04-29 21:14:11.591098 (mempool.Koinos) [koinos_mempool.cpp:93] <info>: Recently added 0 transaction(s)
mempool-1      | 2024-04-29 21:15:11.707342 (mempool.Koinos) [koinos_mempool.cpp:93] <info>: Recently added 0 transaction(s)
block_store-1  | 2024-04-29 21:06:50.582163 (block_store.Koinos) [koinos-block-store/main.go:232] <info>: Recently added 22 block(s)
block_store-1  | 2024-04-29 21:07:50.582868 (block_store.Koinos) [koinos-block-store/main.go:232] <info>: Recently added 25 block(s)
block_store-1  | 2024-04-29 21:08:50.583576 (block_store.Koinos) [koinos-block-store/main.go:232] <info>: Recently added 16 block(s)
amqp-1         | 2024-04-23 19:18:49.197776+00:00 [info] <0.1013.0> accepting AMQP connection <0.1013.0> (172.19.0.7:40100 -> 172.19.0.2:5672)
jsonrpc-1      | 2024-04-23 19:18:44.946638 (jsonrpc.Koinos) [internal/jsonrpc.go:407] <info>: Registered descriptor package: koinos
jsonrpc-1      | 2024-04-23 19:18:44.946640 (jsonrpc.Koinos) [internal/jsonrpc.go:407] <info>: Registered descriptor package: koinos.contracts.pob
jsonrpc-1      | 2024-04-23 19:18:44.946643 (jsonrpc.Koinos) [internal/jsonrpc.go:407] <info>: Registered descriptor package: koinos.rpc
jsonrpc-1      | 2024-04-23 19:18:44.946645 (jsonrpc.Koinos) [internal/jsonrpc.go:407] <info>: Registered descriptor package: koinos.rpc.mempool
jsonrpc-1      | 2024-04-23 19:18:44.946647 (jsonrpc.Koinos) [internal/jsonrpc.go:407] <info>: Registered descriptor package: openapi.v3
block_store-1  | 2024-04-29 21:09:50.584569 (block_store.Koinos) [koinos-block-store/main.go:232] <info>: Recently added 21 block(s)
p2p-1          | 2024-04-29 21:14:57.029304 (p2p.Koinos) [node/node.go:377] <info>: Connected peers:
amqp-1         | 2024-04-23 19:18:49.198730+00:00 [info] <0.1013.0> connection <0.1013.0> (172.19.0.7:40100 -> 172.19.0.2:5672): user 'guest' authenticated and granted access to vhost '/'
block_store-1  | 2024-04-29 21:10:50.585147 (block_store.Koinos) [koinos-block-store/main.go:232] <info>: Recently added 22 block(s)
block_store-1  | 2024-04-29 21:11:50.586101 (block_store.Koinos) [koinos-block-store/main.go:232] <info>: Recently added 23 block(s)
chain-1        | 2024-04-29 21:15:30.165253 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062383, ID: 0x12205874b173de1e21bae0dc3f7b7e63fc1376ab8a14ae1ad3b8273b2042a5f8fc2b (0 transactions)
chain-1        | 2024-04-29 21:15:31.071760 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062384, ID: 0x1220c399b147b8e677b269f50e165d87c2d0e53eafbbc9ced39bcc0ac21876a494fb (0 transactions)
chain-1        | 2024-04-29 21:15:32.071882 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062385, ID: 0x12201c073d46707be23fec05c2c3fe220fc28ce8159677354176161f2a29a1cb559a (0 transactions)
chain-1        | 2024-04-29 21:15:34.073245 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062386, ID: 0x1220f349d8ef4743de5a072595806ce56e30b59c73c8c5d14cf9ff613116886d2aba (0 transactions)
chain-1        | 2024-04-29 21:15:40.071471 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062387, ID: 0x12200f3c871527ab8e0de78f22093620b1b408bed07ee5b784e7d21bda7bcf0cdbec (0 transactions)
chain-1        | 2024-04-29 21:15:47.073354 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062388, ID: 0x1220213be241aa0c4415c866b854765e2b5ed44531c26d2510dfa24b4aa5468b7f7c (0 transactions)
jsonrpc-1      | 2024-04-23 19:18:44.946659 (jsonrpc.Koinos) [koinos-jsonrpc/main.go:323] <info>: Listening on :8080/
jsonrpc-1      | 2024-04-23 19:18:45.943549 (jsonrpc.Koinos) [koinos-mq-golang@v1.0.1/connection.go:85] <info>: Dialing AMQP server amqp://guest:guest@amqp:5672/
block_store-1  | 2024-04-29 21:12:50.586813 (block_store.Koinos) [koinos-block-store/main.go:232] <info>: Recently added 20 block(s)
block_store-1  | 2024-04-29 21:13:50.587441 (block_store.Koinos) [koinos-block-store/main.go:232] <info>: Recently added 26 block(s)
amqp-1         | 2024-04-23 19:18:49.213808+00:00 [info] <0.1032.0> accepting AMQP connection <0.1032.0> (172.19.0.5:53930 -> 172.19.0.2:5672)
amqp-1         | 2024-04-23 19:18:49.214503+00:00 [info] <0.1032.0> connection <0.1032.0> (172.19.0.5:53930 -> 172.19.0.2:5672): user 'guest' authenticated and granted access to vhost '/'
amqp-1         | 2024-04-23 19:18:51.080136+00:00 [info] <0.1058.0> accepting AMQP connection <0.1058.0> (172.19.0.3:36350 -> 172.19.0.2:5672)
amqp-1         | 2024-04-23 19:18:51.081093+00:00 [info] <0.1058.0> connection <0.1058.0> (172.19.0.3:36350 -> 172.19.0.2:5672): user 'guest' authenticated and granted access to vhost '/'
amqp-1         | 2024-04-23 19:18:51.081671+00:00 [info] <0.1069.0> accepting AMQP connection <0.1069.0> (172.19.0.3:36362 -> 172.19.0.2:5672)
p2p-1          | 2024-04-29 21:14:57.029325 (p2p.Koinos) [node/node.go:379] <info>:  - /ip4/139.144.17.121/tcp/8888/p2p/QmcGiTpSm6YrmYo3rWoqrCPez2aJY4VdraBQsGsZKwFRuG
p2p-1          | 2024-04-29 21:14:57.029340 (p2p.Koinos) [node/node.go:379] <info>:  - /ip4/178.238.228.69/tcp/8888/p2p/QmdZEEQQedMH9eWrQXtUdptzvEd9nusGNi81Tca5iPq4Y4
p2p-1          | 2024-04-29 21:14:57.415417 (p2p.Koinos) [p2p/gossip.go:224] <info>: Recently gossiped 16 block(s) and 0 transaction(s)
p2p-1          | 2024-04-29 21:15:57.030221 (p2p.Koinos) [node/node.go:375] <info>: My address:
p2p-1          | 2024-04-29 21:15:57.030290 (p2p.Koinos) [node/node.go:376] <info>:  - /ip4/127.0.0.1/tcp/8888/p2p/QmevjAUbbZGciho3kQXAh55kNYxCXAmXgWDbx9Q2axtPTZ
p2p-1          | 2024-04-29 21:15:57.030296 (p2p.Koinos) [node/node.go:377] <info>: Connected peers:
p2p-1          | 2024-04-29 21:15:57.030307 (p2p.Koinos) [node/node.go:379] <info>:  - /ip4/139.144.17.121/tcp/8888/p2p/QmcGiTpSm6YrmYo3rWoqrCPez2aJY4VdraBQsGsZKwFRuG
p2p-1          | 2024-04-29 21:15:57.030314 (p2p.Koinos) [node/node.go:379] <info>:  - /ip4/178.238.228.69/tcp/8888/p2p/QmdZEEQQedMH9eWrQXtUdptzvEd9nusGNi81Tca5iPq4Y4
p2p-1          | 2024-04-29 21:15:57.415923 (p2p.Koinos) [p2p/gossip.go:224] <info>: Recently gossiped 23 block(s) and 0 transaction(s)
block_store-1  | 2024-04-29 21:14:50.588420 (block_store.Koinos) [koinos-block-store/main.go:232] <info>: Recently added 19 block(s)
amqp-1         | 2024-04-23 19:18:51.082166+00:00 [info] <0.1069.0> connection <0.1069.0> (172.19.0.3:36362 -> 172.19.0.2:5672): user 'guest' authenticated and granted access to vhost '/'
block_store-1  | 2024-04-29 21:15:50.588692 (block_store.Koinos) [koinos-block-store/main.go:232] <info>: Recently added 23 block(s)
chain-1        | 2024-04-29 21:15:48.072631 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062389, ID: 0x1220f7aacf52146711fa1a4de4128fd15b4308b1f00f55f66b5258354efe52be6bcb (0 transactions)
jsonrpc-1      | 2024-04-23 19:18:45.943823 (jsonrpc.Koinos) [koinos-mq-golang@v1.0.1/connection.go:88] <warning>: AMQP error dialing server: dial tcp 172.19.0.2:5672: connect: connection refused
jsonrpc-1      | 2024-04-23 19:18:48.945880 (jsonrpc.Koinos) [koinos-mq-golang@v1.0.1/connection.go:85] <info>: Dialing AMQP server amqp://guest:guest@amqp:5672/
jsonrpc-1      | 2024-04-23 19:18:48.948857 (jsonrpc.Koinos) [koinos-mq-golang@v1.0.1/client.go:136] <info>: Client connected
amqp-1         | 2024-04-23 19:18:51.209259+00:00 [info] <0.1093.0> accepting AMQP connection <0.1093.0> (172.19.0.7:40104 -> 172.19.0.2:5672)
amqp-1         | 2024-04-23 19:18:51.209814+00:00 [info] <0.1093.0> connection <0.1093.0> (172.19.0.7:40104 -> 172.19.0.2:5672): user 'guest' authenticated and granted access to vhost '/'
chain-1        | 2024-04-29 21:15:49.071084 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062390, ID: 0x1220d9df7230f2a24281354f4d7860a0467cabdd82c0478e2934bd1816aac7640523 (0 transactions)
chain-1        | 2024-04-29 21:16:03.073047 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062391, ID: 0x1220d305405c55669c7142702445c84037ff5faa32c3346db65a8ad2bca8b5fdf93d (0 transactions)
chain-1        | 2024-04-29 21:16:04.072380 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062392, ID: 0x122000ca93fc2222494fa8da86453bbd74ad941427652cc677ba2cd04bdfe7fb81fc (0 transactions)
chain-1        | 2024-04-29 21:16:10.071755 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062393, ID: 0x122027d81c885571b6e30a5ff23aa1a4306e6fd4d0a14f1a652a0950425c35dcb959 (0 transactions)
chain-1        | 2024-04-29 21:16:11.070651 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062394, ID: 0x12204f8f3a6fc5a9524108f6a1b545f6d971ca0f48fafb57cceae040f21490e7357c (0 transactions)
mempool-1      | 2024-04-29 21:16:11.815693 (mempool.Koinos) [koinos_mempool.cpp:93] <info>: Recently added 0 transaction(s)
chain-1        | 2024-04-29 21:16:12.070391 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062395, ID: 0x1220cf65e6ad5bb4b7cea907c3589844056977c9ae9c78228b15effb829977b0c03f (0 transactions)
chain-1        | 2024-04-29 21:16:13.069968 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062396, ID: 0x1220bff141e7bec8cfa85438d83ad761099082b86da97253afb688e9a82fe19e8793 (0 transactions)
chain-1        | 2024-04-29 21:16:14.070250 (chain.Koinos) [controller.cpp:434] <info>: Block applied - Height: 8062397, ID: 0x1220104208ba2ff9d91108e3c29ac0523c2c46dcb0c81488cf6f4e606744ae157048 (0 transactions)
```

## Node syncing

When you have just started you node, it will be syncing blocks from the network. These blocks were all created in the past. It is necessary to play through the entire history of the Koinos blockchain in order to have a correct view of the present state. Sync specific log messages will be output to give you a rough idea of how much progress the node has made. Using the same log command above, you can view the sync progress.

```
docker compose logs --tail 10 --follow
```

The sync logs will look something like this:

``` { .txt, .no-copy }
p2p-1          | 2024-04-29 21:19:12.840955 (p2p.Koinos) [p2p/peer_connection.go:142] <info>: Requesting blocks 441-941 from peer QmcGiTpSm6YrmYo3rWoqrCPez2aJY4VdraBQsGsZKwFRuG
p2p-1          | 2024-04-29 21:19:17.922615 (p2p.Koinos) [p2p/peer_connection.go:142] <info>: Requesting blocks 881-1381 from peer QmcGiTpSm6YrmYo3rWoqrCPez2aJY4VdraBQsGsZKwFRuG
chain-1        | 2024-04-29 21:19:19.667500 (chain.Koinos) [controller.cpp:450] <info>: Sync progress - Height: 1000, ID: 0x1220d24b4a274fa68090ce52889c7048ca3534d05df1fabaece454dba3c32a01856a (290d, 18h, 23m, 23s block time remaining)
block_store-1  | 2024-04-29 21:19:19.667951 (block_store.Koinos) [koinos-block-store/main.go:207] <info>: Sync block progress - Height: 1000, ID: 0x1220d24b4a274fa68090ce52889c7048ca3534d05df1fabaece454dba3c32a01856a
p2p-1          | 2024-04-29 21:19:23.018969 (p2p.Koinos) [p2p/peer_connection.go:142] <info>: Requesting blocks 1321-1821 from peer QmcGiTpSm6YrmYo3rWoqrCPez2aJY4VdraBQsGsZKwFRuG
p2p-1          | 2024-04-29 21:19:28.059747 (p2p.Koinos) [p2p/peer_connection.go:142] <info>: Requesting blocks 1761-2261 from peer QmcGiTpSm6YrmYo3rWoqrCPez2aJY4VdraBQsGsZKwFRuG
chain-1        | 2024-04-29 21:19:30.819182 (chain.Koinos) [controller.cpp:450] <info>: Sync progress - Height: 2000, ID: 0x12205f67e9a1b40136b49fb11620d1182c0b4e7921fd9ed27c2742e4a872262cfb40 (290d, 17h, 34m, 13s block time remaining)
block_store-1  | 2024-04-29 21:19:30.819673 (block_store.Koinos) [koinos-block-store/main.go:207] <info>: Sync block progress - Height: 2000, ID: 0x12205f67e9a1b40136b49fb11620d1182c0b4e7921fd9ed27c2742e4a872262cfb40
p2p-1          | 2024-04-29 21:19:33.063258 (p2p.Koinos) [p2p/peer_connection.go:142] <info>: Requesting blocks 2201-2701 from peer QmcGiTpSm6YrmYo3rWoqrCPez2aJY4VdraBQsGsZKwFRuG
```

The chain logs will show sync progress every 1000 blocks. The time remaining is not wall clock time, but block time remaining to sync.

## Next steps

Now that you have a Koinos node running, you may be interested in producing blocks or configuring your node. Any of these guides are great next steps to be able to better administer a Koinos node.

- [Block Production](./block-production.md)
- [Configuration](../configuration.md)
- [Docker Compose Profiles](../docker-compose-profiles.md)
- [Node Management](../node-management.md)
- [Node Security](../node-secruity.md)
