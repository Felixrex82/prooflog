// ─── Contract Configuration ───────────────────────────────────────────────────
// Replace CONTRACT_ADDRESS with your deployed contract address on Base

export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // TODO: replace

export const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "string", name: "link", type: "string" },
    ],
    name: "submitProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getProofs",
    outputs: [
      {
        components: [
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "string", name: "title", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "string", name: "link", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        internalType: "struct ProofLog.Proof[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const BASE_CHAIN_ID = 8453;
export const BASE_CHAIN_ID_HEX = "0x2105";

export const BASE_NETWORK_PARAMS = {
  chainId: BASE_CHAIN_ID_HEX,
  chainName: "Base",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://mainnet.base.org"],
  blockExplorerUrls: ["https://basescan.org"],
};
