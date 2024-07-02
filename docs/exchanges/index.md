---
hide:
- toc
---

# Exchange Integration Guide
This guide is intended for use by exchanges when integrating Koinos. It is subject to change as some of the technologies used in this guide are community developed and maintained. There will be a best effort to keep this guide updated and maintained. If you have any additional questions, please do not hesitate to reach out in our [Telegram](https://telegram.koinos.io), [Discord](https://discord.koinos.io), or to an existing contact.

Most of this information may also be useful to dApp developers, but because the target audience are exchanges, there may be large gaps.

## Technologies
This guide will use four technologies for interacting with Koinos. They are not equal. Some perform certain jobs better than others, or not at all. What technologies you choose to use are going to be dependent upon your existing application stack and how best to integrate Koinos in to it. If this guide is lacking a feature or some critical component to your integration, please contact us. It may be that we didn't think to document that particular requirement, or we could add it as a feature (depending upon complexity).

<div class="grid cards" markdown>

-   :fontawesome-solid-terminal:{ .lg .middle } __Koinos CLI__

    ---

    The Koinos CLI is a feature rich command line wallet. It can perform basic and advanced operations on Koinos with ease.
    <br/><br/>

    [:octicons-arrow-right-24: Learn the CLI](cli.md)

-  :fontawesome-brands-js:{ .lg .middle } __Koilib__

    ---

    
    Koilib is a JavaScript client library for Koinos. It is available via npm for Node projects or can be directly embedded in the browser. It provides full access to the Koinos API as well as transaction creation, signing, and submission.

    [:octicons-arrow-right-24: Let's use JavaScript](koilib.md)

-   :fontawesome-solid-server:{ .lg .middle } __REST__

    ---

    The best way to access the Koinos API is via REST. Like JSON-RPC, the API grants you full access to all read-only data about Koinos as well as providing mechanism for submitting transfers. The primary drawback of the API is that you must still sign transactions locally using another technology such as the CLI or Koilib.

    [:octicons-arrow-right-24: Let's use REST](rest.md)

</div>

## Common tasks

Additionally, this guide will provide examples on how to execute tasks on Koinos commonly used by exchanges. Each task will contain a short guide with examples for each technology that can complete the task. If your required task is not covered here or you cannot figure out how to do what you need using these guides, please reach out in Telegram or Discord and we will be happy to assist you.
