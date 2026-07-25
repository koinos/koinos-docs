# Block Producer

> [!IMPORTANT]
> **Internal draft — not published.** Block production is safety-sensitive.
> This page contains no key-management, registration, burn, or production
> procedure and must not be used as an operator guide.

## Purpose

Block Producer assembles candidate blocks from pending transactions, asks Chain
to validate the proposal, signs and submits blocks when production is enabled,
and schedules work based on the active consensus rules.

It is an optional service in the inspected Compose topology. A standard Koinos
node can validate and relay the chain without producing blocks.

## Dependencies and inputs

- RabbitMQ for internal RPC and broadcasts.
- Chain for head state, proposal validation, and block submission.
- Mempool for pending transactions and block-related state changes.
- Gossip-status information used to avoid producing without an adequate network
  view.
- Producer configuration and signing authority, which are operational and
  security concerns outside this Architecture draft.

## Outputs, RPCs, and broadcasts

Block Producer:

- requests pending transactions from Mempool;
- constructs a block candidate;
- uses Chain proposal and submission paths;
- signs a valid candidate when production conditions are satisfied; and
- submits the produced block for local validation and subsequent propagation.

The service does not expose a general public query API in the pinned
`koinos-proto` service list.

## Persistent state

Block Producer does not own canonical chain history. Its most sensitive durable
input is producer signing material, but key storage, unlocking, backup, and
rotation belong exclusively in reviewed Node Operators documentation.

Any additional scheduling or cached state in the selected release must be
verified before publication.

## Failure and consistency considerations

- Producing from a stale head can result in a block that is not selected by the
  network.
- Mempool, Chain, network status, and local time assumptions must be mutually
  compatible.
- A submitted proposal still requires normal Chain validation.
- Signing-key exposure is materially different from P2P identity exposure.
- Duplicate or concurrent producers using the same authority can create
  operational and consensus risks.
- A healthy process does not establish that the account is eligible or that
  produced blocks are being accepted.

## Verification before publication

- Confirm the current production scheduling and eligibility model.
- Map Mempool and gossip-status inputs to production stop conditions.
- Verify proposal, signing, submission, and retry sequencing.
- Confirm what state, if any, is persisted outside signing material.
- Obtain maintainer review for every consensus- or signing-sensitive claim.
- Link later to Node Operators for procedures; do not duplicate them here.

## Versioned sources

- [`koinos-block-producer` inspected revision](https://github.com/koinos/koinos-block-producer/tree/8896d7aabbe9e0d154a5f7860920e95d17fd8cb4)
- [`koinos-block-producer` service implementation](https://github.com/koinos/koinos-block-producer/blob/8896d7aabbe9e0d154a5f7860920e95d17fd8cb4/src/koinos_block_producer.cpp)
- [`koinos-proto` Chain proposal and submission methods](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/chain/chain_rpc.proto)
- [Pinned Compose profile](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
