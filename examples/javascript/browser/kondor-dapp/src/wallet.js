import {
  getAccounts,
  getProvider,
  getSigner,
} from "kondor-js";

export const kondorApi = { getAccounts, getProvider, getSigner };

// --8<-- [start:detect]
export function isKondorAvailable(browser = globalThis) {
  return Boolean(browser.window?.kondor);
}
// --8<-- [end:detect]

// --8<-- [start:connect]
export async function connectKondor(api = kondorApi) {
  const accounts = await api.getAccounts();
  if (!accounts.length) throw new Error("Kondor returned no accounts");
  return accounts[0];
}
// --8<-- [end:connect]

// --8<-- [start:setup-signer]
export async function setupKondorSigner(api = kondorApi) {
  const [account, signer, provider] = await Promise.all([
    connectKondor(api),
    api.getSigner(),
    api.getProvider(),
  ]);
  signer.provider = provider;
  return { account, signer, provider };
}
// --8<-- [end:setup-signer]

// --8<-- [start:request-signature]
export async function requestMessageSignature(message, api = kondorApi) {
  if (!message.trim()) throw new Error("Enter a message before signing");
  const { account, signer } = await setupKondorSigner(api);
  const signature = await signer.signMessage(message);
  return { account, signature };
}
// --8<-- [end:request-signature]

// --8<-- [start:account-refresh]
export async function refreshAccount(previousAccount, api = kondorApi) {
  const accounts = await api.getAccounts();
  const account = accounts[0] ?? null;
  return { account, changed: account !== previousAccount };
}
// --8<-- [end:account-refresh]

// --8<-- [start:network-refresh]
export async function refreshNetwork(previousChainId, api = kondorApi) {
  const provider = await api.getProvider();
  const chainId = await provider.getChainId();
  return { chainId, changed: chainId !== previousChainId };
}
// --8<-- [end:network-refresh]

// --8<-- [start:client]
export class KondorClient {
  constructor(api = kondorApi) {
    this.api = api;
    this.account = null;
    this.chainId = null;
  }

  async connect() {
    const { account, provider } = await setupKondorSigner(this.api);
    this.account = account;
    this.chainId = await provider.getChainId();
    return { account: this.account, chainId: this.chainId };
  }

  async signMessage(message) {
    return requestMessageSignature(message, this.api);
  }

  disconnect() {
    this.account = null;
    this.chainId = null;
  }
}
// --8<-- [end:client]
