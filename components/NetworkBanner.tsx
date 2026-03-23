"use client";

import { useWallet } from "@/lib/wallet-context";

export function NetworkBanner() {
  const { address, isWrongNetwork, switchNetwork } = useWallet();

  if (!address || !isWrongNetwork) return null;

  return (
    <div
      style={{
        background: "#FEF3F0",
        borderBottom: "1px solid rgba(212,80,10,0.2)",
        padding: "0.75rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.875rem",
          color: "var(--color-accent-dim)",
          fontWeight: 500,
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        Wrong network detected — ProofLog runs on Base (mainnet).
      </div>
      <button
        onClick={switchNetwork}
        style={{
          background: "var(--color-accent)",
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.4rem 1rem",
          fontSize: "0.8125rem",
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          transition: "background 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "var(--color-accent-light)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "var(--color-accent)")
        }
      >
        Switch to Base
      </button>
    </div>
  );
}
