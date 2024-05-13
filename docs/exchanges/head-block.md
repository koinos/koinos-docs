# Head block
The head block is the most recent addition to any blockchain. Because of this, checking the status of the head block is a great indicator of the overall health of a blockchain. If, for example, the head block's block time is several minutes behind, that could be an indication of a problem with the blockchain, especially considering Koinos aims to have an average block time of 3 seconds. In such a scenario, it may be wise to preemptively pause deposits and withdrawals while the issue is further investigated.

There are two primary tools we use to get this information, which are used in conjunction. The first is getting the chain's head info. The head info is a short summary of the head of the chain. It contains the head block id, height, and block time (in epoch ms), as well as other information used by the blockchain itself.

We can also use the block id from the head info to look up the actual head block.

!!! notice
    The Koinos CLI cannot currently query the head block.

---
## Get head info

=== "REST"
    To retrieve the head info, we can use the path `v1/chain/head_info`.

    ``` { .txt }
    curl -X 'GET' \
    'https://api.koinos.pro/v1/chain/head_info' \
    -H 'accept: application/json' \
    -H 'X-API-KEY: WNfKg6ITYc9mWViySEvLiODZp6iti1A5'
    ```

    ``` { .json .no-copy }
    {
    "head_topology": {
        "id": "0x122070aa7100b1f1befa0991568e2a9e190b9fa68a94a2142309f076b1c0c04a6401",
        "height": "15409189",
        "previous": "0x12201284d2c24f6607ff80d3afa76a98faf5c93b6851c3e604fe2316f2c95a3018e7"
    },
    "last_irreversible_block": "15409129",
    "head_state_merkle_root": "EiBxOKByK74sZeIrqQ6oB1RauLsyxWaiRRyttUXKVAqQFA==",
    "head_block_time": "1715268142650"
    }
    ```
=== "Koilib"
    To retrieve the head info use [getHeadInfo](https://joticajulian.github.io/koilib/classes/Provider.html#getHeadInfo):

    ```ts
    const provider = new Provider("https://api.koinos.io");
    const headInfo = await provider.getHeadInfo();
    console.log(headInfo);
    ```

---
## Get head block

=== "REST"
    Using the head block ID from our previous request, we can query the block using the path `v1/block/{block_id}`

    ``` { .txt }
    curl -X 'GET' \
    'https://dev.api.koinos.pro/v1/block/0x122070aa7100b1f1befa0991568e2a9e190b9fa68a94a2142309f076b1c0c04a6401?return_block=true&return_receipt=true&decode_operations=true&decode_events=true' \
    -H 'accept: application/json' \
    -H 'X-API-KEY: WNfKg6ITYc9mWViySEvLiODZp6iti1A5'
    ```

    ``` { .json .no-copy }
    {
      "block_id": "0x122070aa7100b1f1befa0991568e2a9e190b9fa68a94a2142309f076b1c0c04a6401",
      "block_height": "15409189",
      "block": {
        "id": "0x122070aa7100b1f1befa0991568e2a9e190b9fa68a94a2142309f076b1c0c04a6401",
        "header": {
          "previous": "0x12201284d2c24f6607ff80d3afa76a98faf5c93b6851c3e604fe2316f2c95a3018e7",
          "height": "15409189",
          "timestamp": "1715268142650",
          "previous_state_merkle_root": "EiDsOzC9xAISmNIWwZPUVZy62ItGkn_S4TUe7jZ_JyO4ew==",
          "transaction_merkle_root": "EiDjsMRCmPwcFJr79MiZb7kkJ65B5GSbk0yklZkbeFK4VQ==",
          "signer": "1DMHCVtR4cjJ2bkC6TDkC5tMaU2qTB3pEb"
        },
        "signature": "ClECZlw2DPZYUa8yhMV5_5cBBvVYcbLs_DJhvj4q74zV1aqiVL9aFgxT7TW_yodssR_QMkDd9JSmPwj1FO2AHiW7_8B-AfopSFZHTkldDpxRDTISIhIgAAGVNQw-MBTIMs0KC2PBYqcRvIKLCKrIS7HkmRYtotQaQSBLlN1g1cvxuKd3Vr_CZEwNJrIbQC5h0wCj-B8eBFmhrRoUTjUrN_Q6gxPkMq_nGV0NYnNEUBW5exSim14_AxAM"
      },
      "receipt": {
        "id": "0x122070aa7100b1f1befa0991568e2a9e190b9fa68a94a2142309f076b1c0c04a6401",
        "height": "15409189",
        "network_bandwidth_used": "375",
        "compute_bandwidth_used": "2931268",
        "events": [
          {
            "source": "18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr",
            "name": "koinos.contracts.token.burn_event",
            "data": {
              "from": "1DMHCVtR4cjJ2bkC6TDkC5tMaU2qTB3pEb",
              "value": "271136865"
            },
            "impacted": [
              "1DMHCVtR4cjJ2bkC6TDkC5tMaU2qTB3pEb"
            ]
          },
          {
            "sequence": 1,
            "source": "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
            "name": "koinos.contracts.token.mint_event",
            "data": {
              "to": "1DMHCVtR4cjJ2bkC6TDkC5tMaU2qTB3pEb",
              "value": "281853536"
            },
            "impacted": [
              "1DMHCVtR4cjJ2bkC6TDkC5tMaU2qTB3pEb"
            ]
          }
        ],
        "network_bandwidth_charged": "375",
        "compute_bandwidth_charged": "2858571",
        "state_delta_entries": [
          {
            "object_space": {
              "system": true
            },
            "key": "EiDIiXqmJH5E-r9zJwsyZAAqmy-mZUrXRH47P4AmqzkbTA==",
            "value": "CiISIHCqcQCx8b76CZFWjiqeGQufpoqUohQjCfB2scDASmQBEpMBCiISIBKE0sJPZgf_gNOvp2qY-vXJO2hRw-YE_iMW8slaMBjnEKXArAcYuozL7_UxIiISIOw7ML3EAhKY0hbBk9RVnLrYi0aSf9LhNR7uNn8nI7h7KiISIOOwxEKY_BwUmvv0yJlvuSQnrkHkZJuTTKSVmRt4UrhVMhkAh3dZqikAFSllGLjpvlmPxQ8CuObuE8lgIroBClECZlw2DPZYUa8yhMV5_5cBBvVYcbLs_DJhvj4q74zV1aqiVL9aFgxT7TW_yodssR_QMkDd9JSmPwj1FO2AHiW7_8B-AfopSFZHTkldDpxRDTISIhIgAAGVNQw-MBTIMs0KC2PBYqcRvIKLCKrIS7HkmRYtotQaQSBLlN1g1cvxuKd3Vr_CZEwNJrIbQC5h0wCj-B8eBFmhrRoUTjUrN_Q6gxPkMq_nGV0NYnNEUBW5exSim14_AxAM"
          },
          {
            "object_space": {
              "system": true,
              "zone": "AC4z_RqpB7IkzpzmyUIokB0oOgLalW2nkQ=="
            },
            "value": "COXFgbTR3vkG"
          },
          {
            "object_space": {
              "system": true,
              "zone": "AGm4cZ-LWSrhw-uN7S3U23xvkVwMymnlcg=="
            },
            "value": "CIb_h_yT5ZMD"
          },
          {
            "object_space": {
              "system": true,
              "zone": "ALJp6C6zICjLRQ8DEj48TS-Rp8fr9OW8fA=="
            },
            "key": "bWFya2V0cw==",
            "value": "Cg4IsKvqhB8YsLUCIICAIBIPCMPJpqTNARiAgBAggIBAGhMIk7eqz4nVAhjgwrUbIODNi4kB"
          },
          {
            "object_space": {
              "system": true,
              "zone": "AC2JYMoRjQmqoqHV0ltl0iBF94hV5E3QsQ==",
              "id": 1
            },
            "value": "CiISIDag4AbIQFTChla_DfIfTXWbMOLUVfcPJuWXWBbg6R9OEhAAAAAAAAAAAAY89oxygdc4GLqMy-_1MQ=="
          },
          {
            "object_space": {
              "system": true,
              "zone": "AC4z_RqpB7IkzpzmyUIokB0oOgLalW2nkQ==",
              "id": 1
            },
            "key": "AId3WaopABUpZRi46b5Zj8UPArjm7hPJYA==",
            "value": "CJGz09mjBBDL5oKviwQYuozL7_Ux"
          },
          {
            "object_space": {
              "system": true,
              "zone": "AGm4cZ-LWSrhw-uN7S3U23xvkVwMymnlcg==",
              "id": 1
            },
            "key": "AId3WaopABUpZRi46b5Zj8UPArjm7hPJYA==",
            "value": "CLjmzcbcwwISDQj56KgHELjmzcbcwwI="
          }
        ]
      }
    }
    ```
=== "Koilib"
    To retrieve a block by height use [getBlock function](https://joticajulian.github.io/koilib/classes/Provider.html#getBlock):

    ```ts
    const provider = new Provider("https://api.koinos.io");
    const block = await provider.getBlock(123234);
    console.log(block);
    ```

    To retrieve a block by its ID use:

    ```ts
    const provider = new Provider("https://api.koinos.io");
    const block = await provider.getBlocksById(["0x122070aa7100b1f1befa0991568e2a9e190b9fa68a94a2142309f076b1c0c04a6401"]);
    console.log(block);
    ```
