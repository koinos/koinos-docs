# Account balance
Retrieving your cryptocurrency account balance involves accessing your digital wallet through a secure platform or app. By logging in with your credentials, you can view the current balance of your various tokens held in your wallet. This accessibility allows users to stay informed about their digital asset holdings and manage their investments effectively in the dynamic world of cryptocurrencies.

Below you can find examples of how to retrieve your KOIN balance using a variety of supported tools.

=== "Koinos CLI"

    You can use the KOIN contract entry point `balance_of` to return the current balance for an account. If no arguments are passed in, it will use the currently open wallet. If an address is provided, it will return the balance of that address.
    
    If you have not registered the KOIN contract in your CLI and therefore do not have the `koin.balance_of` command, visit the documentation on Koinos CLI under the [`.koinosrc`](../developers/cli.md#koinos-cli-rc-file) section to set it up.

    When your wallet is already opened, the command is as follows:

    ``` { .txt }
    koin.balance_of
    ```
    ``` { .txt .no-copy }
    10887.50234469 KOIN
    ```

    It also works to specify an address.

    The command:

    ``` { .txt }
    koin.balance_of 1EPZaqve43k9Jq5mNeT2ydCjUiytTTU4U
    ```
    ``` { .txt .no-copy }
    10887.50234469 KOIN
    ```
