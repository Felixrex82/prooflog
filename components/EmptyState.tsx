import Link from "next/link";

interface EmptyStateProps {
  query?: string;
}

export function EmptyState({ query }: EmptyStateProps) {
  const isSearch = Boolean(query?.trim());

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1.5rem",
        textAlign: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          background: "var(--color-paper-warm)",
          borderRadius: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "0.5rem",
        }}
      >
        {isSearch ? (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        )}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.375rem",
          fontWeight: 600,
          color: "var(--color-ink)",
          letterSpacing: "-0.01em",
        }}
      >
        {isSearch ? `No results for "${query}"` : "No proofs yet"}
      </h3>

      <p
        style={{
          fontSize: "0.9375rem",
          color: "var(--color-ink-muted)",
          maxWidth: "26rem",
          lineHeight: 1.6,
        }}
      >
        {isSearch
          ? "Try different keywords or clear your search to see all proofs."
          : "Be the first builder to submit proof of your work on Base."}
      </p>

      {!isSearch && (
        <Link
          href="/submit"
          style={{
            marginTop: "0.5rem",
            background: "var(--color-accent)",
            color: "white",
            borderRadius: "0.75rem",
            padding: "0.7rem 1.5rem",
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--color-accent-light)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--color-accent)")
          }
        >
          Submit the first proof →
        </Link>
      )}
    </div>
  );
}
