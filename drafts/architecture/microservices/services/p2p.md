# P2P

> [!IMPORTANT]
> **Internal draft — not published.** Peer protocol, synchronization, identity,
> and persistence details require focused verification before publication.

## Purpose

P2P connects a local Koinos node to other Koinos nodes. It discovers and manages
peers, exchanges blocks and transactions, reports peer status, and coordinates
block synchronization while still submitting received data to local consensus
validation.

P2P transports network data; it does not decide that a block or transaction is
valid.

## Dependencies and inputs

- RabbitMQ for RPC and broadcasts within the local node.
- Chain for chain ID, head, fork information, and submission of peer data.
- Block Store for serving blocks to peers and supporting synchronization.
- Remote Koinos peers using the service's libp2p-based peer RPC and gossip
  protocols.
- Local blocks and transactions that should be announced to peers after the
  relevant local acceptance conditions.

The inspected peer RPC implementation includes operations for chain ID, head
block, ancestor block ID, and block retrieval.

## Outputs, RPCs, and broadcasts

- Internal `get_gossip_status` RPC for observing current gossip/peer state.
- Gossip-status broadcasts consumed by interested local services.
- Peer-to-peer requests and responses for chain metadata and blocks.
- Block and transaction submissions to Chain for local validation.
- Outbound block and transaction gossip after local processing.

Exact gossip routing, suppression, retry, and validation order must be mapped
from a compatible release before publication.

## Persistent state

P2P does not own canonical chain state. The inspected foundation was not
sufficient to make a durable claim about every peer, identity, or address record
persisted by current releases.

Any persistent P2P identity or peer-store behavior must be documented only after
verification. Operational identity files and configuration belong in Node
Operators, not this page.

## Failure and consistency considerations

- A node can have healthy local services but no usable peers, preventing new
  network data from arriving.
- P2P must compare chain IDs before treating a peer as compatible.
- Received blocks and transactions still require Chain validation.
- Peer-reported head information is not locally authoritative.
- Synchronization depends on both peer availability and local Block Store and
  Chain progress.
- Restarting with a different P2P identity can affect peer continuity, but
  identity management is an operator concern.

## Verification before publication

- Pin and describe the current peer protocol and gossip versions.
- Verify peer discovery, connection management, and synchronization phases.
- Confirm the exact conditions for outbound block and transaction gossip.
- Establish current persistence behavior for peer identity and peer records.
- Confirm chain-ID rejection, fork synchronization, retry, and ban behavior.
- Keep addresses, seeds, ports, and identity procedures in Node Operators.

## Versioned sources

- [`koinos-p2p` inspected revision](https://github.com/koinos/koinos-p2p/tree/e2267ba230960b5e4100c16ad84c42cfc12eec4b)
- [`koinos-proto` P2P RPC definitions](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/p2p/p2p_rpc.proto)
- [`koinos-proto` gossip-status broadcast](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/broadcast/broadcast.proto)
- [Pinned Compose service](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
