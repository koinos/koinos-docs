# Multisig
Multisig, short for multisignature, is a security feature used in cryptocurrencies to enhance transaction security and reduce the risk of unauthorized access or fraud. With multisig, a transaction requires multiple signatures (or approvals) from different parties before it can be executed on the blockchain. This setup typically involves specifying a certain number of required signatures out of a total number of authorized signers. For example, in a 2-of-3 multisig setup, any transaction must be signed by at least two out of the three designated signers to be valid. Multisig wallets are often used by businesses, organizations, or groups of individuals who want to distribute control and minimize the risk of single points of failure or malicious activities. The use of multisig adds an extra layer of protection and accountability to cryptocurrency transactions, making it a valuable tool for securing digital assets.

Multisig wallets are not provided in Koinos by default. They can be added to an address through [authority overrides](../developers/authority.md).

The most common use case for multisig on Koinos is paying for another address' transaction using the [payer/payee](../developers/payer-payee.md) system. With default addresses, a transaction utilizing payer/payee will require the signature of both the payer and the payee.

Below you can find examples of how to perform multisig using a variety of supported tools.

=== "Koinos CLI"

    Multisig using the Koinos CLI can be done using the `sign_transaction` command. The `sign_transaction` command accepts a transaction encoded in base64, signs it with the open wallet, and then outputs the transaction in base64 with the additional signature added. You can then use `submit_transaction` to submit the new transaction to the blockchain.

    You can obtain a base64 encoded transaction using the [offline signing guide](./offline-signing.md). You can turn any wallet in to an offline wallet using the `disconnect` command. Then submit a transaction using a transaction session, and the transaction will be output in base64.

    On another machine, or the same machine with a different wallet, open the wallet of the second address and then use the `sign_transaction` command. If you need to add more than two signatures to the transaction, simply use `sign_transaction` from an offline wallet and keep moving the transaction from wallet to wallet until you have all the signatures you need.

    For this example, we will be transferring 10 tKOIN from one wallet to another, but using the destination wallet as the payer for the transaction. This is useful, especially considering that our source wallet only has tKOIN and because Mana is needed to pay for the transaction, the source wallet cannot pay for the transaction and transfer all of its tKOIN.

    First we need to sign the transaction using the first wallet. Remember, with offline signing, we need to set the chain ID, nonce, and rc limit of the transaction manually first.

    ``` { .txt .no-copy }
    🔓 > open wallets/test2.wallet password
    Opened wallet: wallets/test2.wallet

    🔓 > payer 1EfSZM93JJi5jkpzUFbTw1kojvTCrwJfom
    🔓 > disconnect
    Disconnected

    🚫 🔓 > nonce 1
    🚫 🔓 > chain_id EiBncD4pKRIQWco_WRqo5Q-xnXR7JuO3PtZv983mKdKHSQ==
    🚫 🔓 > rclimit 1

    🚫 🔓 > session begin
    Began transaction session

    🚫 🔓 📄 > tkoin.transfer 1EfSZM93JJi5jkpzUFbTw1kojvTCrwJfom 10
    Transferring 10 tKOIN to 1EfSZM93JJi5jkpzUFbTw1kojvTCrwJfom
    Adding operation to transaction session

    🚫 🔓 📄 > session submit
    JSON:
    {
    "id": "0x122018b547fff3818d7a9ec1e1e7f15be1ce6f719d913662db74af12d789fc5eb87a",
    "header": {
        "chain_id": "EiBncD4pKRIQWco_WRqo5Q-xnXR7JuO3PtZv983mKdKHSQ==",
        "rc_limit": "100000000",
        "nonce": "KAE=",
        "operation_merkle_root": "EiCjqZJX_Gk2MlhM5400n3LMWAHoo-WJchg-a3sO4cSh7w==",
        "payer": "1EfSZM93JJi5jkpzUFbTw1kojvTCrwJfom",
        "payee": "19vKDTMbR6FxYrxKrtFLDBn5uzAzhfomh9"
    },
    "operations": [
        {
        "call_contract": {
            "contract_id": "1FaSvLjQJsCJKq5ybmGsMMQs8RQYyVv8ju",
            "entry_point": 670398154,
            "args": "ChkAYdZB07coryO66Iuhp1Eu5_fj30VjGeuYEhkAld7Gt6Kcrgx74cp4Bu_njyA2IGaZDR5YGICU69wD"
        }
        }
    ],
    "signatures": [
        "H8jcGrN6ccIxGFbm3COhJ_XvdS9X5fke6vho-GOX1X2RNO-Dan9GVG5CZHGHwLrlZyYutOIvsjhvdCZtoR5WIIs="
    ]
    }

    Base64:
    CiISIBi1R__zgY16nsHh5_Fb4c5vcZ2RNmLbdK8S14n8Xrh6EocBCiISIGdwPikpEhBZyj9ZGqjlD7GddHsm47c-1m_3zeYp0odJEIDC1y8aAigBIiISIKOpklf8aTYyWEznjTSfcsxYAeij5YlyGD5rew7hxKHvKhkAld7Gt6Kcrgx74cp4Bu_njyA2IGaZDR5YMhkAYdZB07coryO66Iuhp1Eu5_fj30VjGeuYGmESXwoZAJ_lH9WcjJMQmBCDCX0CXh1NdTgPLp-Z_BDK7dW_Aho8ChkAYdZB07coryO66Iuhp1Eu5_fj30VjGeuYEhkAld7Gt6Kcrgx74cp4Bu_njyA2IGaZDR5YGICU69wDIkEfyNwas3pxwjEYVubcI6En9e91L1fl-R7q-Gj4Y5fVfZE074Nqf0ZUbkJkcYfAuuVnJi604i-yOG90Jm2hHlYgiw==

    🚫 🔓 > connect https://api.harbinger.koinos.pro/jsonrpc?apikey=APIKEY
    Connected to endpoint https://api.harbinger.koinos.pro/jsonrpc?apikey=APIKEY

    🔓 > open wallets/test.wallet password
    Opened wallet: wallets/test.wallet

    🔓 > sign_transaction CiISIBi1R__zgY16nsHh5_Fb4c5vcZ2RNmLbdK8S14n8Xrh6EocBCiISIGdwPikpEhBZyj9ZGqjlD7GddHsm47c-1m_3zeYp0odJEIDC1y8aAigBIiISIKOpklf8aTYyWEznjTSfcsxYAeij5YlyGD5rew7hxKHvKhkAld7Gt6Kcrgx74cp4Bu_njyA2IGaZDR5YMhkAYdZB07coryO66Iuhp1Eu5_fj30VjGeuYGmESXwoZAJ_lH9WcjJMQmBCDCX0CXh1NdTgPLp-Z_BDK7dW_Aho8ChkAYdZB07coryO66Iuhp1Eu5_fj30VjGeuYEhkAld7Gt6Kcrgx74cp4Bu_njyA2IGaZDR5YGICU69wDIkEfyNwas3pxwjEYVubcI6En9e91L1fl-R7q-Gj4Y5fVfZE074Nqf0ZUbkJkcYfAuuVnJi604i-yOG90Jm2hHlYgiw==
    Signed Transaction:
    JSON:
    {
    "id": "EiAYtUf/84GNep7B4efxW+HOb3GdkTZi23SvEteJ/F64eg==",
    "header": {
        "chain_id": "EiBncD4pKRIQWco/WRqo5Q+xnXR7JuO3PtZv983mKdKHSQ==",
        "rc_limit": 100000000,
        "nonce": "KAE=",
        "operation_merkle_root": "EiCjqZJX/Gk2MlhM5400n3LMWAHoo+WJchg+a3sO4cSh7w==",
        "payer": "AJXexreinK4Me+HKeAbv548gNiBmmQ0eWA==",
        "payee": "AGHWQdO3KK8juuiLoadRLuf3499FYxnrmA=="
    },
    "operations": [
        {
        "Op": {
            "CallContract": {
            "contract_id": "AJ/lH9WcjJMQmBCDCX0CXh1NdTgPLp+Z/A==",
            "entry_point": 670398154,
            "args": "ChkAYdZB07coryO66Iuhp1Eu5/fj30VjGeuYEhkAld7Gt6Kcrgx74cp4Bu/njyA2IGaZDR5YGICU69wD"
            }
        }
        }
    ],
    "signatures": [
        "H8jcGrN6ccIxGFbm3COhJ/XvdS9X5fke6vho+GOX1X2RNO+Dan9GVG5CZHGHwLrlZyYutOIvsjhvdCZtoR5WIIs=",
        "IH1ZMstZxbFbFftVvliNzj7P+Fgtut8gXDh7JYdRbFnyd0z/SqUoVSjGFt5spljUV2T4lrvkiGi94KQ7t5GTPJ0="
    ]
    }
    Base64:
    CiISIBi1R__zgY16nsHh5_Fb4c5vcZ2RNmLbdK8S14n8Xrh6EocBCiISIGdwPikpEhBZyj9ZGqjlD7GddHsm47c-1m_3zeYp0odJEIDC1y8aAigBIiISIKOpklf8aTYyWEznjTSfcsxYAeij5YlyGD5rew7hxKHvKhkAld7Gt6Kcrgx74cp4Bu_njyA2IGaZDR5YMhkAYdZB07coryO66Iuhp1Eu5_fj30VjGeuYGmESXwoZAJ_lH9WcjJMQmBCDCX0CXh1NdTgPLp-Z_BDK7dW_Aho8ChkAYdZB07coryO66Iuhp1Eu5_fj30VjGeuYEhkAld7Gt6Kcrgx74cp4Bu_njyA2IGaZDR5YGICU69wDIkEfyNwas3pxwjEYVubcI6En9e91L1fl-R7q-Gj4Y5fVfZE074Nqf0ZUbkJkcYfAuuVnJi604i-yOG90Jm2hHlYgiyJBIH1ZMstZxbFbFftVvliNzj7P-Fgtut8gXDh7JYdRbFnyd0z_SqUoVSjGFt5spljUV2T4lrvkiGi94KQ7t5GTPJ0=

    🔓 > submit_transaction CiISIBi1R__zgY16nsHh5_Fb4c5vcZ2RNmLbdK8S14n8Xrh6EocBCiISIGdwPikpEhBZyj9ZGqjlD7GddHsm47c-1m_3zeYp0odJEIDC1y8aAigBIiISIKOpklf8aTYyWEznjTSfcsxYAeij5YlyGD5rew7hxKHvKhkAld7Gt6Kcrgx74cp4Bu_njyA2IGaZDR5YMhkAYdZB07coryO66Iuhp1Eu5_fj30VjGeuYGmESXwoZAJ_lH9WcjJMQmBCDCX0CXh1NdTgPLp-Z_BDK7dW_Aho8ChkAYdZB07coryO66Iuhp1Eu5_fj30VjGeuYEhkAld7Gt6Kcrgx74cp4Bu_njyA2IGaZDR5YGICU69wDIkEfyNwas3pxwjEYVubcI6En9e91L1fl-R7q-Gj4Y5fVfZE074Nqf0ZUbkJkcYfAuuVnJi604i-yOG90Jm2hHlYgiyJBIH1ZMstZxbFbFftVvliNzj7P-Fgtut8gXDh7JYdRbFnyd0z_SqUoVSjGFt5spljUV2T4lrvkiGi94KQ7t5GTPJ0=
    Transaction with ID 0x122018b547fff3818d7a9ec1e1e7f15be1ce6f719d913662db74af12d789fc5eb87a containing 1 operations submitted.
    Mana cost: 0.03765641 (Disk: 23, Network: 407, Compute: 647601)
    ```

=== "Koilib"

    The example below demonstrates multisig using Koilib. This is an excerpt from the [Koilib documentation](https://joticajulian.github.io/koilib/#usage).

    ```ts
    const signer2 = Signer.fromWif("KzP1...");
    const signer3 = Signer.fromWif("L1t...");

    const addMoreSignatures = async (tx) => {
        await signer2.signTransaction(tx);
        await signer3.signTransaction(tx);
    };

    const { transaction } = await koin.transfer(
    {
        from: "16MT1VQFgsVxEfJrSGinrA5buiqBsN5ViJ",
        to: "1Gvqdo9if6v6tFomEuTuMWP1D7H7U9yksb",
        value: "1000000",
    },
    {
        payer: signer2.getAddress(),
        beforeSend: addMoreSignatures,
    });
    ```
