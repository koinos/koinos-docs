# Koinos CLI Wallet

The [Koinos CLI](https://github.com/koinos/koinos-cli) is an interactive
command-line application for managing a wallet and communicating with a Koinos
JSON-RPC endpoint.

The CLI is written in Go. It is not the Node.js package `@koinos/cli`, and its
commands do not use forms such as `koinos-cli wallet ...` or
`koinos-cli config ...`.

## Install

### Download a release

Download the archive for your operating system from the
[Koinos CLI releases](https://github.com/koinos/koinos-cli/releases). Extract
the archive and run the included `koinos-cli` binary.

### Build from source

Building requires a current Go toolchain:

```bash
git clone https://github.com/koinos/koinos-cli.git
cd koinos-cli
go build -o koinos-cli ./cmd/cli
```

The executable is created as `./koinos-cli`.

## Start and connect

Connect to mainnet when starting the CLI:

```bash
./koinos-cli --rpc https://api.koinos.io/
```

Connect to the public testnet:

```bash
./koinos-cli --rpc https://testnet.koinosfoundation.org/jsonrpc
```

You can also start without `--rpc` and connect from the interactive prompt:

```text
> connect https://api.koinos.io/
```

A red connection indicator means that the CLI is not connected to an RPC
endpoint.

## Learn the interactive commands

At the CLI prompt:

```text
> list
> help create
> help transfer
```

`list` shows the commands available in the installed version.
`help COMMAND_NAME` shows its current syntax. Prefer this built-in help over
command examples copied from old documentation.

## Create and open a wallet

Create a wallet file:

```text
> create my.wallet YOUR_LOCAL_WALLET_PASSWORD
```

Open it in a later session:

```text
> open my.wallet YOUR_LOCAL_WALLET_PASSWORD
```

Close the active wallet:

```text
> close
```

Replace the password placeholder locally. Do not reuse a password shown in a
tutorial.

## Import an existing WIF key

The CLI accepts an existing Wallet Import Format private key:

```text
> import YOUR_PRIVATE_WIF imported.wallet YOUR_LOCAL_WALLET_PASSWORD
```

!!! danger "Treat the WIF as a private key"

    Never paste this command into chat, an issue, a pull request, or a shared
    terminal recording. Anyone who obtains the WIF can authorize actions for
    that account.

## Read a balance

Reading a balance requires only a public address:

```text
> balance YOUR_KOINOS_ADDRESS
```

No open wallet is required to share or query a public address.

## Transfer KOIN

With the sending wallet open and the intended network selected:

```text
> transfer 1.0 RECIPIENT_KOINOS_ADDRESS
```

The official CLI syntax is `transfer AMOUNT ADDRESS`. Review the network,
amount, recipient, and available Mana before confirming.

## Work with contracts

The CLI can load a contract ABI with `register` and then expose that contract's
methods as interactive commands:

```text
> register NAME CONTRACT_ADDRESS ABI_FILE
```

Use `help register` in the installed CLI for the exact argument format. Contract
uploads use the `upload` command; use `help upload` before deploying.

## Transaction sessions

A session groups multiple operations into one transaction:

```text
> session begin
> session view
> session submit
```

Use `session cancel` to discard the pending session before submission.

## Testnet workflow

1. Start the CLI with the current testnet JSON-RPC endpoint.
2. Create or open a wallet reserved for testnet use.
3. Copy its public address.
4. Request valueless test tokens from the
   [Telegram faucet](https://t.me/KoinosTestnetFaucetBot).
5. Confirm the current testnet chain ID before signing transactions.

The public testnet can reset. Follow
[Mainnet vs Testnet](mainnet-vs-testnet.md) for the current endpoint, chain-ID
query, and faucet syntax.

## Security notes

- Keep wallet files and backups encrypted and access-controlled.
- Do not put passwords, WIF keys, or recovery material in shell scripts.
- Be careful with terminal history, logs, screen sharing, and process
  automation.
- Use different wallet files for mainnet funds and testnet experiments.
- Connect only to endpoints you trust.

## Reference

The authoritative command overview is the
[Koinos CLI README](https://github.com/koinos/koinos-cli#using-the-koinos-cli).
