# Technical Context: SkillSwap

## Technology Stack

### Frontend
- Next.js 15
- TypeScript
- Shadcn UI
- GraphQL Code Generator
- React Query
- Tailwind CSS
- WebSocket client

### Backend
- NestJS
- Apollo Server
- GraphQL
- Prisma ORM
- PostgreSQL
- WebSocket server
- JWT authentication

### Development Tools
- npm
- TypeScript
- ESLint
- Prettier
- Jest
- Docker

## Development Setup

### Prerequisites
- Node.js (LTS)
- PostgreSQL
- npm
- Git

### Environment Variables
- Database connection
- JWT secrets
- API keys
- Service endpoints

### Development Workflow
1. Clone repository
2. Install dependencies
3. Set up environment
4. Start development servers
5. Run database migrations

## Technical Constraints
- HCMC location-based services
- Real-time messaging requirements
- User data privacy
- Scalability needs
- Mobile responsiveness

## Dependencies
- Location services API
- Image storage service
- Email service
- Social media APIs
- Payment gateway (future)

## Performance Requirements
- Fast page loads
- Real-time updates
- Efficient search
- Reliable messaging
- Secure data handling

## Development Scripts
- `npm run dev`: Run both frontend and backend concurrently
- `npm run dev:api`: Run backend only
- `npm run dev:web`: Run frontend only
- `npm run codegen`: Generate GraphQL types and operations 