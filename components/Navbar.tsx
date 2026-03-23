"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@/lib/wallet-context";
import { shortenAddress } from "@/lib/ethereum";

export function Navbar() {
  const pathname = usePathname();
  const { address, isConnecting, connect } = useWallet();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(247, 245, 242, 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-paper-warm)",
      }}
    >
      <nav
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "3.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: "var(--color-accent)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1875rem",
              fontWeight: 700,
              color: "var(--color-ink)",
              letterSpacing: "-0.01em",
            }}
          >
            ProofLog
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {[
            { href: "/", label: "Home" },
            { href: "/submit", label: "Submit" },
          ].map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  textDecoration: "none",
                  padding: "0.4rem 0.875rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--color-ink)" : "var(--color-ink-soft)",
                  background: active ? "var(--color-paper-warm)" : "transparent",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!active)
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--color-paper-warm)";
                }}
                onMouseLeave={(e) => {
                  if (!active)
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Wallet */}
        <div>
          {address ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--color-paper-warm)",
                border: "1.5px solid var(--color-paper-warm)",
                borderRadius: "0.75rem",
                padding: "0.4rem 0.875rem",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  color: "var(--color-ink-soft)",
                  letterSpacing: "0.02em",
                }}
              >
                {shortenAddress(address)}
              </span>
            </div>
          ) : (
            <button
              onClick={connect}
              disabled={isConnecting}
              style={{
                background: isConnecting ? "var(--color-paper-warm)" : "var(--color-ink)",
                color: isConnecting ? "var(--color-ink-muted)" : "white",
                border: "none",
                borderRadius: "0.75rem",
                padding: "0.5rem 1.125rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: isConnecting ? "not-allowed" : "pointer",
                transition: "background 0.2s, transform 0.1s",
                fontFamily: "var(--font-body)",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
              onMouseEnter={(e) => {
                if (!isConnecting)
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {isConnecting ? (
                <>
                  <Spinner size={13} />
                  Connecting…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                  Connect Wallet
                </>
              )}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

function Spinner({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
