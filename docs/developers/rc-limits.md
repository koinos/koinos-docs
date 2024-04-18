# RC limits
The acronym RC stands for resource credit. When speaking about Koinos, this can be directly replaced with the word Mana. The reason for the acronym is because Koinos is implemented using the Koinos blockchain framework which does not enforce the resource subsystem known as Mana. For all intents and purposes you can think Mana whenever you see RC. The resource credit limit, or RC limit, is a field that lives on the transaction. It allows the user the limit the total amount of Mana that will used when processing a given transaction.

---
## Implications of RC limits
Mana cost is dynamic. As usage changes so does the mana cost. Therefore, it is not possible to know the exact Mana cost a transaction will consume as it will be applied in the future. There are several microservices involved in transaction processing including the chain, mempool, p2p, and the block producer. For a developer or user, we will focus on the implications when it comes to the chain and mempool.

When you submit a transaction to the chain, it will check with the mempool to determine if the user has enough Mana considering the RC limit of every transaction of theirs in the mempool as well as the one submitted. If all pending transactions within the irreversibility window exceed your current maximum Mana the transaction will be rejected citing insufficient pending resources. For this reason, to ensure the best user experience you want to set the RC limit as low as possible to ensure the user can submit transactions as frequently as possible.

---
## How to determine the lowest RC limit
There are a couple methods you can employ in order to determine the lowest RC limit to set on a transaction. To ensure our users have the best user experience possible, we must explore ways to set the RC limit as low as it can be. We will discuss two different methods.

### The broadcast false method
If you haven't any idea what the cost of a particular transaction will be you can submit the transaction to chain indicating you do not want it broadcasted. This will bypass mempool checks and as long as the RC limit is under the account's current Mana it will process the transaction and give you a receipt. The receipt will give you a breakdown including how much Mana has been used. As stated earlier, the cost of Mana is dynamic therefore we do not want to take the exact cost verbatim and set it as our RC limit. It is recommended that you use the value and add a slight buffer like 5% or 10% in the event the Mana cost rise between the time you send the test transaction and when the transaction is included in a block.

### Understanding your dApp
If you are a dApp author, you likely use similar transactions repeatedly. You can have a basic understanding of the costs of different transactions within your dApp and track the cost over time. Using this inside knowledge of your own application, you can leverage this information when determining the RC limits. This stategy requires a bit more engineering work on your end, but it also cuts the amount of RPC calls in half. This may be significant if you are using a paid Koinos API provider with usage limits.
