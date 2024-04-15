[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [chain](../modules/chain.md) / resource\_limit\_data

# Class: resource\_limit\_data

[chain](../modules/chain.md).resource_limit_data

## Table of contents

### Constructors

- [constructor](chain.resource_limit_data.md#constructor)

### Properties

- [compute\_bandwidth\_cost](chain.resource_limit_data.md#compute_bandwidth_cost)
- [compute\_bandwidth\_limit](chain.resource_limit_data.md#compute_bandwidth_limit)
- [disk\_storage\_cost](chain.resource_limit_data.md#disk_storage_cost)
- [disk\_storage\_limit](chain.resource_limit_data.md#disk_storage_limit)
- [network\_bandwidth\_cost](chain.resource_limit_data.md#network_bandwidth_cost)
- [network\_bandwidth\_limit](chain.resource_limit_data.md#network_bandwidth_limit)

### Methods

- [decode](chain.resource_limit_data.md#decode)
- [encode](chain.resource_limit_data.md#encode)

## Constructors

### constructor

• **new resource_limit_data**(`disk_storage_limit?`, `disk_storage_cost?`, `network_bandwidth_limit?`, `network_bandwidth_cost?`, `compute_bandwidth_limit?`, `compute_bandwidth_cost?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `disk_storage_limit` | `number` | `0` |
| `disk_storage_cost` | `number` | `0` |
| `network_bandwidth_limit` | `number` | `0` |
| `network_bandwidth_cost` | `number` | `0` |
| `compute_bandwidth_limit` | `number` | `0` |
| `compute_bandwidth_cost` | `number` | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:487

## Properties

### compute\_bandwidth\_cost

• **compute\_bandwidth\_cost**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:485

___

### compute\_bandwidth\_limit

• **compute\_bandwidth\_limit**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:484

___

### disk\_storage\_cost

• **disk\_storage\_cost**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:481

___

### disk\_storage\_limit

• **disk\_storage\_limit**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:480

___

### network\_bandwidth\_cost

• **network\_bandwidth\_cost**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:483

___

### network\_bandwidth\_limit

• **network\_bandwidth\_limit**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:482

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`resource_limit_data`](chain.resource_limit_data.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`resource_limit_data`](chain.resource_limit_data.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:440

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`resource_limit_data`](chain.resource_limit_data.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:408
