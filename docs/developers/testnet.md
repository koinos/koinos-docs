---
icon: fontawesome/solid/network-wired
---

# Testnet
A blockchain testnet serves as a sandbox environment for developers and users to experiment, test, and deploy smart contracts, decentralized applications (DApps), and other blockchain-related functionalities without using real cryptocurrency or affecting the main blockchain network. Testnets mimic the behavior of the main blockchain but operate with fake or test tokens, allowing users to simulate real-world scenarios and interactions in a risk-free environment. They provide a platform for developers to debug code, identify potential vulnerabilities, and gauge the performance and scalability of their applications before deploying them on the mainnet. Testnets also facilitate collaboration among developers and enable the community to contribute to the improvement and evolution of blockchain protocols and applications through feedback and testing.

---
## Koinos Foundation testnet
While anyone has the ability to spin up a testnet, the Koinos Foundation maintains a public testnet endpoint for general development use. To target a particular testnet one must retrieve the chain ID. The chain ID prevents your transaction from being valid on any other blockchain other than the one you are targeting.

It is important to retrieve a fresh chain ID when doing work on testnet as it is not uncommon for a testnet to be restarted with a new chain ID. In other words, do not just copy this chain ID, retrieve it yourself before you use it.

!!! example
    An example of retrieving the Chain ID through JSON-RPC.
    ```sh
    curl -d '{"jsonrpc":"2.0", "id":0, "method":"chain.get_chain_id", "params":{}}' 'https://testnet.koinosfoundation.org/jsonrpc'
    ```
    ```json
    {
      "jsonrpc": "2.0",
      "result": {
        "chain_id": "EiAIKVvm6-V2qmsmUvPJy09vCCLbtn9lHFpwrJbcTIEWRQ=="
      },
      "id": 0
    }
    ```

Using the chain ID retrieved and your preferred testnet endpoint, you can use the testnet to deploy contracts and test your dApp. As you know, every action on Koinos requires Mana so we will need to acquire KOIN for testing. On testnet we call it tKOIN.

---
## tKOIN and the faucet
tKOIN is the Koinos blockchain testnet token symbol.

Once you have your public address you can request tKOIN from the [Koinos Testnet Faucet bot](https://t.me/KoinosTestnetFaucetBot) on Telegram:

### Example of acquiring tKOIN
The command to receive tKOIN from the faucet is as follows:
```
/faucet <public address>
```

!!! example
    Given that your public address is `1ENxxuH81kytBdYe81fD9tBdYe81fD9Qxe`, send the following text command to the Telegram faucet bot.
    ```sh
    /faucet 1ENxxuH81kytBdYe81fD9tBdYe81fD9Qxe
    ```

!!! success
    Upon success, the faucet transfers test KOIN to your address.
    ```{ .txt, .no-copy }
    Transferring 100.000000 tKOIN to address 1ENxxuH81kytBdYe81fD9tBdYe81fD9Qxe.
    ```
