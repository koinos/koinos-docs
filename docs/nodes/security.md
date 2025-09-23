---
icon: fontawesome/solid/lock
---

# Node security
While the Koinos node is fairly self contained, there are a few points you should be aware of in order to secure your Koinos node.

---
## Port bindings
The default configuration only has the p2p microservice connect to an external network. All other microservices bind to localhost. This is purely for development and debugging purposes. The AMQP, p2p, JSON-RPC, and gRPC microservices are all configured to bind ports on the host machine. They all have `INTERFACE` and `PORT` environment variables in [`.env`](https://github.com/koinos/koinos/env.example). Unless you have an important reason to do so, such as running a public API node, it is strongly recommended to leave these values as is, and only bind to the localhost. By default, no modern operating system will expose localhost port bindings to an external network unless explicitly configured to do so.

---
## API blacklist
Certain API calls are not suited to be exposed publicly. Specifically those are `block_store.add_block` and `chain.propose_block`. In the default config, these API calls are blacklisted. We recommend they remain blacklisted. If these API calls were made public, the internal node state could be corrupted or the node could suffer from a denial of service attack. These are critical internal APIs that should not be exposed publicly.
