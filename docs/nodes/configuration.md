---
icon: fontawesome/solid/gears
---

# Configuration
While we aim for the Koinos node to be usable by as many people as possible, there are times when you need to configure your node for your specific deployment. There are five files that can be used to configure your Koinos node. The first four are mapped in to the microservices themselves and are contained within the `config` directory. The last is the `.env` file that configures the cluster. The node provides two sets of configurations, one for mainnet which is contained in [config-example](https://github.com/koinos/koinos/tree/master/config-example) and [env.example](https://github.com/koinos/koinos/blob/master/env.example) in the root of the repo and another for the Harbinger testnet which is in the [harbinger](https://github.com/koinos/koinos/tree/master/harbinger) directory.

---
## Genesis data
`genesis_data.yml` isn't really a config file, but it is crucial to the operation of a Koinos node. The genesis data defines the initial state of the blockchain prior to the first block. This helps configuration some basic parameters of the blockchain and is also used to seed the snapshot balances of the KOIN token for the mainnet. The genesis data is also used to generate the chain ID of the specific blockchain which is used to uniquely identify the blockchain in the p2p network and prevents crosstalk between networks by requiring transactions specify the chain ID of their intended chain. This file should not be changed. Please note that the mainnet and Harbinger testnet configurations have different genesis data and mixing up those files will cause the node to malfunction.

---
## Koinos descriptors
`koinos_descriptors.pb` contains the Protobuf descriptors for all of the built in types used by the node. This file is used specifically by the JSON-RPC microservice in order to dynamically convert between JSON-RPC requests and the internal Protobuf requests. It should not need to changed manually, but should be updated every release of the Koinos node to match the most current descriptor file.

---
## RabbitMQ configuration
The Koinos node uses RabbitMQ to communicate between microservices. [rabbitmq.conf](https://github.com/koinos/koinos/blob/master/config-example/rabbitmq.conf) is the configuration for the AMQP microservice. It can be modified, but it is recommended only advanced users modify this file for specific use cases. The provided [rabbitmq.conf](https://github.com/koinos/koinos/blob/master/config-example/rabbitmq.conf) should be sufficient for nearly all Koinos node deployments. or more information on configuring Rabbit MQ, please read the official [documentation](https://www.rabbitmq.com/configure.html#config-items).

---
## Config YAML
[config.yml](https://github.com/koinos/koinos/blob/master/config-example/config.yml) contains the configuration specific to the Koinos microservices. The structure of the config has two main sections. The first is the `global` section which contains options that apply to multiple microservices. The second main second contains overrides for individual microservices. If an option is set for an individual microservice, it will override the value set in the `global` section. For example, if `log-level` is set to `info` in the `global` section, but you set `log-level` to `debug` in the `chain` section, then the Chain microservice will log at the `debug` level, while all other microservices will log at the `info` level.

Below are the config options for each microservice.

=== "Chain"
    |Option|Type|Description|Shared by|
    |---|---|---|---|
    | `help` | boolean | Print this help message and exit | All |
    | `version` | boolean | Print version string and exit | All |
    | `basedir` | string | Koinos base directory | All |
    | `amqp` | string | AMQP server URL | All |
    | `log-level` | enum | The log level (`debug`, `info`, `warn`, or `error`) | All |
    | `instance-id` | string | An ID that uniquely identifies the instance | All |
    | `jobs` | uint | The number of worker jobs (Default: system native concurrency) | All |
    | `read-compute-bandwidth-limit` | uint | The compute bandwidth when reading contracts via the API | None |
    | `genesis-data` | string | The genesis data file | None |
    | `statedir` | string | The location of the blockchain state files (absolute path or relative to basedir/chain) | `account_history` |
    | `reset` | boolean | Reset the database | `block_store`, `transaction_store`, `contract_meta_store`, `account_history` |
    | `fork-algorithm` | enum | The fork resolution algorithm to use. Can be `pob`, `fifo`, or `block-time`. (Default: `pob`) | `mempool`, `account_history` |

=== "Mempool"
    |Option|Type|Description|Shared by|
    |---|---|---|---|
    | `help` | boolean | Print this help message and exit | All |
    | `version` | boolean | Print version string and exit | All |
    | `basedir` | string | Koinos base directory | All |
    | `amqp` | string | AMQP server URL | All |
    | `log-level` | enum | The log level (`debug`, `info`, `warn`, or `error`) | All |
    | `instance-id` | string | An ID that uniquely identifies the instance | All |
    | `jobs` | uint | The number of worker jobs (Default: system native concurrency) | All |
    | `transaction-expiration` | uint | The number of seconds a transaction should expire in | None |
    | `fork-algorithm` | enum | The fork resolution algorithm to use. Can be `pob`, `fifo`, or `block-time`. (Default: `pob`) | `chain`, `account_history` |

=== "Block Store"
    |Option|Type|Description|Shared by|
    |---|---|---|---|
    | `help` | boolean | Print this help message and exit | All |
    | `version` | boolean | Print version string and exit | All |
    | `basedir` | string | Koinos base directory | All |
    | `amqp` | string | AMQP server URL | All |
    | `log-level` | enum | The log level (`debug`, `info`, `warn`, or `error`) | All |
    | `instance-id` | string | An ID that uniquely identifies the instance | All |
    | `jobs` | uint | The number of worker jobs (Default: system native concurrency) | All |
    | `reset` | boolean | Reset the database | `chain`, `transaction_store`, `contract_meta_store`, `account_history` |

=== "P2P"
    |Option|Type|Description|Shared by|
    |---|---|---|---|
    | `help` | boolean | Print this help message and exit | All |
    | `version` | boolean | Print version string and exit | All |
    | `basedir` | string | Koinos base directory | All |
    | `amqp` | string | AMQP server URL | All |
    | `log-level` | enum | The log level (`debug`, `info`, `warn`, or `error`) | All |
    | `instance-id` | string | An ID that uniquely identifies the instance | All |
    | `jobs` | uint | The number of worker jobs (Default: system native concurrency) | All |
    | `checkpoint` | string[] | Block checkpoint in the form height:blockid (may specify multiple times) | None |
    | `disable-gossip` | boolean | Disable gossip mode | None |
    | `force-gossip` | boolean | Force gossip mode | None |
    | `listen` | string | The multiaddress on which the node will listen | `jsonrpc` |
    | `peer` | string[] | Address of a peer to which to connect (may specify multiple) | None |
    | `seed` | string | Seed string with which the node will generate an ID (A randomized seed will be generated if none is provided) | None |

=== "Block Producer"
    |Option|Type|Description|Shared by|
    |---|---|---|---|
    | `help` | boolean | Print this help message and exit | All |
    | `version` | boolean | Print version string and exit | All |
    | `basedir` | string | Koinos base directory | All |
    | `amqp` | string | AMQP server URL | All |
    | `log-level` | enum | The log level (`debug`, `info`, `warn`, or `error`) | All |
    | `instance-id` | string | An ID that uniquely identifies the instance | All |
    | `jobs` | uint | The number of worker jobs (Default: system native concurrency) | All |
    | `algorithm` | enum | The consensus algorithm to use (`pob`, `pow,` or `federated`) | None |
    | `work-groups` | uint | The number of worker groups (For `pob` and `pow`) | None |
    | `private-key-file` | string | The private key file | None |
    | `pow-contract-id` | string | The PoW contract ID | None |
    | `max-inclusion-attempts` | string | The maximum transaction inclusion attempts per block | None |
    | `resources-lower-bound` | uint (0-100) | The lower bound of resource utilization a newly created block will be considered adequate for submission | None |
    | `resources-upper-bound` | uint (0-100) | The upper bound of resource utilization a newly created block should not exceed | None |
    | `gossip-production` | boolean | Use p2p gossip status to determine block production | None |
    | `producer` | string | The beneficiary address used during PoB production | None |
    | `approve-proposals` | string[] | A list a proposal to approve when producing a block | None |

=== "Transaction Store"
    |Option|Type|Description|Shared by|
    |---|---|---|---|
    | `help` | boolean | Print this help message and exit | All |
    | `version` | boolean | Print version string and exit | All |
    | `basedir` | string | Koinos base directory | All |
    | `amqp` | string | AMQP server URL | All |
    | `log-level` | enum | The log level (`debug`, `info`, `warn`, or `error`) | All |
    | `instance-id` | string | An ID that uniquely identifies the instance | All |
    | `jobs` | uint | The number of worker jobs (Default: system native concurrency) | All |
    | `reset` | boolean | Reset the database | `chain`, `block_store`, `contract_meta_store`, `account_history` |

=== "JSON-RPC"
    |Option|Type|Description|Shared by|
    |---|---|---|---|
    | `help` | boolean | Print this help message and exit | All |
    | `version` | boolean | Print version string and exit | All |
    | `basedir` | string | Koinos base directory | All |
    | `amqp` | string | AMQP server URL | All |
    | `log-level` | enum | The log level (`debug`, `info`, `warn`, or `error`) | All |
    | `instance-id` | string | An ID that uniquely identifies the instance | All |
    | `jobs` | uint | The number of worker jobs (Default: system native concurrency) | All |
    | `blacklist` | string[] | RPC targets to blacklist | `gRPC` |
    | `descriptors` | string | The directory containing protobuf descriptors for rpc message types | None |
    | `endpoint` | string | HTTP listen endpoint | `gRPC` |
    | `gateway-timeout` | uint | The timeout to enqueue a request (default 3) | None |
    | `listen` | string | Multiaddr to listen on | `p2p` |
    | `mq-timeout` | uint | The timeout for MQ requests (default 5) | `gRPC` |
    | `whitelist` | string[] | RPC targets to whitelist | `gRPC` |

=== "gRPC"
    |Option|Type|Description|Shared by|
    |---|---|---|---|
    | `help` | boolean | Print this help message and exit | All |
    | `version` | boolean | Print version string and exit | All |
    | `basedir` | string | Koinos base directory | All |
    | `amqp` | string | AMQP server URL | All |
    | `log-level` | enum | The log level (`debug`, `info`, `warn`, or `error`) | All |
    | `instance-id` | string | An ID that uniquely identifies the instance | All |
    | `jobs` | uint | The number of worker jobs (Default: system native concurrency) | All |
    | `blacklist` | string[] | RPC targets to blacklist | `jsonrpc` |
    | `endpoint` | string | HTTP listen endpoint | `jsonrpc` |
    | `mq-timeout` | uint | The timeout for MQ requests (default 5) | `jsonrpc` |
    | `whitelist` | string[] | RPC targets to whitelist | `jsonrpc` |

=== "Contract Meta Store"
    |Option|Type|Description|Shared by|
    |---|---|---|---|
    | `help` | boolean | Print this help message and exit | All |
    | `version` | boolean | Print version string and exit | All |
    | `basedir` | string | Koinos base directory | All |
    | `amqp` | string | AMQP server URL | All |
    | `log-level` | enum | The log level (`debug`, `info`, `warn`, or `error`) | All |
    | `instance-id` | string | An ID that uniquely identifies the instance | All |
    | `jobs` | uint | The number of worker jobs (Default: system native concurrency) | All |
    | `reset` | boolean | Reset the database | `chain`, `block_store`, `transaction_history`, `account_history` |

=== "Account History"
    |Option|Type|Description|Shared by|
    |---|---|---|---|
    | `help` | boolean | Print this help message and exit | All |
    | `version` | boolean | Print version string and exit | All |
    | `basedir` | string | Koinos base directory | All |
    | `amqp` | string | AMQP server URL | All |
    | `log-level` | enum | The log level (`debug`, `info`, `warn`, or `error`) | All |
    | `instance-id` | string | An ID that uniquely identifies the instance | All |
    | `jobs` | uint | The number of worker jobs (Default: system native concurrency) | All |
    | `statedir` | string | The location of the blockchain state files (absolute path or relative to basedir/account_history) | `chain` |
    | `reset` | boolean | Reset the database | `chain`, `block_store`, `transaction_history`, `contract_meta_store` |
    | `fork-algorithm` | enum | The fork resolution algorithm to use. Can be `pob`, `fifo`, or `block-time`. (Default: `pob`) | `chain`, `mempool` |

### Multiaddr
Some microservices use the multiaddr format. This is an abstraction and replacement for typical dotted decimal notation for a `protocol://address:port` URL. To learn more about the multiaddr (and multiformats) specification, please refer to the official [documentation](https://multiformats.io/multiaddr/).

---
## Environment
The `.env` file defines configuration for the node as a whole. The top section (`BASEDIR`, network bindings, and `COMPOSE_PROFILES`) will likely not need to change. However, on a new release of the Koinos node, you should always copy the new microservice versions and restart your node. Any of these values can be overridden temporarily by setting them in your environment.

|Variable|Description|
|---|---|
| `BASEDIR` | The basedir on the host system to be used by the Koinos node |
| `AMQP_INTERFACE` | The host interface that AMQP should bind to |
| `AMQP_PORT` | The host port that AMQP should bind to |
| `AMQP_ADMIN_INTERFACE` | The host interface that the AMQP admin interface should bind to |
| `AMQP_ADMIN_PORT` | The host port that the AMQP admin interface should bind to |
| `P2P_INTERFACE` | The host interface that the p2p microservice should bind to |
| `P2P_PORT` | The host port that the p2p microservice should bind to |
| `JSONRPC_INTERFACE` | The host interface that the JSON-RPC microservice should bind to |
| `JSONRPC_PORT` | The host port that the JSON-RPC microservice should bind to |
| `GRPC_INTERFACE` | The host interface that the gRPC microservice should bind to |
| `GRPC_PORT` | The host port that the gRPC microservice should bind to |
| `COMPOSE_PROFILES` | A list of compose profiles to enable on the node |
| `ACCOUNT_HISTORY_TAG` | The version of the Account History microservice to run |
| `BLOCK_PRODUCER_TAG` | The version of the Block Producer microservice to run |
| `BLOCK_STORE_TAG` | The version of the Block Store microservice to run |
| `CHAIN_TAG` | The version of the Chain microservice to run |
| `CONTRACT_META_STORE_TAG` | The version of the Contract Meta Store microservice to run |
| `GRPC_TAG` | The version of the gRPC microservice to run |
| `JSONRPC_TAG` | The version of the JSON-RPC microservice to run |
| `MEMPOOL_TAG` | The version of the Mempool microservice to run |
| `P2P_TAG` | The version of the p2p microservice to run |
| `TRANSACTION_STORE_TAG` | The version of the Transaction Store microservice to run |
