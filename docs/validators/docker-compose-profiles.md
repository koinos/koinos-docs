# Docker Compose profiles

Docker Compose profiles allow embedded different configurations within a single compose file. The Koinos node comes with several compose profiles configured that quickly enable common configurations. For more information on Docker Compose profiles, please read the official [documentation](https://docs.docker.com/compose/profiles/).

To enable a compose profile you can pass it in with the `--profile` option (i.e. `docker compose --profile jsonrpc up`), or by setting the `COMPOSE_PROFILES` environment variable in the shell or in `.env`. We recommend setting `COMPOSE_PROFILES` in `.env` so that you do not need to remember to add `--profile` to every compose command. For this reason, there is already a place to set `COMPOSE_PROFILES` in the provided `.env` example.

You can run additional microservices or set common configurations by enabled on, or more, of the following profiles:

 - `block_production` to enable the block production.
 - `jsonrpc` to enable JSON-RPC API handling.
 - `grpc` to enable gRPC API handling.
 - `transaction_store` to enable transaction history tracking.
 - `contract_meta_store` to enable service of contract ABIs.
 - `account_history` to enable account history tracking.
 - `api` to enable API related microservices (`jsonrpc`, `grpc`, `transaction_store`, `contract_meta_store`, and `account_history`).
 - `all` to enable all microservices.
