"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  connectWallet as connectWalletFn,
  getConnectedAccount,
  getEthereum,
  ensureBaseNetwork,
} from "./ethereum";
import { BASE_CHAIN_ID } from "./contract";

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  isWrongNetwork: boolean;
  connect: () => Promise<void>;
  switchNetwork: () => Promise<void>;
  error: string | null;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnecting: false,
  isWrongNetwork: false,
  connect: async () => {},
  switchNetwork: async () => {},
  error: null,
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkNetwork = useCallback(async () => {
    const eth = getEthereum();
    if (!eth) return;
    const chainIdHex: string = await eth.request({ method: "eth_chainId" });
    const chainId = parseInt(chainIdHex, 16);
    setIsWrongNetwork(chainId !== BASE_CHAIN_ID);
  }, []);

  // Auto-reconnect on load
  useEffect(() => {
    const eth = getEthereum();
    if (!eth) return;

    getConnectedAccount().then((acc) => {
      if (acc) {
        setAddress(acc);
        checkNetwork();
      }
    });

    const handleAccountsChanged = (accounts: string[]) => {
      setAddress(accounts[0] ?? null);
    };

    const handleChainChanged = () => {
      checkNetwork();
      window.location.reload();
    };

    eth.on?.("accountsChanged", handleAccountsChanged);
    eth.on?.("chainChanged", handleChainChanged);
    return () => {
      eth.removeListener?.("accountsChanged", handleAccountsChanged);
      eth.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [checkNetwork]);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const acc = await connectWalletFn();
      setAddress(acc);
      await checkNetwork();
    } catch (e: unknown) {
      setError((e as Error).message ?? "Connection failed.");
    } finally {
      setIsConnecting(false);
    }
  }, [checkNetwork]);

  const switchNetwork = useCallback(async () => {
    setError(null);
    try {
      await ensureBaseNetwork();
      setIsWrongNetwork(false);
    } catch (e: unknown) {
      setError((e as Error).message ?? "Network switch failed.");
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{ address, isConnecting, isWrongNetwork, connect, switchNetwork, error }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
