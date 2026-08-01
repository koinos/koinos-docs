---
icon: fontawesome/solid/link
---

# Chain

Chain is the consensus and execution service of a Koinos node. It validates
transactions and blocks, executes smart contracts, applies fork-choice rules,
and maintains the blockchain state used to validate the next block.

Other services store artifacts or build indexes, but Chain is the service that
decides whether a transaction or block is valid in the local node.

## Dependencies and inputs

Chain connects to RabbitMQ for internal RPC and broadcasts. Its main inputs are:

- transactions submitted by API services or received from peers;
- blocks received by P2P or created by Block Producer;
- the node's existing chain state; and
- the protocol rules, system calls, and system contracts active at that block.

Chain also queries Block Store and Mempool while catching up and coordinating
state with the rest of the node.

## Outputs and interfaces

Chain provides RPC methods for submitting blocks and transactions and for
reading state such as the chain ID, head block, fork heads, account nonce,
resource credits, resource limits, and contract results.

After processing data, it broadcasts events such as accepted blocks,
irreversible blocks, fork heads, accepted or failed transactions, and smart
contract events. These broadcasts let other services update without polling
Chain continuously.

## State and consistency

Chain stores consensus-critical state in a RocksDB-backed state database.
Accepted blocks are not necessarily irreversible: a competing fork can replace
recent accepted blocks. Services that build derived data must therefore follow
both fork changes and irreversible-block notifications.

If Chain is unavailable, the node cannot validate new network data or answer
authoritative state queries. An API process may still be reachable while its
Chain dependency is unavailable or behind.

!!! note "Operating the service"
    Data directories, synchronization, recovery, and health checks belong in
    [Node Operators](../../nodes/index.md).

## Versioned sources

- [`koinos-chain` v1.5.2](https://github.com/koinos/koinos-chain/tree/0ae99eced8b585c4145424e9c2a28f667796cc66)
- [Chain RPC schema in `koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/chain/chain_rpc.proto)
- [Current official Compose relationship](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
