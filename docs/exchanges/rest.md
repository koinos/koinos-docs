---
icon: fontawesome/solid/server
---

# REST
The Koinos REST API provides a clean and simple way of interacting with the Koinos blockchain using standard HTTP methods. The API automatically handles de/serializations when interacting with smart contracts. It can also help with preparing and submitting a transaction.

You can view the [REST documentation](../developers/rest.md) to learn more.

Public REST endpoints are available at:

- mainnet: `https://api.koinos.io/v1/...`
- public testnet: `https://testnet.koinosfoundation.org/v1/...`

Preparing a transaction does not sign it. Submitting a transaction requires the
necessary signatures, which must be produced by a Koinos-compatible wallet,
SDK, or signing service.

The REST API is also available on
[Koinos**Pro**](https://koinos.pro) and through a node you operate. See
[Running a Koinos node](../nodes/running-node.md) and
[Docker Compose profiles](../nodes/docker-profiles.md) for the relevant
services.
