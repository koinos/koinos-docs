[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [chain](../modules/chain.md) / head\_info

# Class: head\_info

[chain](../modules/chain.md).head_info

## Table of contents

### Constructors

- [constructor](chain.head_info.md#constructor)

### Properties

- [head\_block\_time](chain.head_info.md#head_block_time)
- [head\_topology](chain.head_info.md#head_topology)
- [last\_irreversible\_block](chain.head_info.md#last_irreversible_block)

### Methods

- [decode](chain.head_info.md#decode)
- [encode](chain.head_info.md#encode)

## Constructors

### constructor

• **new head_info**(`head_topology?`, `head_block_time?`, `last_irreversible_block?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `head_topology` | ``null`` \| [`block_topology`](common.block_topology.md) | `null` |
| `head_block_time` | `number` | `0` |
| `last_irreversible_block` | `number` | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:297

## Properties

### head\_block\_time

• **head\_block\_time**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:294

___

### head\_topology

• **head\_topology**: ``null`` \| [`block_topology`](common.block_topology.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:293

___

### last\_irreversible\_block

• **last\_irreversible\_block**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:295

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`head_info`](chain.head_info.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`head_info`](chain.head_info.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:262

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`head_info`](chain.head_info.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:242
