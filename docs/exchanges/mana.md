# Mana
Checking the amount of Resource Credits, also known as Mana, is critical when maintaining Koinos blockchain operations. Your Mana determines whether or not you have the ability to perform transactions on the chain.

Below you can find examples of how to check your current Mana using a variety of supported tools.

=== "Koinos CLI"

    You can use the CLI command `account_rc` to check an account's Mana. The `account_rc` will query the blockchain and report your currently available Mana.

    When your wallet is already opened, the command is as follows:

    ``` { .txt }
    account_rc
    ```
    ``` { .txt .no-copy }
    10535.49462399 rc
    ```

    It also works to specify an address.

    The command:

    ``` { .txt }
    account_rc 1EPZaqve43k9Jq5mNeT2ydCjUiytTTU4U
    ```
    ``` { .txt .no-copy }
    10535.49462399 rc
    ```