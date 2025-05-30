# Stage 1: Dependencies
FROM node:18-slim AS deps
WORKDIR /app

# Install dependencies using npm
COPY package.json package-lock.json* ./
RUN npm ci --f

# Stage 2: Builder
FROM node:18-slim AS builder
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=https://api.skillswap.uydev.id.vn
ENV NEXT_PUBLIC_IO_URL=https://api.skillswap.uydev.id.vn

# Rebuild native dependencies
RUN npm rebuild

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:18-slim AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=https://api.skillswap.uydev.id.vn
ENV NEXT_PUBLIC_IO_URL=api.skillswap.uydev.id.vn

RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]