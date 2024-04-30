# Microservices

The Koinos node uses a microservice architecture. This means that the node consists of independently running programs that interact with one another, each performing a specific task, to implement all features of the node. Advantages of this architecture are cleaner implementations and better abstractions in the microservices themselves as well as greater flexibility for how a node is run. Docker compose runs each microservice on the same physical host, but in sandboxed environments. You can run all of the microservices on the host directly, but this can be tedious managing every binary individually. Microservices can even be run on different machines and communicate over the network.

The microservice architecture is explored in more depth [here](../architecture/microservices.md).

---
## Descriptions
Each microservice serves a specific purpose and not all are required. Below is a list of each microservice, its responsibilities, whether or not it is required, and what [compose profiles](./docker-compose-profiles.md) enables the microservice.

Required microservices are always enabled, while optional microservices are enabled with compose profiles.

|Microservice|Responsibilities|Required|Compose profiles|
|---|---|:-:|---|
|[Koinos Chain](https://github.com/koinos/koinos-chain)                             |Processing blocks and maintaining the state of the chain|X||
|[Koinos Block Store](https://github.com/koinos/koinos-block-store)                 |Storing block information|X||
|[Koinos P2P](https://github.com/koinos/koinos-p2p)                                 |P2P communication between node clusters|X||
|[Koinos Mempool](https://github.com/koinos/koinos-mempool)                         |Storing transactions that have yet to be included in blocks|X||
|[Koinos Transaction Store](https://github.com/koinos/koinos-transaction-store)     |Storing transaction information||`transaction_store`, `api`, `all`|
|[Koinos Block Producer](https://github.com/koinos/koinos-block-producer)           |The production of blocks||`block_producer`, `all`|
|[Koinos JSON-RPC](https://github.com/koinos/koinos-jsonrpc)                        |Providing API access from outside the cluster||`jsonrpc`, `api`, `all`|
|[Koinos gRPC](https://github.com/koinos/koinos-grpc)                               |Providing API access from outside the cluster||`grpc`, `api`, `all`|
|[Koinos Contract Meta Store](https://github.com/koinos/koinos-contract-meta-store) |Providing ABI data for smart contracts||`contract_meta_store`, `api`, `all`|
|[Koinos Account History](https://github.com/koinos/koinos-account-history)         |Providing records for each address||`account_history`, `api`, `all`|
