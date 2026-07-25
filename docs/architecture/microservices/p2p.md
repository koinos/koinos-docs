---
icon: fontawesome/solid/share-nodes
---

# P2P

P2P connects one Koinos node to other Koinos nodes. It discovers and manages
peers, exchanges transactions and blocks, and coordinates synchronization with
the network.

RabbitMQ connects services inside one node. P2P is the separate interface
between nodes.

## Dependencies and inputs

P2P uses:

- Chain for the chain ID, head and fork information, and validation of received
  transactions and blocks;
- Block Store when retrieving blocks to serve or synchronize;
- RabbitMQ for communication with local services; and
- libp2p protocols for connections and gossip with remote peers.

The peer protocol includes operations for comparing chain information and
retrieving blocks. Data received from a peer is never accepted solely because a
peer supplied it; P2P submits it to Chain for local validation.

## Outputs and interfaces

P2P announces locally accepted transactions and blocks to peers and forwards
received network data into the local node. It also provides a gossip-status RPC
and broadcasts gossip status for services such as Block Producer.

## State and consistency

P2P does not own canonical blockchain state. Peer-reported head information is
an observation used for synchronization, not a local consensus decision.

If P2P is unavailable or has no compatible connected peers, local services can
remain healthy while the node stops receiving new network data. Synchronization
also depends on Chain and Block Store making progress.

!!! note "Operating the service"
    Peer addresses, ports, identity files, and connectivity checks belong in
    [Node Operators](../../nodes/index.md).

## Versioned sources

- [`koinos-p2p` v1.3.0](https://github.com/koinos/koinos-p2p/tree/e2267ba230960b5e4100c16ad84c42cfc12eec4b)
- [P2P RPC schema in `koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/p2p/p2p_rpc.proto)
- [Current official Compose relationship](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
