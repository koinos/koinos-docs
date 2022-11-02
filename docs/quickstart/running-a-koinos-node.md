# Running a Koinos node

The Koinos cluster is comprised of multiple microservices. To simplify the deployment of the Koinos cluster, it is recommended to use the provided Docker compose script to launch a local node. The most time consuming part would be installing Docker, after that its just a matter of cloning the repository and running a single command.

## Installing on macOS/Linux

1. Download and install [Docker](https://www.docker.com/products/docker-desktop)
2. Clone (or download) the Koinos repository from [github](http://github.com/koinos/koinos)
3. Open the terminal in the downloaded directory and run the following command:

```console
$ docker compose --profile all up
```

## Installing on Windows

1. Download and install Docker
2. Clone (or download) the Koinos repository from [github](http://github.com/koinos/koinos)
3. Edit the first line in the .env file to read:

```console
BASEDIR=c:\koinos
```

4. Open the terminal in the downloaded directory and run the following command:

```console
$ docker-compose up
```

---

<center>
<a href="http://www.youtube.com/watch?feature=player_embedded&v=64NWplpcmqU
" target="_blank"><img src="http://img.youtube.com/vi/64NWplpcmqU/0.jpg"
alt="Install a koinos node video"  border="1" /></a>
</center>

<br />
<br />

## Managing a node

Nodes can be configured through two mechanisms, environment variables that change which servies are running, and the node config.

By default, each container will use `~/.koinos` on the host as their base directory. This can be changed by setting `BASEDIR` in `.env`, or exporting `BASEDIR`, to a different location on the host machine.

You will find `config.yml` in the base directory, which can be modified to change config on the microservices. At present, you need to restart docker compose for the new config to be applied. (That is a future TODO)

Different images can be run by setting environment variables or setting them in `.env`. For each microservice, append `_TAG` (e.g. `export P2P_TAG=64-auto-gossip`).

By default the node will only run core required microservices (chain, block_store, mempool, and p2p).

You can run optional microservices by enabling the associated docker compose profiles:

 - `block_production` to enable the block production.
 - `jsonrpc` to enable JSON-RPC API handling.
 - `transaction_store` to enable transaction history tracking.
 - `contract_meta_store` to enable service of contract ABIs.

These profiles can be set with the `--profile` options (i.e. `docker-compose --profile jsonrpc up `) or by setting the `COMPOSE_PROFILES` environment variable during invocation or in `.env`.

For more information on docker compose profiles, please read the official [documentation](https://docs.docker.com/compose/profiles/).

# Microservice options

These options can be set in the `config.yml`. If an option is shared by multiple microservices (such as `amqp`), you can set it for all of them by specifying it under `global`. Any option set for an individual microservice will override the global setting. Using this behavior you could enable debug level logging for one microservice while keeping info logs for the rest.

## Chain

 - `help`: Print this help message and exit
 - `version`: Print version string and exit
 - `basedir`: Koinos base directory
 - `amqp`: AMQP server URL
 - `log-level`: The log filtering level
 - `instance-id`: An ID that uniquely identifies the instance
 - `statedir`: The location of the blockchain state files (absolute path or relative to basedir/chain)
 - `jobs`: The number of worker jobs
 - `genesis-data`: The genesis data file
 - `statedir`: The location of the blockchain state files (absolute path or relative to basedir/chain)
 - `database-config`: The location of the database configuration file (absolute path or relative to basedir/chain)
 - `read-compute-bandwidth-limit`: The compute bandwidth when reading contracts via the API
 - `fork-algorithm`: The fork resolution algorithm to use. Can be 'pob', 'fifo', or 'block-time'. (Default: 'pob')
 - `reset`: Reset the database

## Mempool

 - `help`: Print this help message and exit
 - `basedir`: Koinos base directory
 - `amqp`: AMQP server URL
 - `log-level`: The log filtering level
 - `instance-id`: An ID that uniquely identifies the instance
 - `jobs`: The number of worker jobs

## Block Store

 - `basedir`: Koinos base directory
 - `amqp`: AMQP server URL
 - `log-level`: The log filtering level
 - `instance-id`: An ID that uniquely identifies the instance
 - `reset`: Reset the database

## P2P

 - `basedir`: Koinos base directory
 - `amqp`: AMQP server URL
 - `seed`: Seed string with which the node will generate an ID (A randomized seed will be generated if none is provided)
 - `peer`: Address of a peer to which to connect (may specify multiple)
 - `direct`: Address of a peer to connect using gossipsub.WithDirectPeers (may specify multiple) (should be reciprocal)
 - `log-level`: The log filtering level
 - `instance-id`: An ID that uniquely identifies the instance
 - `checkpoint`: Block checkpoint in the form height:blockid (may specify multiple times)
 - `force-gossip`: Force gossip mode
 - `disable-gossip`: Disable gossip mode
 - `listen`: The multiaddress on which the node will listen

## Block Producer

 - `help`: Print this help message and exit
 - `basedir`: Koinos base directory
 - `amqp`: AMQP server URL
 - `log-level`: The log filtering level
 - `instance-id`: An ID that uniquely identifies the instance
 - `algorithm`: The consensus algorithm to use
 - `jobs`: The number of worker jobs
 - `work-groups`: The number of worker groups
 - `private-key-file`: The private key file
 - `pow-contract-id`: The PoW contract ID
 - `pob-contract-id`: The PoB contract ID
 - `vhp-contract-id`: The VHP contract ID
 - `gossip-production`: Use p2p gossip status to determine block production
 - `resources-lower-bound`: The lower bound of resource utilization a newly created block will be considered adequate for submission
 - `resources-upper-bound`: The upper bound of resource utilization a newly created block should not exceed
 - `max-inclusion-attempts`: The maximum transaction inclusion attempts per block
 - `approve-proposals`: A list a proposal to approve when producing a block
 - `producer`: The beneficiary address used during PoB production

## Transaction Store

 - `basedir`: Koinos base directory
 - `amqp`: AMQP server URL
 - `log-level`: The log filtering level
 - `instance-id`: An ID that uniquely identifies the instance
 - `reset`: Reset the database

## JSON-RPC

 - `basedir`: Koinos base directory
 - `amqp`: AMQP server URL
 - `log-level`: The log filtering level
 - `instance-id`: An ID that uniquely identifies the instance
 - `descriptors`: The directory containing protobuf descriptors for rpc message types
 - `endpoint`: HTTP listen endpoint
 - `listen`: Multiaddr to listen on

## Contract Meta Store

 - `basedir`: Koinos base directory
 - `amqp`: AMQP server URL
 - `log-level`: The log filtering level
 - `instance-id`: An ID that uniquely identifies the instance
 - `reset`: Reset the database
