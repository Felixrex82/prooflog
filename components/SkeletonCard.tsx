export function SkeletonCard() {
  return (
    <div
      style={{
        background: "var(--color-paper-card)",
        borderRadius: "1rem",
        border: "1.5px solid var(--color-paper-warm)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
      }}
    >
      {/* Title */}
      <div
        className="skeleton"
        style={{ height: "1.25rem", borderRadius: "0.375rem", width: "65%" }}
      />

      {/* Description lines */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div
          className="skeleton"
          style={{ height: "0.875rem", borderRadius: "0.25rem", width: "100%" }}
        />
        <div
          className="skeleton"
          style={{ height: "0.875rem", borderRadius: "0.25rem", width: "88%" }}
        />
        <div
          className="skeleton"
          style={{ height: "0.875rem", borderRadius: "0.25rem", width: "72%" }}
        />
      </div>

      {/* Link */}
      <div
        className="skeleton"
        style={{ height: "0.875rem", borderRadius: "0.25rem", width: "45%" }}
      />

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid var(--color-paper-warm)",
          paddingTop: "0.875rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            className="skeleton"
            style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0 }}
          />
          <div
            className="skeleton"
            style={{ height: "0.75rem", borderRadius: "0.25rem", width: "7rem" }}
          />
        </div>
        <div
          className="skeleton"
          style={{ height: "0.75rem", borderRadius: "0.25rem", width: "6rem" }}
        />
      </div>
    </div>
  );
}
