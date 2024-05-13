# Offline signing
Regardless of your method of signing a transaction offline, you will need to manually set the Chain ID, nonce, and RC limit for the transaction.

---
## Chain ID

The Chain ID is a unique identifier for the specific chain you are transacting on. This prevents transactions from one chain from being valid on another. The Chain ID is derived from the genesis data, including the genesis key, which ensures uniqueness between Koinos based blockchains. It is encoded as a base64 string.

| Blockchain        | Chain ID                                           |
|-------------------|----------------------------------------------------|
| Koinos Mainnet    | `EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA==` |
| Harbinger Testnet | `EiBncD4pKRIQWco_WRqo5Q-xnXR7JuO3PtZv983mKdKHSQ==` |

---
## Nonce

The transaction nonce is specific to the account transacting. It must be incremented by one each transaction to ensure proper ordering of that account's transactions as well as preventing double spends on that account by submitting the same transaction multiple times. There are several ways of obtaining an account's next nonce. These methods return the current nonce of the account, unless otherwise stated. You need to increment the nonce by one to use on the next transaction.

=== "Koinos CLI"

    You can use the CLI command `account_nonce` to return the current nonce for an account. If no arguments are passed in, it will use the currently open wallet. If an address is provided, it will return the nonce of that address.

    The commands:

    ``` { .txt }
    open wallets/test.wallet password
    account_nonce
    ```

    Return:

    ``` { .txt .no-copy }
    1
    ```

    It also works to specify an address.

    The command:

    ``` { .txt }
    account_nonce 1CKtxyeatx6BsGjB4GXNoT4vEdRRka7WdJ
    ```

    Returns:

    ``` { .txt .no-copy }
    32
    ```

=== "Koilib"

    With Koilib, to retrieve the account's nonce use:

    ```ts
    const provider = new Provider("https://api.koinos.io");
    const nonce = await provider.getNonce("1CKtxyeatx6BsGjB4GXNoT4vEdRRka7WdJ");
    console.log(nonce);
    ```

    To retrieve the next nonce use:

    ```ts
    const provider = new Provider("https://api.koinos.io");
    const nextNonce = await provider.getNextNonce("1CKtxyeatx6BsGjB4GXNoT4vEdRRka7WdJ");
    console.log(nextNonce);
    ```

=== "JSON-RPC"

    You can retrieve an account's nonce via the API method `chain.get_account_nonce`. The argument struct is just the account address and the return struct contains the nonce encoded as a Protobuf message.

    The command:

    ``` { .txt }
    curl -H 'apikey: XXXXX' -d '{"jsonrpc":"2.0", "method":"chain.get_account_nonce", "params":{"account":"1CKtxyeatx6BsGjB4GXNoT4vEdRRka7WdJ"}, "id":0}' https://api.koinos.pro/jsonrpc
    ```

    Returns:

    ``` { .json .no-copy }
    {
      "jsonrpc": "2.0",
      "result": {
        "nonce": "KB8="
      },
      "id": 0
    }
    ```

    You will need to decode the Protobuf message and increment the returned nonce by one to obtain the next nonce. Decoding the message can be done with one of the many generated Protobuf libraries for Koinos on [Github](https://github.com/koinos?q=proto&type=all&language=&sort=). The returned type is `koinos.chain.value`. Because of this additional step, we only recommend querying the API directly if you need to integrate using a specific language. Otherwise, the CLI or Koilib are easier to use.

---
## RC Limit

The RC, or "Resource Credit", limit is like the gas limit on Ethereum. It specifies the maximum amount of Mana the transaction is allowed to use before execution is terminated and the transaction is reverted. The RC limit can be set to any value less than the account's current Mana and the transaction will be included. For additional help on how to set RC limit, read the guide on [Mana](./mana.md) and our developer guide on [RC limits](../developers/rc-limits.md).

=== "Koinos CLI"

    Like with retrieving the nonce, the Koinos CLI can retrieve an account's RC limit using the `account_rc` command. If no arguments are passed in, it will use the currently open wallet. If an address is provided, it will return the rc of that address.

    The commands:

    ``` { .txt }
    open wallets/test.wallet password
    account_rc
    ```

    Return:

    ``` { .txt .no-copy }
    0.00000000 rc
    ```

    It also works to specify an address.

    The command:

    ``` { .txt }
    account_rc 1CKtxyeatx6BsGjB4GXNoT4vEdRRka7WdJ
    ```

    Returns:

    ``` { .txt .no-copy }
    10.00000000 rc
    ```

=== "Koilib"

    You can retrieve an account's RC limit with the following code:

    ```ts
    const provider = new Provider("https://api.koinos.io");
    const accountRc = await provider.getAccountRc("1CKtxyeatx6BsGjB4GXNoT4vEdRRka7WdJ");
    console.log(accountRc);
    ```

=== "JSON-RPC"

    You can retrieve an account's RC limit via the API method `chain.get_account_rc`. The argument struct is just the account address and the return struct returns the RC limit. If the RC limit is missing from the return, it is because the RC limit is the default value, 0.

    The command:

    ``` { .txt }
    curl -H 'apikey: XXXXX' -d '{"jsonrpc":"2.0", "method":"chain.get_account_rc", "params":{"account":"1CKtxyeatx6BsGjB4GXNoT4vEdRRka7WdJ"}, "id":0}' https://api.koinos.pro/jsonrpc
    ```

    Returns:

    ``` { .json .no-copy }
    {
      "jsonrpc": "2.0",
      "result": {
        "rc": "1000000000"
      },
      "id": 0
    }
    ```

    The command:

    ``` { .txt }
    curl -H 'apikey: XXXXX' -d '{"jsonrpc":"2.0", "method":"chain.get_account_rc", "params":{"account":"1EfSZM93JJi5jkpzUFbTw1kojvTCrwJfom"}, "id":0}' https://api.koinos.pro/jsonrpc
    ```

    Returns:

    ``` { .json .no-copy }
    {
      "jsonrpc": "2.0",
      "result": {},
      "id": 0
    }
    ```

    !!! reminder
        The empty result corresponds to a value of 0.

---
## Sign Transaction

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

    ``` { .txt hl_lines="6-8" }
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

    Koilib supports offline signinng. First create an instance of a transaction by using the
    [Transaction class](https://joticajulian.github.io/koilib/classes/Transaction.html#pushOperation) and set the signer:

    ```ts
    import { Transaction, Provider, Contract, Signer, utils } from "koilib";

    const provider = new Provider("https://api.koinos.io");
    const signer = Signer.fromWif("Kzl...");
    signer.provider = provider;
    const tx = new Transaction({
      provider: new Provider("https://api.koinos.io"),
      signer,
    });
    ```

    Define the operations you want to add to the transaction. In this example we will make a Koin transfer:

    ```ts
    const koin = new Contract({
      id: "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
      abi: utils.tokenAbi,
    }).functions;

    await tx.pushOperation(koin.transfer, {
      from: "1NRYHBYr9qxYQAeVqfdSvyjJemRQ4qD3Mt",
      to: "13UdKjYuzfBYbB6bGLQkUN9DJRFPCmG1mU",
      value: "1000", // 0.00001000 KOIN
    });
    ```

    Call the function to prepare the headers and sign it:

    ```ts
    await tx.prepare();
    await tx.sign();
    ```

=== "JSON-RPC"

    !!! notice
        JSON-RPC does not support transaction signing.

---
## Submit Transaction

Now that we have a signed transaction, we need to submit it to the blockchain.

=== "Koinos CLI"

    Submitting a transaction can be done with CLI using the `submit_transaction` command. Submitting a transaction using the CLI requires submitting the transaction encoded as a web safe Base64 string. In order to use this command, the CLI must be connected to an JSON-RPC API endpoint. Because of this requirement, this will need to be a different CLI than the one used to sign the transaction offline.

    To connect to an API endpoint, you can use the `connect` command and set the desired endpoint.

    ``` { .txt }
    connect https://api.koinos.pro/jsonrpc?apikey=XXXXX
    ```

    The command:

    ``` { .txt }
    submit_transaction CiISIEdjJCk4oqfHDj7hooips4LiUr3xThbzrv2jR18u-bhSEm4KIhIgZ3A-KSkSEFnKP1kaqOUPsZ10eybjtz7Wb_fN5inSh0kQgJTr3AMaAyjTBCIiEiDoNUJIzZ-6yYmupiFmuKLr5O4xenoVjelSaX_HNd78WSoZACISicKuuJib6PEWx9Zag4wm0wDj3z7sGhpjEmEKGQDdMua_my7EWJrHygOhjTFte1O0S1qXrpgQxdn-rAgaPgiAgOmDsd4WEhkAIhKJwq64mJvo8RbH1lqDjCbTAOPfPuwaGhkAIhKJwq64mJvo8RbH1lqDjCbTAOPfPuwaIkEg2ElVnxAdUdFoqIWsHisXG02fN13bJMM-KVJFSjrlXpVOXI5PVbmgUwL6IMhao2UxjPBOJB0QKwNKgc25vDVXUg==
    ```

    Returns:

    ``` { .txt .no-copy }
    Transaction with ID 0x12204763242938a2a7c70e3ee1a288a9b382e252bdf14e16f3aefda3475f2ef9b852 containing 1 operations submitted.
    Mana cost: 0.07432993 (Disk: 15, Network: 316, Compute: 1165493)
    ```

    The return contains the transaction ID (`0x12204763242938a2a7c70e3ee1a288a9b382e252bdf14e16f3aefda3475f2ef9b852`). Note: Transaction IDs are always formatted as `0x` prefixed hex strings. It also returns some basic information about the result of the transaction, mainly the total amount of mana consumed and the total resources consumed during execution.

=== "Koilib"

    Submit the transaction by running:

    ```ts
    const receipt = await tx.send();
    console.log(receipt);
    ```

    Once this is done, use the [wait function](https://joticajulian.github.io/koilib/classes/Transaction.html#wait) to wait for the transaction to be mined in a block:

    ```ts
    const { blockNumber } = await tx.wait();
    console.log(`Transaction mined. Block number: ${blockNumber}`);
    ```

=== "JSON-RPC"

    Submitting a transaction with the JSON-RPC API can be done using the the `chain.submit_transaction` method. The argument struct contains a the transaction and a bool to broadcast the transaction or not and the return struct contains the transaction receipt.. Not broadcasting the transaction will still execute it on the node, but it will not be added to the mempool nor broadcast on the p2p network.

    The command:

    ``` { .txt .no-copy }
    curl -H 'apikey: XXXXX' -d '{"jsonrpc":"2.0", "method":"chain.submit_transaction", "params":{"broadcast":true, "transaction":{"id": "0x1220d8cda1476cb2fdf54a7b43d869344b3cb799ed5daeb61ed3e7f7df5f9c8676e7","header": {"chain_id": "EiBncD4pKRIQWco_WRqo5Q-xnXR7JuO3PtZv983mKdKHSQ==","rc_limit": "1000000000","nonce": "KNQE","operation_merkle_root": "EiANY5LVX1Ci-FiKglmuELtwtP_ymDbfNuOxIrOE15U3ig==","payer": "147ABaHVxtpoSpfpZ8yry7eaFAjV87trGR"},"operations": [{"call_contract": {"contract_id": "1MAbK5pYkhp9yHnfhYamC3tfSLmVRTDjd9","entry_point": 2241834181,"args": "CIDAyvOEowISGQAiEonCrriYm-jxFsfWWoOMJtMA498-7BoaGQAiEonCrriYm-jxFsfWWoOMJtMA498-7Bo="}}],"signatures": ["H95qxrxqYjt325Lq724LcqR127T3O01Cx30yhsSsZ2vEOtmkPszGGEFkQfs3obiAu18_eFeDgMfeysG0XbTEsIo="]}}, "id":0}' https://api.koinos.pro/jsonrpc
    ```

    Returns:

    ``` { .json .no-copy }
    {
      "jsonrpc": "2.0",
      "result": {
        "receipt": {
          "id": "0x1220d8cda1476cb2fdf54a7b43d869344b3cb799ed5daeb61ed3e7f7df5f9c8676e7",
          "payer": "147ABaHVxtpoSpfpZ8yry7eaFAjV87trGR",
          "max_payer_rc": "336755720632084",
          "rc_limit": "1000000000",
          "rc_used": "6207964",
          "disk_storage_used": "15",
          "network_bandwidth_used": "316",
          "compute_bandwidth_used": "1165717",
          "events": [
            {
              "source": "1FaSvLjQJsCJKq5ybmGsMMQs8RQYyVv8ju",
              "name": "koinos.contracts.token.burn_event",
              "data": "ChkAIhKJwq64mJvo8RbH1lqDjCbTAOPfPuwaEIDAyvOEowI=",
              "impacted": [
                "147ABaHVxtpoSpfpZ8yry7eaFAjV87trGR"
              ]
            },
            {
              "sequence": 1,
              "source": "17n12ktwN79sR6ia9DDgCfmw77EgpbTyBi",
              "name": "koinos.contracts.token.mint_event",
              "data": "ChkAIhKJwq64mJvo8RbH1lqDjCbTAOPfPuwaEIDAyvOEowI=",
              "impacted": [
                "147ABaHVxtpoSpfpZ8yry7eaFAjV87trGR"
              ]
            }
          ],
          "state_delta_entries": [
            {
              "object_space": {
                "system": true,
                "id": 4
              },
              "key": "ACISicKuuJib6PEWx9Zag4wm0wDj3z7sGg==",
              "value": "KNQE"
            },
            {
              "object_space": {
                "system": true,
                "zone": "AEpTf459hAwUsOl1jc2RDMbsQuqJx3S1HQ=="
              },
              "value": "CJfg8qzMyls="
            },
            {
              "object_space": {
                "system": true,
                "zone": "AJ_lH9WcjJMQmBCDCX0CXh1NdTgPLp-Z_A=="
              },
              "value": "CN2Czu6YhosB"
            },
            {
              "object_space": {
                "system": true,
                "zone": "AEpTf459hAwUsOl1jc2RDMbsQuqJx3S1HQ==",
                "id": 1
              },
              "key": "ACISicKuuJib6PEWx9Zag4wm0wDj3z7sGg==",
              "value": "CJnglM2Xt0cSDQjF-cwDEJmgytmSlEUSDQiVts0DEJnglM2Xt0c="
            },
            {
              "object_space": {
                "system": true,
                "zone": "AJ_lH9WcjJMQmBCDCX0CXh1NdTgPLp-Z_A==",
                "id": 1
              },
              "key": "ACISicKuuJib6PEWx9Zag4wm0wDj3z7sGg==",
              "value": "CPbx4PzrpUoQuLql8uulShjeiq757DE="
            }
          ]
        }
      },
      "id": 0
    }
    ```
