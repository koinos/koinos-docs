# Transfer
Cryptocurrency coin transfers involve the movement of digital assets from one wallet address to another on a blockchain network. To initiate a transfer, the sender specifies the recipient's wallet address and the amount of cryptocurrency to be sent. The transaction details are then broadcasted to the network, where they are verified by block producers through a process called consensus. Once confirmed, the transaction is added to a block on the blockchain, which serves as a permanent and transparent record of the transfer. Users can track the progress of their transactions using block explorers, which provide real-time visibility into transaction status and details. It's important to double-check the recipient's wallet address before confirming a transfer, as cryptocurrency transactions are irreversible once executed.

Below you can find examples of how to transfer your KOIN using a variety of supported tools.

=== "Koinos CLI"

    You can use the KOIN contract entry point `transfer` to transfer KOIN. This operation requires an open wallet to perform.

    If you have not registered the KOIN contract in your CLI and therefore do not have the `koin.transfer` command, visit the documentation on Koinos CLI under the [`.koinosrc`](../developers/cli.md#koinos-cli-rc-file) section to set it up.

    Using the help command we can see the arguments for the method.
    ``` { .txt, .no-copy }
    🔓 > help koin.transfer
    Transfers the token
    Usage: koin.transfer <to:address> <amount:amount>
    ```

    With your wallet is already opened, the command is as follows:

    ``` { .txt }
    koin.transfer 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX 0.00000001
    ```
    ``` { .txt .no-copy }
    Transferring 0.00000001 tKOIN to 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX
    Transaction with ID 0x122060b2a3311a0daf4d604d846f4380aac01d2c35598ac8913cc419a09b2c86c1e3 containing 1 operations submitted.
    Mana cost: 0.03383501 (Disk: 35, Network: 309, Compute: 574723)
    ```

    When using the `register_token` command as indicated by the documentation on [Koinos CLI](../developers/cli.md) under the [`.koinosrc`](../developers/cli.md#koinos-cli-rc-file) section, the decimals of the token are taken into consideration. As demonstrated above, we are sending 0.00000001 KOIN as indicated by the 8 decimal places. If you want to use `register_token` with an offline wallet, you need to provide the precision and symbol manually.

    ```
    register_token koin 15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL KOIN 8
    ```

=== "Koilib"

    The example below demonstrates transferring KOIN using Koilib. This is an excerpt from the [Koilib documentation](https://joticajulian.github.io/koilib/#usage).

    ```js
    (async () => {
        // define signer, provider, and contract
        const provider = new Provider(["http://api.koinos.io"]);
        const signer = Signer.fromWif("KwkAq...");
        signer.provider = provider;
        const koinContract = new Contract({
            id: "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
            abi: utils.tokenAbi,
            provider,
            signer,
        });
        const koin = koinContract.functions;

        // Transfer
        const { transaction, receipt } = await koin.transfer({
            from: signer.getAddress(),
            to: "172AB1FgCsYrRAW5cwQ8KjadgxofvgPFd6",
            value: "1012345678", // 10.12345678 koin
        });
        console.log(`Transaction id ${transaction.id} submitted. Receipt:`);
        console.log(receipt);

        // wait to be mined
        const { blockNumber } = await transaction.wait();
        console.log(`Transaction mined. Block number: ${blockNumber}`);
    })();
    ```
