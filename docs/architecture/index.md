---
hide:
  - toc
---

# Architecture

Koinos separates consensus, storage, networking, indexing, and public APIs into
cooperating services. Smart contracts provide application logic and can also
replace selected protocol behavior through the system-call architecture.

This chapter explains those boundaries and the consistency rules between them.
For commands and production procedures, use [Node Operators](../nodes/index.md).
For contract development, use
[Smart Contract Development](../contracts/index.md).

<div class="grid cards" markdown>

-   :fontawesome-solid-circle-nodes:{ .lg .middle } **Microservices**

    ---

    Understand the services inside a Koinos node, which service owns each kind
    of state, and how optional API and index services extend the core node.

    [:octicons-arrow-right-24: Explore the node](microservices.md)

-   :fontawesome-solid-network-wired:{ .lg .middle } **Internal messaging**

    ---

    See how protobuf RPC requests and broadcasts move through RabbitMQ, and why
    this internal bus is different from the peer-to-peer network.

    [:octicons-arrow-right-24: Follow a message](interprocess-communication.md)

-   :fontawesome-solid-code:{ .lg .middle } **Smart contract execution**

    ---

    Learn how Chain executes WebAssembly contracts, separates read-only calls
    from transactions, records state, and emits events.

    [:octicons-arrow-right-24: Enter the runtime](smart-contracts.md)

-   :fontawesome-solid-file-code:{ .lg .middle } **ABI and serialization**

    ---

    Understand how an ABI describes contract entry points and how Protocol
    Buffers encode data across APIs, services, transactions, and contracts.

    [:octicons-arrow-right-24: Understand the data](contract-abi.md)

-   :fontawesome-solid-left-right:{ .lg .middle } **System calls**

    ---

    Learn how contracts access blockchain capabilities and how system contracts
    can replace selected native behavior without changing the node executable.

    [:octicons-arrow-right-24: Cross the runtime boundary](system-calls.md)

-   :fontawesome-solid-microchip:{ .lg .middle } **Resource model**

    ---

    See how Koinos measures compute, network bandwidth, and disk storage and
    charges those resources in Resource Credits instead of conventional gas
    fees.

    [:octicons-arrow-right-24: Follow resource accounting](resources.md)

-   :fontawesome-solid-fire:{ .lg .middle } **Proof of Burn**

    ---

    Understand the relationship between KOIN, Virtual Hash Power, block
    production eligibility, and the VHP consumed during production.

    [:octicons-arrow-right-24: Understand consensus](proof-of-burn.md)

</div>

## Source baseline

The service architecture in this chapter follows the version set declared by
the official Koinos deployment bundle at commit
[`821674672e699bf56e94d7c0e8bce122e83d1482`](https://github.com/koinos/koinos/tree/821674672e699bf56e94d7c0e8bce122e83d1482).
RPC and broadcast definitions use
[`koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/tree/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80).
Versioned links on each page identify the implementation inspected for that
explanation.
