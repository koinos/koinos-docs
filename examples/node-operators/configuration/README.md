# Configuration example

`config.yml` is a complete, conservative mainnet configuration derived from
the official `config-example/config.yml` at deployment-bundle commit
`821674672e699bf56e94d7c0e8bce122e83d1482`.

It retains the two critical RPC blacklist entries and enables block
verification. It leaves block production unconfigured. Before installing it:

1. compare it with the official configuration in your selected bundle;
2. preserve your existing `config/` directory;
3. retain the matching `genesis_data.json`, `koinos_descriptors.pb`, and
   `rabbitmq.conf` from the same network and bundle;
4. run `docker compose config` from the official checkout;
5. review the resulting diff before restarting any service.
