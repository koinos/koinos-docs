# Network verification example

`query-network.sh` performs read-only JSON-RPC calls. It accepts:

1. an RPC URL;
2. an optional expected chain ID.

Examples:

```text
./query-network.sh https://api.koinos.io/jsonrpc
./query-network.sh \
  https://testnet.koinosfoundation.org/jsonrpc \
  EiAIKVvm6-V2qmsmUvPJy09vCCLbtn9lHFpwrJbcTIEWRQ==
```

The script exits nonzero when the endpoint returns invalid data or does not
match the expected chain ID. It never signs or broadcasts.
