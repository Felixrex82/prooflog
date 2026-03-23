"use client";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ position: "relative" }}>
      {/* Search icon */}
      <div
        style={{
          position: "absolute",
          left: "0.875rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--color-ink-muted)",
          pointerEvents: "none",
          display: "flex",
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      <input
        type="text"
        placeholder="Search proofs…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-base"
        style={{
          paddingLeft: "2.5rem",
          paddingRight: value ? "2.5rem" : "1rem",
          width: "260px",
        }}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "var(--color-ink-muted)",
            cursor: "pointer",
            display: "flex",
            padding: "0",
            transition: "color 0.15s",
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
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
