# Finality

Finality is the idea of transactions being final and unable to be reversed. On Koinos, this is enforced through a system called irreversibility. Because Koinos is not a Proof of Work (PoW) blockchain, blocks are relatively cheap to produce, and it is possible for a "longest chain" to exist of a block far in the past. To prevent this behavior, there is a reversible window where the Koinos node will accept past blocks and track all forks. However, once a block is 60 blocks deep from the current head, it becomes irreversible and blocks with a height equal to or less than the irreversible height will no longer be included. A transaction can be considered final once it is included in an irreversible block.

Finality is the safest threshold for inclusion. In nearly all cases, being just a few blocks deep is as good as final. Further than that, the Koinos mempool makes every attempt to include transactions on every fork, so in many cases simply getting accepted to the mempool means the transaction will be included, but that is the least safe threshold for finality.

The general strategy of determining finality is fours steps.

- Step 1: Check what block(s) the transaction is included in.
- Step 2: Check the block height of the containing block(s).
- Step 3: Check the irreversibility threshold of the head block.
- Step 4: Check the block containing the transaction is on the irreversible chain.

!!! Notice
    The Koinos CLI cannot currently determine finality.

---
## Check transaction

=== "REST"

    The path `v1/transaction/{transaction_id}` can be used to retrieve a transaction by ID. We do not need any of the optional returns or decodes to view containing block(s).

    ``` { .txt }
    curl -X 'GET' \
    'https://api.koinos.pro/v1/transaction/0x1220b60d6774022f969d913bedc7b8721d8fd17e7a3ef436833c52408d1cae64c70d?return_receipt=false&decode_operations=false&decode_events=false' \
    -H 'accept: application/json' \
    -H 'X-API-KEY: WNfKg6ITYc9mWViySEvLiODZp6iti1A5'
    ```

    ``` { .json .no-copy }
    {
      "transaction": {
        "id": "0x1220b60d6774022f969d913bedc7b8721d8fd17e7a3ef436833c52408d1cae64c70d",
        "header": {
          "chain_id": "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA==",
          "rc_limit": "16000000000",
          "nonce": "KAE=",
          "operation_merkle_root": "EiBiUa0JtsoVvDPeaR3nSjrgjdyMoNo1Su2aRPVTf8Yksg==",
          "payer": "1Lor4EPu5TjioQWoY7EHtupXXW8hWrjH6H",
          "payee": "14CHxZUbxKywXJ1TveXvd4Q4xr4x11dKMf"
        },
        "operations": [
          {
            "call_contract": {
              "contract_id": "1932QKYoPzaGmwBxTnnYhNqV9LQi2sYLHT",
              "entry_point": 2129709095
            }
          }
        ],
        "signatures": [
          "HyCRUHWLG7cK93uYmjA9eV9Qx4lxveS_fWwOxP1aQu85EwEwkaX_SP7cn-juG1VE5byweykVqdNkwfIUXVO289I=",
          "Hw2jHU4WssnE_HGf0gssqzkm3tMhkn8go-GgOT81Up8kM0LaUAF9blW8bf_TjY9oh7Ke69eGjet4RVsc-9MNszM="
        ]
      },
      "containing_blocks": [
        "0x12203b67158009cbdc57709899589361f482ab41d768a35da3ab5f10956345a4e99c"
      ]
    }
    ```

---
## Check block

Using the block ID contained in `contained_blocks`, we will check the block height of the block(s).

=== "REST"

    The path `v1/blocks/{block_id}` can be used to retrieve a block by ID. We do not need any of the optional records or decodes to view the block height.

    ``` { .txt }
    curl -X 'GET' \
    'https://api.koinos.pro/v1/block/0x12203b67158009cbdc57709899589361f482ab41d768a35da3ab5f10956345a4e99c?return_block=false&return_receipt=false' \
    -H 'accept: application/json' \
    -H 'X-API-KEY: WNfKg6ITYc9mWViySEvLiODZp6iti1A5'
    ```

    ``` { .json .no-copy }
    {
      "block_id": "0x12203b67158009cbdc57709899589361f482ab41d768a35da3ab5f10956345a4e99c",
      "block_height": "15389602"
    }
    ```

---
## Check height

Lastly, we need to check the irreversibility height at the current head block.

=== "REST"

    The path `v1/chain/head_block` can be used to retrieve the head block info.

    ``` { .txt }
    curl -X 'GET' \
    'https://api.koinos.pro/v1/chain/head_info' \
    -H 'accept: application/json' \
    -H 'X-API-KEY: WNfKg6ITYc9mWViySEvLiODZp6iti1A5'
    ```

    ``` { .json .no-copy }
    {
      "head_topology": {
        "id": "0x122006681dfd4bc62d8c97fd98136ed664c1c36d71ab05b2ce174251bde0becc8cac",
        "height": "15389904",
        "previous": "0x1220402ef3cf4d41483779c6a91ffeafd09b76ad13d52cc600ab281c1b1b808e3461"
      },
      "last_irreversible_block": "15389844",
      "head_state_merkle_root": "EiBODfJc_5O8M8mPOo4lSXzQtoLRidRli4_PK77VxItD6g==",
      "head_block_time": "1715208494030"
    }
    ```

We need to continue checking the head info until `last_irreversible_block` is greater than or equal the block height(s) in question.

---
## Check irreversible block

The last step we need to do is check that the block is irreversibility included in the chain. We do this by looking up the irreversible block by height. All containing blocks can be checked this way. If one of them is contained irreversibly, then the transaction is final.

=== "REST"

    We are going to use the path `/v1/blocks/{block_id}` again. But this time, we will pass in the block height to get the irreversible block at the specified height.

    ``` { .txt }
    curl -X 'GET' \
    'https://api.koinos.pro/v1/block/15389602?return_block=false&return_receipt=false' \
    -H 'accept: application/json' \
    -H 'X-API-KEY: WNfKg6ITYc9mWViySEvLiODZp6iti1A5'
    ```

    ``` { .json .no-copy }
     {
      "block_id": "0x12203b67158009cbdc57709899589361f482ab41d768a35da3ab5f10956345a4e99c",
      "block_height": "15389602"
    }
    ```

    As you can see, the returned block id matches the containing block back from step 1, so we know the transaction is final.
