# Payer semantics
On Koinos, there is a concept of both a "Payer" and a "Payee". The most common transaction will only utilize the payer field. This works similar to most other blockchains in which the user sending the transaction is also the one paying the cost. However, Koinos is also capable of changing these semantics. This document will delve further into the Payer semantics.

## The payer only example
The payer is the account that will use its resources, or mana, to cover the cost of a transaction. In a normal transaction, the user's account will be present in the payer field and the same user will authorize the transaction. In this scenario, the payer nonce will be used during transaction processing.

## The payer/payee example
When both a payer and payee are present in a transaction the semantics change. As expected, the payer will be account that uses its resources, or mana, to cover the cost of the transaction. However, when the payee is present, the payee's nonce will be used during transaction processing. This allows a single payer to cover the cost of many transactions without causing nonce conflicts. Because the payer is covering costs and the payee's nonce is being used both participants must authorize the transaction.

## Payer/payee security considerations
When paying for the transaction of another account, or payee, both participants must authorize the transaction. This puts the assets of the payer at risk. It is critical for the payer account to ensure that the actions being taken is what he intends on authorizing. In a simple case where the user owns both accounts and trusts the actions within the transaction, he can just authorize the transaction with both accounts.

A common use-case is to only pay the mana and not authorize asset transfers. Or a dApp that will only pay for a user to use the dApp itself. This is most easily accomplished by having a smart contract wallet that overrides the account authorization and checks the operations within the transaction before authorizing. To understand this further check out the [authority](authority.md) documentation.