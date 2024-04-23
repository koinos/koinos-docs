# Resource management
Resource management in smart contracts refers to the allocation and utilization of computational resources, storage, and network bandwidth within a blockchain network. Smart contracts, which are self-executing contracts with the terms of the agreement directly written into code, require resources to perform their functions and interact with the blockchain. Efficient resource management involves optimizing Mana usage, minimizing storage costs by storing only essential data on-chain, and considering network bandwidth limitations for interactions with other contracts or external systems. Effective resource management ensures the scalability, cost-effectiveness, and performance of smart contracts within decentralized applications (DApps), enabling them to operate reliably and efficiently on blockchain networks.

There are three independently priced resources on Koinos that dApp developers should be familiar with. They are compute bandwidth, network bandwidth, and disk storage. Compute bandwidth is a measure of KVM ticks and CPU cycles, think computational intensity. Network bandwidth is a charge relating to the size of bytes moving throughout the network. Finally, disk storage is the amount of persistent data stored by the blockchain.

Using less resources equate to less mana cost which of course provides a better UX (User Experience) when the user is expected to pay the Mana. If your dApp pays for Mana usage, then having efficient resource management will enable you to scale your operation effectively.

---
## Managing compute bandwidth
Writing performant code in software development offers significant computational resource savings by optimizing the efficiency of algorithms, data structures, and overall program execution. Performant code minimizes the consumption of CPU cycles, resulting in faster execution times and reduced compute bandwidth.

Things you might pay attention to when optimizing for compute bandwidth are loops, serialization/deserialization of large data structures, and the separation of responsibilities within methods.

---
## Managing disk storage
Storing large objects to persistent state will end up costing you large amounts of Mana. When optimizing for disk storage, consider the data your dApp actually requires to function. You should ask yourself if the data truly needs to be on-chain. It is really as simple as storing the bare minimum of what your dApp requires to operate.

Another strategy that can assist you in lowering your disk storage usage is reclaiming old or unused data. You are essentially credited within a transaction for reclaimed disk so use it to your advantage. This behavior only applies within a transaction that is also using disk. In other words, you do not gain positive Mana through reclamation but your current storage cost will be discounted.

---
## Managing network bandwidth
When considering network bandwidth optimization, we are mostly talking about transaction size. The smaller the transaction size, the lower the network bandwidth being used. All transactions bounce around the network which has a cost and eventually they end up in a block. Blocks also have their limits. Have a look at your contract interface and look for ways to shrink the transactions required to interact with your dApp.