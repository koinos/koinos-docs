# Resources
Koinos manages resources using a combination of automated resource markets. Every transaction consumes three resources in different amounts. Those resources are:

1. Compute bandwidth
2. Network bandwidth
3. Disk storage

Compute bandwidth measures the computational resources required to execute a transaction. These are primarily consumed by the smart contracts called by the transaction, but also by the system calls those smart contracts use as well as basic computation to authorize the transaction prior to execution of smart contracts. Compute resources must be measured and limited to prevent unlimited contract execution (e.g. infinite loops).

Network bandwidth measures of the wire size of the transaction itself using the canonical Protobuf serialization. Network bandwidth must be limited to ensure responsiveness of the p2p network.

Disk storage measures how much state a transaction consumes upon execution. All persistent state of a smart contract is written to disk on a node. Disk storage is limited to prevent a smart contract from consuming all available storage of the system running a node.

---
## Resource market makers
The Koinos Blockchain Framework (KBF) costs resources in Resource Credits, or RC. On the Koinos mainnet RC is convertible to Mana 1:1 and can be thought of as the exact same thing. But the KBF itself is designed to support any resource system and so RC could be bought using a fee at a different rate. This guide will use the RC terminology to match the internal documentation of the KBF, but you can use Mana and RC interchangeably.

Every resource has an internal market for pricing each resource. On one side of the market is the resource and on the other is a pool of RC. The internal mechanism is an XYK market maker, as popularized by Uniswap and other similar DEXs. The XYK market maker was chosen for a few reasons.

1. The implementation is simple and efficient
2. The price curve is smooth
3. Changes in price are predictable

When a transaction is applied, each resource is tallied and priced, and the payer for the transaction is charged for each resource. If a resource costs cannot be paid, the transaction is reverted and the payer is charged for the amount up until the reversion.

The price for resources is constant each block. Each block has a maximum number of resources that can be used in that block. The price for the resource on a block is the average price for the resource assuming the maximum of that resource is used for the block. This ensures that a) the resource is always paid for completely (avoid rounding down) and b) each transaction pays the same price for resources, removing advantages for transactions being applied earlier in the block.

A challenge unique to Koinos is the need to choose a value for `k`. In a DEX, `k` is a result of the liquidity added by liquidity providers. Because the resource markets are internal and able to be directly interacted with, the implementation must choose a value, or values, for `k` depending on different situations.

---
## Derivation of k
Before deriving a value of `k`, we need a few definitions.

- `p` is the resource pool
- `r` is the rc reserve
- `B` is the block budget of new resources
- `d` is the decay percent (the percent of the resource pool the decays each block to limit how large the resource pool can become)
- `u` is the resources used on the block
- `S` is the current supply of KOIN

The basic equation of the market maker is:

```
p * r = k
```

Every block we decay, mint, and consume resources. The equation for this process at equilibrium is:

```
(d * p) + B - u = p
```

We first decay based on the decay percent, then we add the resources for the block budget and then we subtract how many were used. What equation means is that for a constant `d` and `B`, for any given usage, `u`, there is an equilibrium resource pool, `P`, that `p` will approach. This is an important behavior as it means there will be a specific price for a specific usage level. This fact will be used later on when we solve the parameterization of `k`. `t` is the number of tokens required to purchase the resources.

When we consume resources and charge rc, it will solve the equation:

```
(p - u) * (r + t) = k
```

Using the second equation, we can solve for `p`:

```
  (d * p) + B - u = p
            B - u = p - (d * p)
            B - u = p * (1 - d)
(B - u) / (1 - d) = p
```

From the first equation, we also have that:

```
r = k / p
```

Now, using the third equation, we can solve for `k`:

```
                  (p - u) * (r + S) = k
            (p - u) * ((k / p) + S) = k
k + (p * S) - (u * k / p) - (u * S) = k
                  (p * S) - (u * S) = u * k / p
                        S * (p - u) = u * k / p
              S * (p / u) * (p - u) = k
```

While this equation is a bit complicated, it is important because it means that we have a way to calculate `k` in terms of `B`, `u`, `d`, and `S`. This is important because none of these values are defined by the current state of the market maker, but based on other factors. `B`, `u`, and `d` and configured, and `S` is from the state of KOIN.

---
## Value of `u`
Consider the decay equation:

```
(d * p) + B - u = p
```

We have the block budget `B` coming in, decay percent `d` going out, and usage `u` going out. At equilibrium, the budget coming in must be equal to the decay and the usage.

```
(1 - d) * p + u = B
```

This means that the block budget must always be above the usage (or else the decay term is 0 or `p` is 0). We can therefore bound `u` between 0 and B.

When `u` is close to 0, the decay term must be larger, therefore `p` must be larger, and therefore there is more price elasticity. Conversely, when `u` is close to `B`, the decay term must be smaller, `p` must be smaller, and there is less price elasticity.

---
## Value for `d`
`d` is the decay percent to estimate the exponential decay each block. Our decay term also affects the pool size, similarly to `u`. BuT it also has the practical effect of changing the maximum and minimum resource pool sizes (by consequence the maximum and minimum price for a resource) and how quickly the pool goes from one price to another when usage changes.

In practical testing, a three day half life seemed to have a good balance of responsiveness to price moves in both directions, without being too unpredictable. Solving for `d` becomes simple.

There is a block produced every three seconds, on average, and after three days we want the resource pool to half the size. There are 86400 blocks produced, on average, every three days. We just need to solve the following equation:

```
d ^ 86400 = 0.5
86400 * ln( d ) = ln( 0.5 )
ln( d ) = ln( 0.5 ) / 86400
d = 0.5 ^ (1 / 86400)
```

The value of `d` is 0.99999197750.

---
## Budget premium
Looking at our above equation, it becomes clear that the usage `u` cannot equal the budget `B` unless the decay rate is close to 1, or the resource pool `p` is 0. For this reason the budget `B` must be larger than intended so that `u` can be equal to `B` and the equation has stability. This new factor will be called the budget premium, denoted by `m`. Our equilibrium equation now becomes:

```
(1 - d) * p + u = B * m
```

We want to fix the case when usage is at 100%. The amount printed in the budget needs to equal the downward force of both the decay rate and the usage.

```
    (1 - d) * p_100 + B = B * m
(1 - d) * p_100 / B + 1 = m
```

---
## Fractional reserve constraints
One way to think about the resource prices curves is as a fractional reserve system. When we are at 100% resource usage, we want to be at 100% Mana usage. Or, put another way, Mana always grants you a percentage of the resources, but when there is low demand, you can access more than your share.

At 100% usage the price of a resource should be proportional to the budget divided by the token supply.

The general price formula for any purchase of resources is:

```
u / t = B / S
```

More specifically, the budget's worth of resources over the Mana regeneration period, in blocks. Mana regenerates over 5 days and the block interval is 3 seconds per block, so the number of blocks in the Mana regeneration period is `86400 * 5 / 3` or `144000`. We also have three resources, so we need to cut the token supply in third. Furthermore, at 100% usage, the usage is equal to the budget (`u = B`).

The actual equation we care about is:

```
B / t_100 = (B * 144000) / (S / 3)
B / t_100 = B * 432000 / S
1 / t_100 = 432000 / S
    t_100 = S / 432000
```

We need one other point to fix that will set the curve. For this purpose, we chose 50% usage. The amount of resources needed to access 50% of the resources should be less than 50% to ensure a fractional reserve system. If the value is too low then there will be massive resource price increases as usage approaches 100%. If the value is too high, then there isn't enough incentive for surplus resources to be used. The choice of this value is more art than science. We chose 10% as a good number, meaning 10% of the token supply can access 50% of the resources. We can construct a similar equation to the one above with this parameterization.

```
(B / 2) / t_50 = (B * 144000) / (S / (3 * 5))
(B / 2) / t_50 = (B * 2160000) / S
      B / t_50 = B * 4320000 / S
      1 / t_50 = 4320000 / S
          t_50 = S / 4320000
```
