# ---- Base ----
FROM node:18-alpine AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci --no-audit --prefer-offline

# ---- Builder ----
FROM base AS builder

ARG API_URL_SERVER
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_INTERNAL_API_TOKEN
ARG INTERNAL_API_TOKEN
ARG DATABASE_URL
ARG NEXT_PUBLIC_API_READ_KEY

ENV API_URL_SERVER=$API_URL_SERVER
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_INTERNAL_API_TOKEN=$NEXT_PUBLIC_INTERNAL_API_TOKEN
ENV INTERNAL_API_TOKEN=$INTERNAL_API_TOKEN
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_API_READ_KEY=$NEXT_PUBLIC_API_READ_KEY

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

RUN echo "===== BUILD ENV =====" \
 && printenv | sort \
 && echo "====================="

RUN npm run build

# ---- Runner ----
FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Копируем node_modules. Теперь они не включают Prisma Client,
# что правильно, так как он будет сгенерирован ниже.
COPY --from=deps /app/node_modules ./node_modules

# Копируем Prisma схему (Обязательно для генерации!)
COPY prisma ./prisma

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000
ENV NODE_ENV=production

# 👇 КЛЮЧЕВАЯ ИСПРАВЛЕННАЯ ЧАСТЬ
# Генерируем Prisma Client ПЕРЕД запуском приложения.
CMD npx prisma generate && npm start