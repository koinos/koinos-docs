[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [chain](../modules/chain.md) / compute\_bandwidth\_registry

# Class: compute\_bandwidth\_registry

[chain](../modules/chain.md).compute_bandwidth_registry

## Table of contents

### Constructors

- [constructor](chain.compute_bandwidth_registry.md#constructor)

### Properties

- [entries](chain.compute_bandwidth_registry.md#entries)

### Methods

- [decode](chain.compute_bandwidth_registry.md#decode)
- [encode](chain.compute_bandwidth_registry.md#encode)

## Constructors

### constructor

• **new compute_bandwidth_registry**(`entries?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `entries` | [`compute_bandwidth_entry`](chain.compute_bandwidth_entry.md)[] | `[]` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:671

## Properties

### entries

• **entries**: [`compute_bandwidth_entry`](chain.compute_bandwidth_entry.md)[]

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:669

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`compute_bandwidth_registry`](chain.compute_bandwidth_registry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`compute_bandwidth_registry`](chain.compute_bandwidth_registry.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:647

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`compute_bandwidth_registry`](chain.compute_bandwidth_registry.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:637
