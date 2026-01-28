# ---- Base ----
FROM node:18-alpine AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --no-audit --prefer-offline

# ---- Builder ----
FROM base AS builder
WORKDIR /app

# ⚠️ FAKE DATABASE_URL — только для генерации
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db"

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_READ_KEY

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_READ_KEY=$NEXT_PUBLIC_API_READ_KEY

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# ---- Runner ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma

EXPOSE 3000
CMD npm start