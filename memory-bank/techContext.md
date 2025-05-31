# Technical Context: SkillSwap

## Technology Stack

### Frontend
- Next.js 15.3.3
- React 19.0.0
- TypeScript
- Shadcn UI
- GraphQL Code Generator
- Apollo Client 3.13.8
- Tailwind CSS 4
- WebSocket client
- WalletKit for Sui integration
- Sui SDK

### Backend
- NestJS
- Apollo Server
- GraphQL
- Prisma ORM
- PostgreSQL
- WebSocket server
- Sui blockchain integration
- NFT minting service

### Smart Contracts
- Move language
- Sui blockchain
- NFT contract for SkillBadges
- Deal verification contract

### Development Tools
- npm
- TypeScript
- ESLint
- Prettier
- Jest
- Docker
- GitHub Actions
- Sui CLI
- Move Analyzer

### Deployment
- Docker-based deployment
- GitHub Actions CI/CD pipeline
- VPS hosting
- Automated database migrations
- Docker Compose for orchestration
- Sui testnet/mainnet deployment

## Development Setup

### Prerequisites
- Node.js (LTS)
- PostgreSQL
- npm
- Git
- Sui CLI
- Move Analyzer

### Environment Variables
- Database connection
- Sui network configuration
- NFT contract address
- API keys
- Service endpoints
- Wallet configuration

### Development Workflow
1. Clone repository
2. Install dependencies
3. Set up environment
4. Deploy smart contracts
5. Start development servers
6. Run database migrations

## Technical Constraints
- HCMC location-based services
- Real-time messaging requirements
- User data privacy
- Scalability needs
- Mobile responsiveness
- Blockchain transaction costs
- Wallet compatibility
- NFT minting reliability

## Dependencies
- Location services API
- Image storage service
- Email service
- Social media APIs
- Sui blockchain network
- NFT marketplace integration
- Wallet providers

## Performance Requirements
- Fast page loads
- Real-time updates
- Efficient search
- Reliable messaging
- Secure data handling
- Quick wallet connections
- Fast NFT minting
- Low transaction latency

## Development Scripts
- `npm run dev`: Run both frontend and backend concurrently
- `npm run dev:api`: Run backend only
- `npm run dev:web`: Run frontend only
- `npm run codegen`: Generate GraphQL types and operations