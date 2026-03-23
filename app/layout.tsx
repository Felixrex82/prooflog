import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/lib/wallet-context";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ProofLog — On-Chain Proof of Work Registry",
  description:
    "Submit and discover on-chain proofs of work on the Base network. A public registry for builders.",
  openGraph: {
    title: "ProofLog",
    description: "On-chain proof of work registry on Base.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <footer
            style={{
              borderTop: "1px solid var(--color-paper-warm)",
              padding: "2rem 1.5rem",
              textAlign: "center",
              color: "var(--color-ink-muted)",
              fontSize: "0.8125rem",
              fontFamily: "var(--font-body)",
            }}
          >
            <span>
              ProofLog · Built on{" "}
              <a
                href="https://base.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-base-blue)", textDecoration: "none" }}
              >
                Base
              </a>
            </span>
          </footer>
        </WalletProvider>
      </body>
    </html>
  );
}
