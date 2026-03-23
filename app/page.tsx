"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchProofs, type Proof } from "@/lib/ethereum";
import { ProofCard } from "@/components/ProofCard";
import { SearchBar } from "@/components/SearchBar";
import { SkeletonCard } from "@/components/SkeletonCard";
import { EmptyState } from "@/components/EmptyState";
import { NetworkBanner } from "@/components/NetworkBanner";
import Link from "next/link";

export default function HomePage() {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadProofs();
  }, []);

  async function loadProofs() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProofs();
      // Most recent first
      setProofs([...data].reverse());
    } catch (e: unknown) {
      setError("Failed to load proofs. Make sure you're on Base network.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    if (!query.trim()) return proofs;
    const q = query.toLowerCase();
    return proofs.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [proofs, query]);

  return (
    <>
      <NetworkBanner />

      {/* Hero */}
      <section
        style={{
          padding: "5rem 1.5rem 3rem",
          maxWidth: "72rem",
          margin: "0 auto",
        }}
      >
        <div style={{ maxWidth: "36rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-paper-warm)",
              border: "1px solid rgba(212,80,10,0.2)",
              borderRadius: "100px",
              padding: "0.25rem 0.875rem",
              marginBottom: "1.5rem",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--color-accent)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--color-accent)",
                display: "inline-block",
                animation: "pulse 2s infinite",
              }}
            />
            Live on Base
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--color-ink)",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Proof of what
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
              you've built
            </em>
            .
          </h1>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--color-ink-soft)",
              lineHeight: 1.65,
              marginBottom: "2rem",
            }}
          >
            ProofLog is an on-chain registry where builders submit verifiable
            proof of their work. Every entry is permanent, public, and anchored
            to the Base blockchain.
          </p>
          <Link
            href="/submit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-accent)",
              color: "white",
              borderRadius: "0.75rem",
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
              fontSize: "0.9375rem",
              textDecoration: "none",
              transition: "background 0.2s ease, transform 0.1s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "var(--color-accent-light)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "var(--color-accent)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Submit your proof →
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto 2.5rem",
          padding: "0 1.5rem",
        }}
      >
        <hr style={{ border: "none", borderTop: "1px solid var(--color-paper-warm)" }} />
      </div>

      {/* Proofs Section */}
      <section
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem 5rem",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "var(--color-ink)",
                letterSpacing: "-0.01em",
              }}
            >
              All Proofs
            </h2>
            {!loading && (
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-ink-muted)",
                  marginTop: "0.2rem",
                }}
              >
                {proofs.length} submission{proofs.length !== 1 ? "s" : ""} on-chain
              </p>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <SearchBar value={query} onChange={setQuery} />
            <button
              onClick={loadProofs}
              title="Refresh"
              style={{
                border: "1.5px solid var(--color-paper-warm)",
                background: "var(--color-paper-card)",
                borderRadius: "0.75rem",
                padding: "0.65rem",
                cursor: "pointer",
                color: "var(--color-ink-muted)",
                transition: "border-color 0.2s, color 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--color-paper-warm)";
                (e.currentTarget as HTMLElement).style.color = "var(--color-ink-muted)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div
            style={{
              background: "#FEF3F0",
              border: "1px solid rgba(212,80,10,0.25)",
              borderRadius: "0.75rem",
              padding: "1rem 1.25rem",
              color: "var(--color-accent-dim)",
              fontSize: "0.9rem",
              marginBottom: "2rem",
            }}
          >
            ⚠ {error}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filtered.map((proof, i) => (
              <ProofCard key={i} proof={proof} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
