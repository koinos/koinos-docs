# Create a wallet
Creating a Koinos wallet is a fundamental step in entering the world of cryptocurrency. To set up a Koinos wallet, you can choose from various options including software wallets, hardware wallets, or online wallets offered by reputable providers. If you opt for a software wallet, you typically download and install the wallet application on your computer or mobile device. During setup, you'll generate a unique public-private key pair that serves as your wallet address and secret access key. It's crucial to secure these keys and follow best practices for backup and recovery to prevent unauthorized access or loss of funds. Hardware wallets provide an offline, physical option for enhanced security by storing your private keys offline. Once your wallet is set up and secured, you can receive, store, and send Koinos transactions confidently, knowing you have control over your digital assets.

Below you can find examples of how to createa a Koinos wallet using a variety of supported tools.

=== "Koinos CLI"

    You can use the CLI command `create` to create a new Koinos wallet. The `create` command will generate a new public/private key pairing and save the information in an encrypted file unlocked using the password you provide.

    We can view the arguments of the command:
    ``` { .txt }
    🔓 > help create
    ```
    ``` { .txt, .no-copy }
    Create and open a new wallet file
    Usage: create <filename:file> [password:string]
    ```

    An example of creating a new wallet:

    ``` { .txt }
    create file.wallet mypassword
    ```
    ``` { .txt .no-copy }
    Created and opened new wallet: file.wallet
    Address: 1JpPotf9mBCvPVkZnfs7xTTCoeRi3omNJY
    ```

    After creating the wallet, it will automatically be unlocked in the current Koinos CLI session.

    To open a wallet, you can use the `open` or `unlock` command.

    An example of opening the previously created wallet:
    ``` { .txt }
    open file.wallet mypassword
    ```
    ``` { .txt .no-copy }
    Opened wallet: file.wallet
    ```
