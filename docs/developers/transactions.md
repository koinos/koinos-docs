---
icon: fontawesome/solid/file
---

# Transactions
Blockchain transactions involve the transfer of digital assets or information across a decentralized network of computers, known as nodes. Each transaction is securely recorded in a chronological and immutable manner within a block, which is then linked to previous blocks, forming a chain. These transactions are verified by network participants through cryptographic algorithms, ensuring authenticity and preventing tampering. Once verified, transactions are added to the blockchain and become irreversible, providing transparency and trust without the need for intermediaries. This decentralized and transparent nature of blockchain transactions offers numerous benefits, including enhanced security, reduced costs, and increased efficiency across various industries.

---
## The anatomy of a transaction
Let's begin by looking at how a transaction is defined in [Protobuf](protobuf.md). We can see that a transaction consists of two different messages, the transaction and the transaction header.

```proto
message transaction_header {
   bytes chain_id = 1;
   uint64 rc_limit = 2 [jstype = JS_STRING];
   bytes nonce = 3;
   bytes operation_merkle_root = 4;
   bytes payer = 5 [(btype) = ADDRESS];
   bytes payee = 6 [(btype) = ADDRESS];
}

message transaction {
   bytes id = 1 [(btype) = TRANSACTION_ID];
   transaction_header header = 2;
   repeated operation operations = 3;
   repeated bytes signatures = 4;
}
```

### The transaction header
The transaction header is used to derive the ID of the transaction. It is a separate message so that [Protobuf](protobuf.md) libraries can easily serialize it and the cryptography tools can generate the ID of the transaction. Let's have a look at the different fields making up the header.

<center>
_**Table 1.** A table defining each field within a transaction header._
</center>

| Field | Description |
| ----- | ----------- |
| Chain ID | This is the identifier for the chain you are targeting. This will be different for Koinos mainnet and any other Koinos testnet.|
| RC Limit | RC standards for resource credit, it just an internal name for Mana. This is the maximum amount of Mana you would like to consume when processing the transaction. |
| Nonce | The nonce is used to both order and uniquely identify a transaction from a particular account. It is incremented by 1 with each subsequent transaction. |
| Operation Merkle Root | This is self explanatory, but it is the merkle root of the operations on the transaction itself. |
| Payer | The payer is the account that paying the cost in Mana. See [Payer semantics](payer-payee.md) for more information. |
| Payee | The payee field is optional. This account will have its nonce incremented in the case it is used. See [Payer semantics](payer-payee.md) for more information. |

As stated previously, the transaction header is used to derive the transaction ID. To do this, you must serialize the transaction header into bytes, then use a cryptography library to derive the SHA2-256 hash of said bytes. This is your transaction ID.

### The transaction body
The transaction body, or the transaction itself, contains all the information required for submission to the blockchain. It not only contains the transaction header, but also the operations in which the account wishes to perform. We will explain each field that make up the transaction.

<center>
_**Table 2.** A table defining each field within a transaction._
</center>

| Field | Description |
| ----- | ----------- |
| ID | The transaction ID, this is derived from the SHA2-256 hash of the serialized transaction header. |
| Header | This is the transaction header reviewed in the previous section. |
| Operations | This is one or more blockchain operations the user wishes to perform on the blockchain. |
| Signatures | This is zero or more signatures used to authorize the transaction. See [Authority](authority.md) to understand more. |

## Creating and submitting a transaction
Now that we understand each field of a transaction, let's perform a step-by-step guide on how to construct a transaction.

1. Grab the chain ID of the blockchain you wish to transact on. Use it for the `chain_id` in the transaction header.
2. Create an array of operations you would like to perform. Serialize each operation and derive the merkle root. Place it in the `operation_merkle_root` of the transaction header. Place the array of operations in the `operations` field of the transaction.
3. Retrieve or create the next nonce for the account. This is either the payee if it exists or the payer if the payee does not exist. Place the serialized nonce into the `nonce` field.
4. Fill in the `payer` and optionally the `payee` field with the appropriate accounts.
5. Serialize the transaction header and derive the SHA2-256 of the bytes. This is our transaction ID, place it in the `id` field of the transaction.
6. Place the entire transaction header into the transaction's `header` field.
7. Authorize the transaction by either signing the transaction ID or by other means (e.g. a smart contract wallet).

Now, you can leverage an API node's `submit_transaction` RPC call to execute the transaction on the blockchain.

### What happens next?
The blockchain will check the transaction for validity and then execute it as if it were placed on the head block without placing in a block. If the transaction succeeds, it will find itself in the mempool and it broadcasts through the network. Once a block producer includes it into a block, it will find itself on the blockchain. Read more about [Finality](../exchanges/finality.md) to understand when a transaction can be considered irreversible.