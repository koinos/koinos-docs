---
hide:
- toc
---

# Architecture
The architecture section of the Koinos documentation provides a comprehensive overview of the underlying design and components that power the Koinos blockchain. Explore the innovative features, consensus mechanisms, and scalability solutions that differentiate Koinos from other blockchain platforms. Learn about the Koinos Virtual Machine (KVM), resource management strategies, and the unique approach to smart contract execution.

<div class="grid cards" markdown>

-   :fontawesome-solid-circle-nodes:{ .lg .middle } __Microservices__

    ---

    
    In the architecture of the Koinos blockchain, microservices play a crucial role in promoting scalability, flexibility, and maintainability. By breaking down complex functionalities into smaller, independent services, Koinos adopts a modular approach that allows for easier development, deployment, and scaling of specific blockchain components, enhancing overall system resilience and performance.
    <br/><br/>

    [:octicons-arrow-right-24: The nuts and bolts](microservices.md)

-  :fontawesome-solid-network-wired:{ .lg .middle } __Interprocess communication__

    ---

    Interprocess communication (IPC) is fundamental to the architecture of the Koinos blockchain, enabling different components and microservices to communicate and collaborate efficiently. Koinos utilizes IPC mechanisms such as message queues and remote procedure calls (RPC) to facilitate secure and reliable communication between nodes, ensuring seamless coordination and data exchange within the blockchain network.
    <br/><br/>

    [:octicons-arrow-right-24: Internal communication](interprocess-communication.md)

-   :fontawesome-solid-fire:{ .lg .middle } __Proof-of-Burn__

    ---

    
    Proof-of-Burn (PoB) is a consensus mechanism used by Koinos where participants burn tokens, demonstrating commitment to the network. The act of burning tokens reduces the circulating supply and increases the probability of being selected as a block validator based on the size of the burn relative to the total amount burned in a given period, ensuring a fair and efficient method of block producer selection.

    [:octicons-arrow-right-24: A novel consensus algorithm](proof-of-burn.md)

-   :fontawesome-solid-cubes:{ .lg .middle } __Serialization__

    ---

    Serialization is a critical aspect of the Koinos blockchain architecture, responsible for encoding and decoding structured data for efficient storage and transmission. Koinos uses serialization frameworks like Protocol Buffers to define data schemas, optimize data transmission, and ensure interoperability across different components of the blockchain network.
    <br/><br/>

    [:octicons-arrow-right-24: Encoding and decoding](serialization.md)

-   :fontawesome-solid-code:{ .lg .middle } __Smart contracts__

    ---

    Smart contracts are a foundational component of the Koinos blockchain architecture, enabling decentralized and self-executing agreements. Koinos supports smart contracts which are executed on the Koinos Virtual Machine (KVM) to enforce trustless and deterministic execution of code on the blockchain.
    <br/><br/><br/>

    [:octicons-arrow-right-24: A turing complete solution](smart-contracts.md)

-   :fontawesome-solid-file:{ .lg .middle } __Contract ABI__

    ---

    
    Contract ABIs (Application Binary Interfaces) define the interface and interaction points of smart contracts on the Koinos blockchain. These interfaces specify the methods, parameters, and return types that can be accessed and invoked by external entities interacting with smart contracts, facilitating interoperability and enabling seamless communication between different components of the blockchain ecosystem.

    [:octicons-arrow-right-24: Defining your interface](contract-abi.md)

-   :fontawesome-solid-microchip:{ .lg .middle } __Resources__

    ---

    Blockchain resources in the context of Koinos refer to the computational and storage resources required for blockchain operations such as transaction processing and smart contract execution. Koinos implements resource management mechanisms like Resource Credits (RC) and payer semantics to efficiently allocate and regulate these resources, ensuring fair usage and optimal performance of the blockchain network.
    <br/><br/><br/>

    [:octicons-arrow-right-24: Compute, network, and disk oh my!](resources.md)

-   :fontawesome-solid-left-right:{ .lg .middle } __System calls__

    ---

    System calls are fundamental components of the Koinos blockchain architecture, enabling smart contracts to interact with the underlying blockchain system and external services. These calls provide secure and controlled access to blockchain functionalities such as accessing data, performing transactions, or invoking other smart contracts, allowing developers to build complex decentralized applications (dApps) with flexible and robust capabilities on the Koinos platform.
    <br/><br/>

    [:octicons-arrow-right-24: From KVM to native](system-calls.md)

</div>