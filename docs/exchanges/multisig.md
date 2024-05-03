# Multisig
Multisig, short for multisignature, is a security feature used in cryptocurrencies to enhance transaction security and reduce the risk of unauthorized access or fraud. With multisig, a transaction requires multiple signatures (or approvals) from different parties before it can be executed on the blockchain. This setup typically involves specifying a certain number of required signatures out of a total number of authorized signers. For example, in a 2-of-3 multisig setup, any transaction must be signed by at least two out of the three designated signers to be valid. Multisig wallets are often used by businesses, organizations, or groups of individuals who want to distribute control and minimize the risk of single points of failure or malicious activities. The use of multisig adds an extra layer of protection and accountability to cryptocurrency transactions, making it a valuable tool for securing digital assets.

Below you can find examples of how to perform multisig using a variety of supported tools.

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
