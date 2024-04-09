
# Offline Signing

=== "Koinos CLI"

    The CLI has support for offline signing. If you do not connect to an endpoint, you are automatically in offline mode. To send a transaction offline you need to explicitly set the chain id, transaction nonce, and transaction rc limit.

    You can do so with the following commands:

    ```
    chain_id EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA==
    nonce 10
    rclimit 1
    ```

    Once those are set, you can sign an offline transaction using the session commands. You begin a session with `session begin` and end with `session submit`.

    As an example, to do a KOIN transfer on an offline wallet, you would need to send the following commands.

    ``` { .txt .no-copy hl_lines="6-8" }
    register_token koin 15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL KOIN 8
    chain_id EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA==
    open wallets/test.wallet password
    nonce 10
    rclimit 1
    session begin
    koin.transfer 13KZSiN7kgurACx22s5ZZQZ4fe1RxNs6MW 1.23
    session submit
    ```

    The output of running these commands looks like:

    ``` { .txt .no-copy hl_lines="7-29 31-32" }
    Token 'koin' at address 15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL registered
    Opened wallet: wallets/test.wallet
    Set rc limit to 1
    Began transaction session
    Transferring 1.23 KOIN to 13KZSiN7kgurACx22s5ZZQZ4fe1RxNs6MW
    Adding operation to transaction session
    JSON:
    {
      "id": "0x12201a81ecc402a9f007d663149e6b4fc5c7b1e33e4bbae5e7f7f0f590c8c0598579",
      "header": {
        "chain_id": "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA==",
        "rc_limit": "100000000",
        "nonce": "KAo=",
        "operation_merkle_root": "EiCrbHOgeXIHLeS9BSyJQN8dY84QIe3KBPm4gTHr_As1Dg==",
        "payer": "1EfSZM93JJi5jkpzUFbTw1kojvTCrwJfom"
      },
      "operations": [
        {
          "call_contract": {
            "contract_id": "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
            "entry_point": 670398154,
            "args": "ChkAld7Gt6Kcrgx74cp4Bu_njyA2IGaZDR5YEhkAGXLSOrScwx8XLD8aABah1ZaR4KkxDyzZGMCp0zo="
          }
        }
      ],
      "signatures": [
        "H8ujrOwvqykbtNk91WPXuYQn9K9V1S1-tkvUPqFczSPXbxMFskEl0bLFCfjeHkmzraayjZDk3B53iNe1knAbF8Q="
      ]
    }

    Base64:
    CiISIBqB7MQCqfAH1mMUnmtPxcex4z5LuuXn9_D1kMjAWYV5EmwKIhIgWSvxhlT9B_311QDN4-hALs9_gfpd3o8UUnsIu6iAX0gQgMLXLxoCKAoiIhIgq2xzoHlyBy3kvQUsiUDfHWPOECHtygT5uIEx6_wLNQ4qGQCV3sa3opyuDHvhyngG7-ePIDYgZpkNHlgaYBJeChkALjP9GqkHsiTOnObJQiiQHSg6AtqVbaeREMrt1b8CGjsKGQCV3sa3opyuDHvhyngG7-ePIDYgZpkNHlgSGQAZctI6tJzDHxcsPxoAFqHVlpHgqTEPLNkYwKnTOiJBH8ujrOwvqykbtNk91WPXuYQn9K9V1S1-tkvUPqFczSPXbxMFskEl0bLFCfjeHkmzraayjZDk3B53iNe1knAbF8Q=
    ```

    The two important artifacts of these commands are the the JSON and Base64 representations of the signed transaction (highlighjted above) which can be broadcast on an online CLI, or submitted to the network using Koilib or JSON-RPC.

=== "Koilib"

    TODO

=== "JSON-RPC"

    !!! Notice
        JSON-RPC does not support transaction signing.
