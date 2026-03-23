# ProofLog

**On-chain proof-of-work registry on Base.**

ProofLog is a minimal dApp where builders submit verifiable, permanent proof of what they've built — anchored to the Base blockchain.

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **ethers.js v6**
- **MetaMask** (wallet connection)
- **Base** (chainId: 8453)

---

## Project Structure

```
prooflog/
├── app/
│   ├── globals.css          # Global styles, design tokens, animations
│   ├── layout.tsx           # Root layout with WalletProvider + Navbar
│   ├── page.tsx             # Homepage — proof grid + search
│   └── submit/
│       └── page.tsx         # Submit proof page
├── components/
│   ├── Navbar.tsx           # Sticky nav with wallet connect
│   ├── ProofCard.tsx        # Individual proof card with hover effects
│   ├── SearchBar.tsx        # Real-time search input
│   ├── SubmitForm.tsx       # On-chain submission form
│   ├── SkeletonCard.tsx     # Loading skeleton for proof cards
│   ├── EmptyState.tsx       # Empty/no-results state
│   └── NetworkBanner.tsx    # Wrong network warning banner
├── lib/
│   ├── contract.ts          # ABI, contract address, chain config
│   ├── ethereum.ts          # Wallet helpers, proof fetch/submit
│   └── wallet-context.tsx   # React context for wallet state
├── types/
│   └── ethereum.d.ts        # window.ethereum type declarations
├── .env.example             # Environment variable template
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your deployed contract address:

```
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
```

### 3. Deploy the smart contract

Deploy this Solidity contract to Base mainnet (or Base Sepolia for testing):

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProofLog {
    struct Proof {
        address creator;
        string title;
        string description;
        string link;
        uint256 timestamp;
    }

    Proof[] private proofs;

    event ProofSubmitted(
        address indexed creator,
        string title,
        uint256 timestamp
    );

    function submitProof(
        string calldata title,
        string calldata description,
        string calldata link
    ) external {
        require(bytes(title).length > 0, "Title required");
        require(bytes(description).length > 0, "Description required");
        require(bytes(link).length > 0, "Link required");

        proofs.push(Proof({
            creator: msg.sender,
            title: title,
            description: description,
            link: link,
            timestamp: block.timestamp
        }));

        emit ProofSubmitted(msg.sender, title, block.timestamp);
    }

    function getProofs() external view returns (Proof[] memory) {
        return proofs;
    }
}
```

Copy the deployed address into `lib/contract.ts`:

```ts
export const CONTRACT_ADDRESS = "0xYourDeployedAddress";
```

### 4. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Usage

1. Open the app in your browser
2. Click **Connect Wallet** — MetaMask will prompt you
3. If not on Base, you'll see a banner — click **Switch to Base**
4. Browse submitted proofs on the homepage
5. Click **Submit** in the nav to submit your own proof
6. Fill in title, description, and link — click **Submit Proof**
7. Approve the MetaMask transaction
8. Your proof is now permanently on-chain ✓

---

## Deploying to Vercel

```bash
npm run build
vercel deploy
```

Set `NEXT_PUBLIC_CONTRACT_ADDRESS` in your Vercel project environment variables.

---

## Design

ProofLog uses a warm editorial aesthetic:

- **Fraunces** — display serif for headings (characterful, distinctive)
- **DM Sans** — clean body text
- **DM Mono** — monospace for addresses and hashes
- Warm off-white background (`#F7F5F2`) with burnt-orange accent (`#D4500A`)
- Subtle noise texture overlay for depth
- Staggered card animations on load
- Skeleton loading states
