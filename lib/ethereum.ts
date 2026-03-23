import { BrowserProvider, Contract, JsonRpcSigner } from "ethers";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  BASE_CHAIN_ID,
  BASE_CHAIN_ID_HEX,
  BASE_NETWORK_PARAMS,
} from "./contract";

export interface Proof {
  creator: string;
  title: string;
  description: string;
  link: string;
  timestamp: bigint;
}

// ─── Wallet ───────────────────────────────────────────────────────────────────

export function getEthereum(): typeof window.ethereum | null {
  if (typeof window === "undefined") return null;
  return (window as Window & { ethereum?: typeof window.ethereum }).ethereum ?? null;
}

export async function connectWallet(): Promise<string> {
  const eth = getEthereum();
  if (!eth) throw new Error("MetaMask not detected. Please install MetaMask.");

  const accounts = await eth.request({ method: "eth_requestAccounts" }) as string[];
  if (!accounts || accounts.length === 0) throw new Error("No accounts found.");

  await ensureBaseNetwork();
  return accounts[0];
}

export async function getConnectedAccount(): Promise<string | null> {
  const eth = getEthereum();
  if (!eth) return null;
  try {
    const accounts = await eth.request({ method: "eth_accounts" }) as string[];         	
    return accounts?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function ensureBaseNetwork(): Promise<void> {
  const eth = getEthereum();
  if (!eth) throw new Error("MetaMask not detected.");

  const chainIdHex = await eth.request({ method: "eth_chainId" }) as string;
  const chainId = parseInt(chainIdHex, 16);

  if (chainId === BASE_CHAIN_ID) return;

  try {
    await eth.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BASE_CHAIN_ID_HEX }],
    });
  } catch (switchError: unknown) {
    // Chain not added yet — add it
    if ((switchError as { code?: number }).code === 4902) {
      await eth.request({
        method: "wallet_addEthereumChain",
        params: [BASE_NETWORK_PARAMS],
      });
    } else {
      throw switchError;
    }
  }
}

// ─── Contract ─────────────────────────────────────────────────────────────────

async function getProvider(): Promise<BrowserProvider> {
  const eth = getEthereum();
  if (!eth) throw new Error("MetaMask not detected.");
  return new BrowserProvider(eth);
}

async function getSigner(): Promise<JsonRpcSigner> {
  const provider = await getProvider();
  return provider.getSigner();
}

function getReadContract(provider: BrowserProvider): Contract {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}

function getWriteContract(signer: JsonRpcSigner): Contract {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

// ─── Proof Operations ─────────────────────────────────────────────────────────

export async function fetchProofs(): Promise<Proof[]> {
  const provider = await getProvider();
  const contract = getReadContract(provider);
  const raw = await contract.getProofs();
  return raw.map((p: Proof) => ({
    creator: p.creator,
    title: p.title,
    description: p.description,
    link: p.link,
    timestamp: BigInt(p.timestamp),
  }));
}

export async function submitProof(
  title: string,
  description: string,
  link: string
): Promise<string> {
  await ensureBaseNetwork();
  const signer = await getSigner();
  const contract = getWriteContract(signer);
  const tx = await contract.submitProof(title, description, link);
  await tx.wait();
  return tx.hash;
}

// ─── Formatting Helpers ───────────────────────────────────────────────────────

export function shortenAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function formatTimestamp(ts: bigint): string {
  const ms = Number(ts) * 1000;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ms));
}
