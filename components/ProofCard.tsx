"use client";

import { Proof, shortenAddress, formatTimestamp } from "@/lib/ethereum";
import { useState } from "react";

interface ProofCardProps {
  proof: Proof;
  index: number;
}

export function ProofCard({ proof, index }: ProofCardProps) {
  const [hovered, setHovered] = useState(false);

  const displayLink = proof.link
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .slice(0, 40);

  return (
    <article
      className="proof-card"
      style={{
        animationDelay: `${Math.min(index * 60, 400)}ms`,
        background: "var(--color-paper-card)",
        borderRadius: "1rem",
        border: "1.5px solid",
        borderColor: hovered ? "rgba(212,80,10,0.25)" : "var(--color-paper-warm)",
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
        padding: "1.5rem",
        transition: "border-color 0.2s ease, box-shadow 0.25s ease, transform 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.125rem",
          fontWeight: 600,
          color: "var(--color-ink)",
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
        }}
      >
        {proof.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--color-ink-soft)",
          lineHeight: 1.6,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flex: 1,
        }}
      >
        {proof.description}
      </p>

      {/* Link */}
      {proof.link && (
        <a
          href={proof.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.8125rem",
            color: "var(--color-accent)",
            textDecoration: "none",
            fontWeight: 500,
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "0.7")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "1")
          }
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          {displayLink}
        </a>
      )}

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid var(--color-paper-warm)",
          paddingTop: "0.875rem",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        {/* Creator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: `hsl(${parseInt(proof.creator.slice(2, 8), 16) % 360}, 55%, 60%)`,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-ink-muted)",
              letterSpacing: "0.02em",
            }}
          >
            {shortenAddress(proof.creator)}
          </span>
        </div>

        {/* Timestamp */}
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--color-ink-muted)",
          }}
        >
          {formatTimestamp(proof.timestamp)}
        </span>
      </div>
    </article>
  );
}
