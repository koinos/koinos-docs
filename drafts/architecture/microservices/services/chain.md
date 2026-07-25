# Chain

> [!IMPORTANT]
> **Internal draft — not published.** Consensus-sensitive descriptions require
> review against a coherent release and confirmation by Koinos maintainers.

## Purpose

Chain is the authoritative service for Koinos consensus validation and
blockchain state. It validates transactions and blocks, executes contracts,
applies the protocol's fork-choice rules, and exposes state-dependent queries.

Other services can store artifacts or derived views, but they do not replace
Chain's decision about accepted canonical state.

## Dependencies and inputs

- RabbitMQ for internal protobuf RPC and broadcasts.
- Submitted transactions and blocks from P2P, Block Producer, API gateways, or
  other authorized internal callers.
- Protocol rules, system calls, and contract execution behavior provided by the
  matching Koinos runtime and system-contract revisions.
- Previously committed chain state and block context needed during validation.

The inspected implementation also observes accepted-block messages as part of
its indexing and catch-up behavior. The exact startup sequence and replay
contract need release-level verification.

## Outputs, RPCs, and broadcasts

The pinned protocol revision defines Chain RPC methods for:

- submitting a block or transaction;
- reading head information, chain ID, and fork heads;
- reading a contract and account nonce or resource-credit state;
- reading resource limits;
- invoking a system call; and
- proposing a block for validation before submission.

Not every internal method is necessarily exposed by every public API gateway.

The inspected Chain service emits broadcasts for accepted blocks, irreversible
blocks, fork heads, accepted transactions, failed transactions, and contract
events.

## Persistent state

The inspected implementation uses RocksDB-backed state storage. Chain owns the
consensus-critical state required to validate subsequent transactions and
blocks. Its persistent data must be compatible with the exact executable and
protocol revision.

Architecture documentation should describe ownership and consistency, while
backup, restore, reindex, and resync procedures remain in Node Operators.

## Failure and consistency considerations

- Chain unavailability prevents authoritative validation and state-dependent
  service calls.
- A response from an API gateway is only as current as the Chain instance it
  reached.
- Non-irreversible blocks can be displaced by a fork; consumers must not treat
  acceptance as irreversibility.
- A block broadcast and the catch-up state of every downstream index are
  separate conditions.
- Incompatible state, runtime, or system-contract versions are
  consensus-sensitive and cannot be resolved by an API-layer retry.
- Running multiple writers against the same state requires explicit support;
  it must not be inferred from the microservice design.

## Verification before publication

- Pin a compatible Koinos release, runtime, system-contract, and proto set.
- Confirm the fork-choice and irreversible-block terminology intended for the
  target audience.
- Map internal Chain methods to the methods deliberately exposed through
  JSON-RPC, gRPC, and REST.
- Confirm the accepted-block subscription, replay, and startup behavior.
- Obtain maintainer review for any description of validation, execution,
  receipts, resource accounting, or fork resolution.

## Versioned sources

- [`koinos-chain` inspected revision](https://github.com/koinos/koinos-chain/tree/0ae99eced8b585c4145424e9c2a28f667796cc66)
- [`koinos-chain` service implementation](https://github.com/koinos/koinos-chain/blob/0ae99eced8b585c4145424e9c2a28f667796cc66/src/koinos_chain.cpp)
- [`koinos-proto` Chain RPC definitions](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/chain/chain_rpc.proto)
- [`koinos-proto` broadcast definitions](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/broadcast/broadcast.proto)
