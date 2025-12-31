# FlowPay

**Automated Crypto Payments Powered by MetaMask Advanced Permissions (ERC-7715)**

FlowPay enables users to set up recurring payments, subscriptions, and salary streaming with a single approval. Built for the [MetaMask Advanced Permissions Dev Cook-Off Hackathon](https://www.hackquest.io/hackathons/MetaMask-Advanced-Permissions-Dev-Cook-Off).

## Features

- **Recurring Payments**: Set up periodic payments (hourly, daily, weekly, monthly)
- **Salary Streaming**: Stream funds per second to employees
- **DCA Investment**: Automate dollar-cost averaging for crypto purchases
- **Subscription Management**: Pay for services automatically in crypto
- **Secure Permissions**: Fine-grained control with ERC-7715, revoke anytime
- **Spending Limits**: Set maximum amounts per period

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Web3**: MetaMask Smart Accounts Kit, Viem, Wagmi
- **State**: Zustand with persistence
- **Indexing**: Envio HyperIndex (optional)
- **Network**: Sepolia Testnet (EIP-7702 compatible)

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MetaMask Flask](https://metamask.io/flask/) v13.5.0+ (required for ERC-7715)
- Sepolia testnet ETH for gas

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/flowpay.git
cd flowpay
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
- `NEXT_PUBLIC_PIMLICO_API_KEY`: Get from [Pimlico Dashboard](https://dashboard.pimlico.io/)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Connect MetaMask Flask

1. Install [MetaMask Flask](https://metamask.io/flask/)
2. Switch to Sepolia testnet
3. Get testnet ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
4. Get testnet USDC from [Circle Faucet](https://faucet.circle.com/)

## Project Structure

```
flowpay/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Landing page
│   │   ├── dashboard/       # User dashboard
│   │   └── create/          # Create payment flow
│   ├── components/          # React components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── stores/              # Zustand stores
│   ├── types/               # TypeScript types
│   └── config/              # Configuration
├── envio/                   # Envio HyperIndex indexer
│   ├── config.yaml          # Indexer configuration
│   ├── schema.graphql       # GraphQL schema
│   └── src/                 # Event handlers
└── public/                  # Static assets
```

## How It Works

1. **Connect Wallet**: User connects MetaMask Flask
2. **Create Payment**: User configures payment details (amount, frequency, recipient)
3. **Grant Permission**: User approves ERC-7715 permission via MetaMask
4. **Automatic Execution**: Session account executes payments without further approval
5. **Revoke Anytime**: User can revoke permissions from MetaMask

## ERC-7715 Permission Types

### Periodic Payments
Fixed amount transferred at regular intervals:
```typescript
{
  type: 'erc20-token-periodic',
  data: {
    tokenAddress: USDC_ADDRESS,
    periodAmount: parseUnits('10', 6), // 10 USDC
    periodDuration: 86400, // Daily
  }
}
```

### Streaming Payments
Continuous flow of funds per second:
```typescript
{
  type: 'erc20-token-stream',
  data: {
    tokenAddress: USDC_ADDRESS,
    amountPerSecond: parseUnits('0.0001', 6),
    maxAmount: parseUnits('1000', 6),
  }
}
```

## Envio Integration (Bonus Track)

FlowPay includes an Envio HyperIndex configuration for indexing on-chain events:

```bash
cd envio
npm install -g envio
envio codegen
envio dev
```

This provides:
- Historical permission data
- Payment execution history
- Analytics dashboard data
- GraphQL API for querying

## Hackathon Tracks

- **Most Creative Use of Advanced Permissions**: Our primary target
- **Best Use of Envio**: Bonus track with indexer integration

## Resources

- [MetaMask Smart Accounts Kit Docs](https://docs.metamask.io/smart-accounts-kit/)
- [ERC-7715 Specification](https://docs.metamask.io/smart-accounts-kit/concepts/erc7715/)
- [MetaMask ERC-7715 Template](https://github.com/MetaMask/templated-gator-7715)
- [Envio HyperIndex Docs](https://docs.envio.dev/docs/HyperIndex/overview)

## License

MIT

---

Built with love for the MetaMask Advanced Permissions Dev Cook-Off Hackathon 2025
