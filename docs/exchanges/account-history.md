# Account history
A crucial feature of blockchain technology is the ability to audit the history of the blockchain. Accessing an account's history is an important requirement for interacting with blockchain. On Koinos, account history contains both transactions and events. Events are emitted by contracts to communicate when the result of a transaction has affected an account. For example, when a token is transferred, the transfer event is emitted for both the sender and receiver of the transaction.

=== "Koinos CLI"

    The Koinos CLI cannot currently query account history.

=== "REST"

    The REST API path `v1/account/{account}/history` can be used to retrieve the history of a specific account.

    There are several query parameters that can be used to customize the call.

    | Option | Type | Description |
    |---|---|---|
    | `limit` | string | Number of records to be returned |
    | `sequence_number` | string | Sequence number offset |
    | `ascending` | boolean | Arrange records in ascending or descending order |
    | `irreversible` | boolean | Choose if only irreversible records should be returned |
    | `decode_operations` | boolean | Choose if operations should be decoded |
    | `decode_events` | boolean | Choose if events should be decoded |

    ``` { .txt }
    curl -X 'GET' \
    'https://dev.api.koinos.pro/v1/account/1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS/history?limit=2&sequence_number=5&decode_operations=true&decode_events=true' \
    -H 'accept: application/json' \
    -H 'X-API-KEY: WNfKg6ITYc9mWViySEvLiODZp6iti1A5'
    ```

    ``` { .json .no-copy }
    [
      {
        "seq_num": "5",
        "trx": {
          "transaction": {
            "id": "0x1220d9329aa3b59eb772c02af25e17ae5d77aeb849e64708def799b8ec4364151773",
            "header": {
              "chain_id": "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA==",
              "rc_limit": "68402481",
              "nonce": "KAM=",
              "operation_merkle_root": "EiDkuc8gqEVyxcQMmG1wyF2LaYdnRQP733gRfYNAim4Tqw==",
              "payer": "1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS"
            },
            "operations": [
              {
                "call_contract": {
                  "contract_id": "1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS",
                  "entry_point": "set_metadata",
                  "args": {
                    "metadata": {
                      "operator_wallet": "14kaxQWCkXc35RAo4fgxTqoT6RCGPahCdi",
                      "operator_fee": "20",
                      "koin_buffer": "1000000000"
                    }
                  }
                }
              }
            ],
            "signatures": [
              "IJRp6TpPcv52nLa3S971s5H_gdlzanKm92QRTJ93YL-eMhf1WbIYgg3OtWO1J57w29ejB7rlHvHoyO6MlXZ9KQA="
            ]
          },
          "receipt": {
            "id": "0x1220d9329aa3b59eb772c02af25e17ae5d77aeb849e64708def799b8ec4364151773",
            "payer": "1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS",
            "max_payer_rc": "68403233",
            "rc_limit": "68402481",
            "rc_used": "517371",
            "network_bandwidth_used": "289",
            "compute_bandwidth_used": "484004"
          }
        }
      },
      {
        "seq_num": "6",
        "trx": {
          "transaction": {
            "id": "0x1220774b29d4eefcc3cf6fff708d19a53bb02dac06c2d76a474df6ff81435028ce89",
            "header": {
              "chain_id": "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA==",
              "rc_limit": "356314581964",
              "nonce": "KAc=",
              "operation_merkle_root": "EiBDg5xCbGOku-daJg2fkHTzCmGoXQdHv46EC4TzZZx7qg==",
              "payer": "189zu13ZVKWMuoczZR7XWx4mUuRkiJzt4y"
            },
            "operations": [
              {
                "call_contract": {
                  "contract_id": "1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS",
                  "entry_point": "deposit_koin",
                  "args": {
                    "account": "189zu13ZVKWMuoczZR7XWx4mUuRkiJzt4y",
                    "value": "905000000"
                  }
                }
              }
            ],
            "signatures": [
              "H2ry33CwgodiElZh_ukiXz6Hj5mCAlETMFrlTG4Jl3B2Sz1cSiZetuusjFOvpPzXrcPOsXN1nPTFSgN_673XoaE="
            ]
          },
          "receipt": {
            "id": "0x1220774b29d4eefcc3cf6fff708d19a53bb02dac06c2d76a474df6ff81435028ce89",
            "payer": "189zu13ZVKWMuoczZR7XWx4mUuRkiJzt4y",
            "max_payer_rc": "356314581964",
            "rc_limit": "356314581964",
            "rc_used": "2069240",
            "disk_storage_used": "2",
            "network_bandwidth_used": "287",
            "compute_bandwidth_used": "2032911",
            "events": [
              {
                "sequence": 2,
                "source": "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
                "name": "koinos.contracts.token.transfer_event",
                "data": {
                  "from": "189zu13ZVKWMuoczZR7XWx4mUuRkiJzt4y",
                  "to": "1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS",
                  "value": "905000000"
                },
                "impacted": [
                  "1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS",
                  "189zu13ZVKWMuoczZR7XWx4mUuRkiJzt4y"
                ]
              },
              {
                "sequence": 3,
                "source": "1NHReq2apWsQ6UPBjNqcV3ABsj88Ncimiy",
                "name": "token.mint_event",
                "data": {
                  "to": "189zu13ZVKWMuoczZR7XWx4mUuRkiJzt4y",
                  "value": "905000000"
                },
                "impacted": [
                  "189zu13ZVKWMuoczZR7XWx4mUuRkiJzt4y"
                ]
              },
              {
                "sequence": 4,
                "source": "1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS",
                "name": "pool.deposit_koin",
                "data": "ChkATnyJrTXQM2LRtJD2rU2wkij2ovP3WRlqEMDoxK8D",
                "impacted": [
                  "189zu13ZVKWMuoczZR7XWx4mUuRkiJzt4y"
                ]
              }
            ]
          }
        }
      }
    ]
    ```
