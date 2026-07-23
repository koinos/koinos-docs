import {
  KondorClient,
  isKondorAvailable,
} from "./wallet.js";

// --8<-- [start:app-controller]
export function createApp(elements, client = new KondorClient()) {
  async function connect() {
    elements.status.textContent = "Waiting for Kondor approval…";
    const { account, chainId } = await client.connect();
    elements.account.textContent = account;
    elements.network.textContent = chainId;
    elements.status.textContent = "Connected";
  }

  async function sign() {
    elements.status.textContent = "Review the message in Kondor…";
    const { signature } = await client.signMessage(elements.message.value);
    elements.signature.textContent = String(signature);
    elements.status.textContent = "Message signed";
  }

  elements.connect.addEventListener("click", () =>
    connect().catch((error) => {
      elements.status.textContent = error.message;
    })
  );
  elements.sign.addEventListener("click", () =>
    sign().catch((error) => {
      elements.status.textContent = error.message;
    })
  );
  return { connect, sign };
}
// --8<-- [end:app-controller]

// --8<-- [start:wallet-client]
export function initializeWalletPage(browser = globalThis) {
  const available = isKondorAvailable(browser);
  const status = browser.document.querySelector("#status");
  status.textContent = available
    ? "Kondor detected. Connect when ready."
    : "Kondor is not available in this browser.";
  return available;
}
// --8<-- [end:wallet-client]

const elements = {
  status: document.querySelector("#status"),
  account: document.querySelector("#account"),
  network: document.querySelector("#network"),
  message: document.querySelector("#message"),
  signature: document.querySelector("#signature"),
  connect: document.querySelector("#connect"),
  sign: document.querySelector("#sign"),
};

initializeWalletPage();
createApp(elements);
