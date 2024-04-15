[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [System](../modules/System.md) / ProtoDatabaseObject

# Class: ProtoDatabaseObject<TMessage\>

[System](../modules/System.md).ProtoDatabaseObject

## Type parameters

| Name |
| :------ |
| `TMessage` |

## Table of contents

### Constructors

- [constructor](System.ProtoDatabaseObject.md#constructor)

### Properties

- [key](System.ProtoDatabaseObject.md#key)
- [value](System.ProtoDatabaseObject.md#value)

## Constructors

### constructor

• **new ProtoDatabaseObject**<`TMessage`\>(`obj`, `decoder`)

#### Type parameters

| Name |
| :------ |
| `TMessage` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `database_object` |
| `decoder` | (`reader`: `Reader`, `length`: `number`) => `TMessage` |

#### Defined in

[assembly/systemCalls.ts:1002](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L1002)

## Properties

### key

• **key**: ``null`` \| `Uint8Array`

#### Defined in

[assembly/systemCalls.ts:1000](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L1000)

___

### value

• **value**: `TMessage`

#### Defined in

[assembly/systemCalls.ts:999](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L999)
