[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [common](../modules/common.md) / block\_topology

# Class: block\_topology

[common](../modules/common.md).block_topology

## Table of contents

### Constructors

- [constructor](common.block_topology.md#constructor)

### Properties

- [height](common.block_topology.md#height)
- [id](common.block_topology.md#id)
- [previous](common.block_topology.md#previous)

### Methods

- [decode](common.block_topology.md#decode)
- [encode](common.block_topology.md#encode)

## Constructors

### constructor

• **new block_topology**(`id?`, `height?`, `previous?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `Uint8Array` | `undefined` |
| `height` | `number` | `0` |
| `previous` | `Uint8Array` | `undefined` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/common.ts:54

## Properties

### height

• **height**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/common.ts:51

___

### id

• **id**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/common.ts:50

___

### previous

• **previous**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/common.ts:52

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`block_topology`](common.block_topology.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`block_topology`](common.block_topology.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/common.ts:22

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`block_topology`](common.block_topology.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/common.ts:5
