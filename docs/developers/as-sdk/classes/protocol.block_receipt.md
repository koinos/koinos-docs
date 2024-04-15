[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / block\_receipt

# Class: block\_receipt

[protocol](../modules/protocol.md).block_receipt

## Table of contents

### Constructors

- [constructor](protocol.block_receipt.md#constructor)

### Properties

- [compute\_bandwidth\_charged](protocol.block_receipt.md#compute_bandwidth_charged)
- [compute\_bandwidth\_used](protocol.block_receipt.md#compute_bandwidth_used)
- [disk\_storage\_charged](protocol.block_receipt.md#disk_storage_charged)
- [disk\_storage\_used](protocol.block_receipt.md#disk_storage_used)
- [events](protocol.block_receipt.md#events)
- [height](protocol.block_receipt.md#height)
- [id](protocol.block_receipt.md#id)
- [logs](protocol.block_receipt.md#logs)
- [network\_bandwidth\_charged](protocol.block_receipt.md#network_bandwidth_charged)
- [network\_bandwidth\_used](protocol.block_receipt.md#network_bandwidth_used)
- [state\_merkle\_root](protocol.block_receipt.md#state_merkle_root)
- [transaction\_receipts](protocol.block_receipt.md#transaction_receipts)

### Methods

- [decode](protocol.block_receipt.md#decode)
- [encode](protocol.block_receipt.md#encode)

## Constructors

### constructor

• **new block_receipt**(`id?`, `height?`, `disk_storage_used?`, `network_bandwidth_used?`, `compute_bandwidth_used?`, `state_merkle_root?`, `events?`, `transaction_receipts?`, `logs?`, `disk_storage_charged?`, `network_bandwidth_charged?`, `compute_bandwidth_charged?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `Uint8Array` | `undefined` |
| `height` | `number` | `0` |
| `disk_storage_used` | `number` | `0` |
| `network_bandwidth_used` | `number` | `0` |
| `compute_bandwidth_used` | `number` | `0` |
| `state_merkle_root` | `Uint8Array` | `undefined` |
| `events` | [`event_data`](protocol.event_data.md)[] | `[]` |
| `transaction_receipts` | [`transaction_receipt`](protocol.transaction_receipt.md)[] | `[]` |
| `logs` | `string`[] | `[]` |
| `disk_storage_charged` | `number` | `0` |
| `network_bandwidth_charged` | `number` | `0` |
| `compute_bandwidth_charged` | `number` | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1242

## Properties

### compute\_bandwidth\_charged

• **compute\_bandwidth\_charged**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1240

___

### compute\_bandwidth\_used

• **compute\_bandwidth\_used**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1233

___

### disk\_storage\_charged

• **disk\_storage\_charged**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1238

___

### disk\_storage\_used

• **disk\_storage\_used**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1231

___

### events

• **events**: [`event_data`](protocol.event_data.md)[]

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1235

___

### height

• **height**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1230

___

### id

• **id**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1229

___

### logs

• **logs**: `string`[]

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1237

___

### network\_bandwidth\_charged

• **network\_bandwidth\_charged**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1239

___

### network\_bandwidth\_used

• **network\_bandwidth\_used**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1232

___

### state\_merkle\_root

• **state\_merkle\_root**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1234

___

### transaction\_receipts

• **transaction\_receipts**: [`transaction_receipt`](protocol.transaction_receipt.md)[]

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1236

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`block_receipt`](protocol.block_receipt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`block_receipt`](protocol.block_receipt.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1163

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`block_receipt`](protocol.block_receipt.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1092
