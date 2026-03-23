"use client";

import { SubmitForm } from "@/components/SubmitForm";
import { NetworkBanner } from "@/components/NetworkBanner";
import Link from "next/link";

export default function SubmitPage() {
  return (
    <>
      <NetworkBanner />
      <div
        style={{
          maxWidth: "42rem",
          margin: "0 auto",
          padding: "4rem 1.5rem 5rem",
        }}
      >
        {/* Back nav */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.875rem",
            color: "var(--color-ink-muted)",
            textDecoration: "none",
            marginBottom: "2.5rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--color-accent)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--color-ink-muted)")
          }
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to registry
        </Link>

        {/* Heading */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-paper-warm)",
              border: "1px solid rgba(212,80,10,0.2)",
              borderRadius: "100px",
              padding: "0.25rem 0.875rem",
              marginBottom: "1.25rem",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--color-accent)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            On-chain submission
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "var(--color-ink)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            Submit your proof
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-ink-soft)",
              lineHeight: 1.65,
            }}
          >
            Every submission is stored permanently on Base. Make sure your
            wallet is connected before submitting.
          </p>
        </div>

        <SubmitForm />
      </div>
    </>
  );
}
