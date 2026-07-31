---
icon: fontawesome/solid/calculator
---

# Resource market mathematics

Koinos prices compute bandwidth, network bandwidth, and disk storage through
three independent resource markets. This page derives the model implemented by
the Resources system contract and maps each equation to the selected
[versioned implementation](https://github.com/koinos/koinos-contracts-cpp/blob/80f55538a5fbf6526e2e1df93d9bf4981eb6c2e7/contracts/resources/resources.cpp).

The derivation is useful when reviewing protocol changes. It is not an
application pricing table or a record of current mainnet parameters.

!!! note "Versioned defaults are not live network state"

    The contract stores resource parameters and market settings in blockchain
    state, and its setters require system authority. The constants discussed
    below are the defaults at the selected source revision. Governance may
    change the stored values. Applications should query current resource limits
    instead of embedding these defaults.

## Variables and units

Each of the three resource types has its own market. The same equations apply
to each market.

| Symbol | Implementation concept | Meaning |
| --- | --- | --- |
| `N` | `num_resources` | Number of independently priced resource types; three in this implementation |
| `x` | `market.resource_supply` | Resource units currently available in one market |
| `y` | Virtual RC reserve | RC side of the constant-product model; derived from `k / x`, not stored in the current market schema |
| `k` | Result of `calculate_k` | Constant-product invariant for one resource market |
| `B` | `market.block_budget` | Per-block budget used to calibrate printing and the price curve |
| `L` | `market.block_limit` | Configured upper bound for that resource in one block |
| `u` | `consumed` | Resource units consumed by a completed block |
| `a` | `decay_constant / 2^64` | Fraction of the existing resource supply retained per block |
| `d` | `one_minus_decay_constant / 2^64` | Complement of the retained fraction, approximately `1 - a` |
| `m` | `print_rate_premium` | Numerator of the print-rate multiplier |
| `q` | `print_rate_precision` | Denominator of the print-rate multiplier |
| `P` | `print_rate` | Resource units printed for the market each block |
| `S` | KOIN `total_supply()` | KOIN supply in its smallest units used by `rc_per_block` |
| `D` | `block_interval_ms` | Expected block interval in milliseconds |
| `T` | `rc_regen_ms` | RC regeneration interval in milliseconds |
| `R` | `rc_per_block` | RC assigned to one resource market for one block interval |
| `l` | `resource_limit` | Resource limit returned for the current market state |
| `c` | `consumed_rc` | RC required to move across the selected part of the price curve |
| `w` | `rc_cost` | Conservatively rounded RC cost per resource unit |

The historical documentation called `a` a “decay percentage.” That is
misleading: `a` is close to one and represents the retained fraction. The
amount removed by decay is represented by `d`.

## Constant-product resource market

For an idealized market with resource supply `x` and virtual RC reserve `y`,
the invariant is:

```text
x * y = k
```

Consuming `z` resource units reduces the resource side to `x - z`. If `t` is
the corresponding RC charge, the constant-product relationship is:

```text
(x - z) * (y + t) = k
```

Solving for the idealized RC charge gives:

```text
t = k / (x - z) - k / x
```

This is a protocol-internal pricing curve. It is not a tradable decentralized
exchange, there are no user liquidity providers, and the virtual RC reserve is
not a balance stored in the current
[`market` schema](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/contracts/resources/resources.proto#L6-L10).

## Per-block resource supply

The contract first calculates the number of resource units printed for a
market:

```text
P = floor(m * B / q)
```

After a block consumes `u_n` resource units, `update_market` applies the
fixed-point retention factor and prints the next allocation:

```text
x_(n+1) = floor(a * x_n) + P - u_n
```

In the C++ implementation, multiplication by `a` is performed as:

```text
floor(x_n * decay_constant / 2^64)
```

Ignoring integer rounding, constant usage `u` has an equilibrium supply:

```text
                P - u
x_equilibrium = -------
                  d
```

This follows from:

```text
a * x + P - u = x
(1 - a) * x   = P - u
```

The initial market supply is approximately the zero-usage equilibrium:

```text
x_initial = floor(P * 2^64 / one_minus_decay_constant)
```

Lower sustained usage leaves a larger resource supply and a flatter portion of
the price curve. Higher sustained usage leaves a smaller supply, so removing
more resources requires more RC. Integer truncation means the actual state can
differ slightly from the real-number equilibrium.

## RC available per block

`rc_per_block` divides the regenerating RC capacity across the three resource
types:

```text
            S * D
R = floor( ------- )
            T * N
```

`S` and `R` use the smallest token and RC units. `D / T` is the fraction of a
full regeneration interval represented by one block. Dividing by `N` assigns
an equal share of that interval's RC capacity to each independently priced
resource type.

The implementation uses unsigned 128-bit intermediate arithmetic before
converting the result to `uint64_t`. The division rounds down.

## Derivation of `k`

The contract calibrates the invariant at usage equal to one block budget. Let
`x_B` be the equilibrium resource supply when `u = B`:

```text
P = floor(m * B / q)

      P - B
x_B = -----
        d
```

The fixed-point implementation calculates it as:

```text
x_B = floor((P - B) * 2^64 / one_minus_decay_constant)
```

The idealized invariant is then selected so consuming `B` resource units at
`x_B` costs `R` RC:

```text
    R * x_B
k = ------- * (x_B - B)
       B
```

Substituting this value into the constant-product charge shows the calibration:

```text
     k         k
--------- - ----- = R
x_B - B     x_B
```

The implementation preserves the operation order:

```text
k = floor(R * x_B / B) * (x_B - B)
```

This maps directly to
[`calculate_k`](https://github.com/koinos/koinos-contracts-cpp/blob/80f55538a5fbf6526e2e1df93d9bf4981eb6c2e7/contracts/resources/resources.cpp#L169-L174).
Because the contract uses integer arithmetic, the final calibration is
conservative rather than an exact real-number equality.

## Resource limit and unit cost

`calculate_market_limit` starts with the smaller of the current market supply
and the configured block limit:

```text
l = min(x - 1, L)
```

Subtracting one prevents the denominator in the next calculation from becoming
zero. With `x_new = x - l`, the implementation calculates:

```text
c = ceil(k / x_new) - floor(k / x)
w = ceil(c / l)
```

The source implements ceiling division with:

```text
ceil(n / v) = (n + v - 1) / v
```

The result is one limit and one per-unit RC cost for each resource type.
Chain's resource meter applies that cost to the compute, network, and disk
units used during execution. Rounding upward avoids understating the RC needed
for the selected range of the curve.

## Version-specific default parameters

The selected contract revision defines the following fallback values when
parameter or market state has not already been stored:

| Parameter | Default at the selected revision |
| --- | ---: |
| Number of markets, `N` | `3` |
| Expected block interval, `D` | `3,000 ms` |
| RC regeneration interval, `T` | `432,000,000 ms` (5 days) |
| Print-rate multiplier, `m / q` | `1,688 / 1,000` |
| Disk block budget | `39,600` |
| Disk block limit | `524,288` |
| Network block budget | `262,144` |
| Network block limit | `1,048,576` |
| Compute block budget | `57,500,000` |
| Compute block limit | `287,500,000` |

These are source defaults, not a statement of current mainnet state.

### Half-life discrepancy in the selected source

The source comment labels `decay_constant_default` as an exponential-decay
constant for a one-month half-life. The encoded value does not match that
label. At the default three-second block interval:

```text
a = 18446596084619782819 / 2^64

a^86400  ~= 0.5       # 86,400 blocks, approximately 3 days
a^864000 ~= 0.0009766 # 864,000 blocks, approximately 30 days
```

The encoded value therefore has a half-life of approximately three days. This
matches the historical derivation that was previously on the Resources page,
while the one-month wording remains in the selected source comment. The
documentation cannot determine which value reflects current maintainer intent,
so it records the discrepancy rather than presenting the comment as verified
behavior.

The five-day RC regeneration interval is a separate parameter. It controls the
`R` calculation and must not be interpreted as the resource-supply half-life.

`decay_constant` and `one_minus_decay_constant` are stored separately as Q64
integers. Their selected defaults differ from an exact `2^64` sum by two units
because of integer approximation.

## Design implications and limitations

- The block budget participates in market printing and curve calibration. The
  block limit is a separate hard cap used when returning current limits.
- Low and high utilization move the market to different resource-supply
  equilibria and therefore different parts of the constant-product curve.
- Market budgets, limits, decay, regeneration, and print-rate parameters can be
  changed only through calls that pass
  [system authority](https://github.com/koinos/koinos-contracts-cpp/blob/80f55538a5fbf6526e2e1df93d9bf4981eb6c2e7/contracts/resources/resources.cpp#L144-L167).
- The derivation uses real-number equations to explain intent. Consensus
  behavior is the fixed-point integer operation order in the contract.
- Applications should use the current `get_resource_limits` result. They should
  not calculate transaction prices from the defaults on this page.

## Versioned sources

- [Resources system contract, selected revision](https://github.com/koinos/koinos-contracts-cpp/blob/80f55538a5fbf6526e2e1df93d9bf4981eb6c2e7/contracts/resources/resources.cpp)
- [Resource market and parameter schemas in `koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/contracts/resources/resources.proto)
- [Resource limit and block-consumption system-call schemas in `koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/chain/system_calls.proto#L198-L213)
- [Resource-market integration test at a fixed revision](https://github.com/koinos/koinos-integration-tests/blob/74b64d739a98045630cb61557e1f141c04cd1eb1/tests/resource/resource_test.go)
- [Latest Resources contract source](https://github.com/koinos/koinos-contracts-cpp/blob/master/contracts/resources/resources.cpp)
- [Latest resource-market integration test](https://github.com/koinos/koinos-integration-tests/blob/master/tests/resource/resource_test.go)

Return to the [Resource model overview](resources.md).
