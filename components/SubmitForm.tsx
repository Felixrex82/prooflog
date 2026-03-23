"use client";

import { useState, FormEvent } from "react";
import { submitProof } from "@/lib/ethereum";
import { useWallet } from "@/lib/wallet-context";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "error";

export function SubmitForm() {
  const { address, connect, isConnecting } = useWallet();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!address) return;

    setStatus("loading");
    setErrorMsg(null);
    setTxHash(null);

    try {
      const hash = await submitProof(title.trim(), description.trim(), link.trim());
      setTxHash(hash);
      setStatus("success");
      setTitle("");
      setDescription("");
      setLink("");
    } catch (err: unknown) {
      console.error(err);
      const message = (err as { reason?: string; message?: string }).reason
        ?? (err as Error).message
        ?? "Transaction failed.";
      setErrorMsg(message.slice(0, 200));
      setStatus("error");
    }
  }

  // Not connected state
  if (!address) {
    return (
      <div
        style={{
          background: "var(--color-paper-card)",
          border: "1.5px dashed var(--color-paper-warm)",
          borderRadius: "1rem",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            background: "var(--color-paper-warm)",
            borderRadius: "0.875rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--color-ink)",
            marginBottom: "0.5rem",
          }}
        >
          Connect your wallet
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--color-ink-muted)",
            marginBottom: "1.75rem",
            lineHeight: 1.6,
          }}
        >
          You need to connect MetaMask on Base network to submit a proof.
        </p>
        <button
          onClick={connect}
          disabled={isConnecting}
          style={{
            background: "var(--color-accent)",
            color: "white",
            border: "none",
            borderRadius: "0.75rem",
            padding: "0.75rem 1.75rem",
            fontSize: "0.9375rem",
            fontWeight: 600,
            cursor: isConnecting ? "not-allowed" : "pointer",
            fontFamily: "var(--font-body)",
            transition: "background 0.2s",
            opacity: isConnecting ? 0.7 : 1,
          }}
        >
          {isConnecting ? "Connecting…" : "Connect MetaMask"}
        </button>
      </div>
    );
  }

  // Success state
  if (status === "success") {
    return (
      <div
        style={{
          background: "var(--color-paper-card)",
          border: "1.5px solid rgba(34,197,94,0.3)",
          borderRadius: "1rem",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            background: "rgba(34,197,94,0.1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.375rem",
            fontWeight: 600,
            color: "var(--color-ink)",
            marginBottom: "0.5rem",
          }}
        >
          Proof submitted!
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--color-ink-muted)",
            marginBottom: "1.5rem",
            lineHeight: 1.6,
          }}
        >
          Your proof is now permanently recorded on Base.
        </p>
        {txHash && (
          <a
            href={`https://basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.8125rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-base-blue)",
              textDecoration: "none",
              marginBottom: "2rem",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            {txHash.slice(0, 14)}…{txHash.slice(-8)}
          </a>
        )}
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setStatus("idle")}
            style={{
              background: "var(--color-paper-warm)",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.65rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              color: "var(--color-ink-soft)",
              fontFamily: "var(--font-body)",
            }}
          >
            Submit another
          </button>
          <Link
            href="/"
            style={{
              background: "var(--color-ink)",
              borderRadius: "0.75rem",
              padding: "0.65rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "white",
              textDecoration: "none",
            }}
          >
            View all proofs
          </Link>
        </div>
      </div>
    );
  }

  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "var(--color-paper-card)",
        border: "1.5px solid var(--color-paper-warm)",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* Error banner */}
      {status === "error" && errorMsg && (
        <div
          style={{
            background: "#FEF3F0",
            border: "1px solid rgba(212,80,10,0.25)",
            borderRadius: "0.75rem",
            padding: "0.875rem 1rem",
            fontSize: "0.875rem",
            color: "var(--color-accent-dim)",
            lineHeight: 1.55,
          }}
        >
          <strong>Error:</strong> {errorMsg}
        </div>
      )}

      {/* Title */}
      <Field label="Title" required>
        <input
          className="input-base"
          type="text"
          placeholder="What did you build?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={100}
          disabled={isLoading}
        />
      </Field>

      {/* Description */}
      <Field label="Description" required hint={`${description.length}/500`}>
        <textarea
          className="input-base"
          placeholder="Describe what you built, what problem it solves, and why it matters…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          maxLength={500}
          rows={5}
          disabled={isLoading}
          style={{ resize: "vertical", minHeight: "8rem" }}
        />
      </Field>

      {/* Link */}
      <Field label="Link" required hint="GitHub, live demo, article, etc.">
        <input
          className="input-base"
          type="url"
          placeholder="https://"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          disabled={isLoading}
        />
      </Field>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        style={{
          background: isLoading ? "var(--color-paper-warm)" : "var(--color-accent)",
          color: isLoading ? "var(--color-ink-muted)" : "white",
          border: "none",
          borderRadius: "0.875rem",
          padding: "0.875rem 1.5rem",
          fontSize: "0.9375rem",
          fontWeight: 600,
          cursor: isLoading ? "not-allowed" : "pointer",
          fontFamily: "var(--font-body)",
          transition: "background 0.2s, transform 0.1s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
        onMouseEnter={(e) => {
          if (!isLoading)
            (e.currentTarget as HTMLElement).style.background = "var(--color-accent-light)";
        }}
        onMouseLeave={(e) => {
          if (!isLoading)
            (e.currentTarget as HTMLElement).style.background = "var(--color-accent)";
        }}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            Submitting on-chain…
          </>
        ) : (
          "Submit Proof →"
        )}
      </button>

      <p
        style={{
          fontSize: "0.8rem",
          color: "var(--color-ink-muted)",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        This will trigger a MetaMask transaction on Base. Gas fees apply.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <label
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--color-ink)",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "var(--color-accent)", marginLeft: "0.2rem" }}>*</span>
          )}
        </label>
        {hint && (
          <span style={{ fontSize: "0.775rem", color: "var(--color-ink-muted)" }}>
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ animation: "spin 0.7s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
