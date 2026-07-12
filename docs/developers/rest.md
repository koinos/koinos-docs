---
icon: fontawesome/solid/server
hide:
- toc
---

# REST API
The REST API provided by Koinos offers developers a convenient and straightforward way to interact with the blockchain using standard HTTP methods. This API simplifies integration and development by exposing intuitive HTTP endpoints for querying blockchain data, preparing transactions, submitting signed transactions, and interacting with smart contracts.

Public endpoints are available at:

- Mainnet: [`https://api.koinos.io`](https://api.koinos.io)
- Testnet: [`https://testnet.koinosfoundation.org`](https://testnet.koinosfoundation.org)

For example, the current head block information can be queried with:

```bash
curl https://api.koinos.io/v1/chain/head_info
```

Transaction endpoints are available under `/v1/transaction`, including `/v1/transaction/prepare` and `/v1/transaction/submit`. The REST API can help prepare and submit transactions, but applications are still responsible for safely managing accounts and signatures. If a transaction is already built and signed, it can be submitted over HTTP. If an application needs to create and sign transactions itself, it should use a Koinos-compatible signing library or service before calling the submit endpoint.

---
<swagger-ui src="./swagger.json">
