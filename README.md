# SkillSwap

A Web3 peer-to-peer skill and item exchange platform built for people in Ho Chi Minh City (HCMC). Connect with others to trade skills, items, or request help within your local community, powered by the Sui blockchain.

## Features

- 🎯 **Skill Exchange**: Offer your skills or request help from others
- 🏷️ **Item Trading**: List items for trade or find what you need
- 📍 **Location-Based**: Connect with people in HCMC
- ⭐ **NFT SkillBadges**: Earn verifiable skill badges as NFTs
- 🔒 **Web3 Security**: Secure wallet-based authentication
- 🌐 **Decentralized**: Built on Sui blockchain
- 📱 **Wallet Integration**: Connect with Sui wallet

## Tech Stack

### Frontend
- Next.js 15.3.3
- React 19.0.0
- TypeScript
- Shadcn UI
- GraphQL Code Generator
- Apollo Client 3.13.8
- Tailwind CSS 4
- WalletKit for Sui
- Sui SDK

### Backend
- NestJS
- Apollo Server
- GraphQL
- Prisma ORM
- PostgreSQL
- WebSocket
- Sui blockchain integration
- NFT minting service

### Smart Contracts
- Move language (2024.beta)
- Sui blockchain
- NFT contract for SkillBadges
- Deal verification contract

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- PostgreSQL
- npm
- Sui CLI
- Move Analyzer
- Move Prover

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/skillswap.git
cd skillswap
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy example environment files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

4. Deploy smart contracts:
```bash
# Deploy contracts to Sui testnet
npm run deploy:contracts
```

5. Start the development servers:
```bash
# Run both frontend and backend
npm run dev

# Run frontend only
npm run dev:web

# Run backend only
npm run dev:api
```

## Project Structure

```
skillswap/
├── apps/
│   ├── web/          # Next.js frontend
│   │   ├── src/
│   │   └── codegen.ts # GraphQL Code Generator config
│   ├── api/          # NestJS backend
│   │   ├── src/
│   │   │   ├── users/           # User module
│   │   │   ├── skills/          # Skills module
│   │   │   ├── items/           # Items module
│   │   │   ├── messages/        # Messaging module
│   │   │   ├── blockchain/      # Blockchain integration
│   │   │   ├── nft/            # NFT service
│   │   │   └── app.module.ts    # Root module
│   └── contracts/    # Move smart contracts
│       ├── sources/  # Contract source files
│       │   ├── skillswap.move   # Main contract module
│       │   ├── nft.move        # NFT implementation
│       │   └── deal.move       # Deal verification
│       ├── tests/    # Contract tests
│       │   ├── nft_tests.move  # NFT contract tests
│       │   └── deal_tests.move # Deal contract tests
│       └── Move.toml # Contract configuration
├── package.json      # Root package configuration
└── memory-bank/      # Project documentation for Cursor
```

## Development Workflow

### Available Scripts

- `npm run dev`: Run both frontend and backend concurrently
- `npm run dev:api`: Run backend only
- `npm run dev:web`: Run frontend only
- `npm run codegen`: Generate GraphQL types and operations

### Database Management

The project uses Prisma for database operations. To manage your database:

1. Update your Prisma schema in `apps/api/prisma/schema.prisma`
2. Generate Prisma client:
```bash
npm run prisma:generate
```
3. Create and apply migrations:
```bash
npm run prisma:migrate
```

### Smart Contract Development

1. Write and test contracts in `apps/contracts/sources/`
2. Run contract tests:
```bash
npm run test:contracts
```
3. Deploy to Sui network:
```bash
npm run deploy:contracts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Prisma](https://www.prisma.io/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Sui Blockchain](https://sui.io/)
- [Move Language](https://move-language.github.io/move/)
- [WalletKit](https://github.com/MystenLabs/sui/tree/main/sdk/wallet-kit)
