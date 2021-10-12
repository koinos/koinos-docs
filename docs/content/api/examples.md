# Examples

Here are some example RPC requests. All APIs are a work in progress and are subject to change.

All current APIs are defined in [Koinos Proto](https://github.com/koinos/koinos-proto). All files name `*_rpc.proto` defined API types for the particular microservice.

## Get Block

In `koinos/rpc/block_store/block_store_rpc.proto`, there is `get_blocks_by_id_request`. This corresponds to the API call `block_store.get_blocks_by_id`. The corresponding jsonrpc call would be:

```
curl -d '{"jsonrpc":"2.0", "method":"block_store.get_blocks_by_id", "params":{"block_id":["EiCX+ssYyo0m73WLY0VZ2W8EZKYs9s34zvwmE4h2EUh7lQ=="], "return_block":true, "return_receipt":false}, "id":0}' http://localhost:8080/
```

This should return something like this:

```
{"jsonrpc":"2.0","result":{"block_items":[{"block_id":"EiCX+ssYyo0m73WLY0VZ2W8EZKYs9s34zvwmE4h2EUh7lQ==","block_height":"964","block":{"id":"EiCX+ssYyo0m73WLY0VZ2W8EZKYs9s34zvwmE4h2EUh7lQ==","header":{"previous":"EiADKmeXbxQQuzkUPXFqf3qmdQ8hWQU5mub+xjEVDjSJAg==","height":"964","timestamp":"1633721336872"},"active":"CiISIOOwxEKY/BwUmvv0yJlvuSQnrkHkZJuTTKSVmRt4UrhVEiISIC26XbwznnMWrqJoP6+DnBt7HuIxPbeSESWIEY3wZqo1GhkAzuB70A1bDr3jPg1Zw671LCd55aJxEhPB","passive":"","signature_data":"CiBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASY4xJBIDW9mt9V/owtOVuz3JNklOEJpyWM2KQ0OF0CXFKVCcRTUZv3B9rRsRd9paOeurixVds965X2aR/H85g8qba0Hm4=","transactions":[]},"receipt":null}]},"id":0}
```

## Get Head Block

```
curl -d '{"jsonrpc":"2.0", "method":"chain.get_head_info", "params":{}, "id":1}' http://localhost:8080/
```

```
{"jsonrpc":"2.0","result":{"head_topology":{"id":"EiD5jBaH29gjxO4XtP/kwYd618y8HgaqLHH6NiyfnHib+Q==","height":"966","previous":"EiDCzx9yh3EgpmpOyCjJ24aGL+PlECehkZ8IzR4ALrU4rg=="},"last_irreversible_block":"906"},"id":1}
```
