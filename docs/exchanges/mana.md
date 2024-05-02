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

    You can set how much mana to use with the `rclimit` command. The command can be used to set an absolute limit or a relative limit.

    ``` { .txt .no-copy }
    🔓 > help rclimit
    Set or show the current rc limit. Give no limit to see current value. Give limit as either mana or a percent (i.e. 80%).
    Usage: rclimit [limit:string]
    ```

    You can set a relative limit by passing a percentage.

    ``` { .txt }
    rclimit 20%
    ```

    ``` { .txt .no-copy }
    Set rc limit to 20%
    ```

    You can set an absolute value by passing a number.

    ``` { .txt }
    rclimit 10
    ```

    ``` { .txt .no-copy }
    Set rc limit to 10
    ```
