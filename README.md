# SkillSwap

A community-driven platform for skill and item exchange in Ho Chi Minh City (HCMC). Connect with others to trade skills, items, or request help within your local community.

## Features

- 🎯 **Skill Exchange**: Offer your skills or request help from others
- 🏷️ **Item Trading**: List items for trade or find what you need
- 📍 **Location-Based**: Connect with people in HCMC
- 💬 **Real-time Messaging**: Communicate securely with other users
- ⭐ **Reputation System**: Build trust through reviews and ratings
- 🔒 **Safe & Secure**: Verified users and secure exchanges

## Tech Stack

### Frontend
- Next.js 15
- Shadcn UI
- TypeScript
- React Query
- GraphQL Code Generator
- Tailwind CSS

### Backend
- NestJS
- Apollo Server
- GraphQL
- Prisma ORM
- PostgreSQL
- WebSocket

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- PostgreSQL
- npm

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

4. Start the development servers:
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
│   └── api/          # NestJS backend
│       ├── src/
│       │   ├── users/           # User module
│       │   ├── skills/          # Skills module
│       │   ├── items/           # Items module
│       │   ├── messages/        # Messaging module
│       │   └── app.module.ts    # Root module
├── package.json      # Root package configuration
└── memory-bank/      # Project documentation
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
