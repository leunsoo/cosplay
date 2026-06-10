FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN mkdir -p public

ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_WS_URL
ARG NEXT_PUBLIC_KAKAO_MAP_APP_KEY
ARG NEXT_PUBLIC_CLARITY_PROJECT_ID

ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
ENV NEXT_PUBLIC_KAKAO_MAP_APP_KEY=${NEXT_PUBLIC_KAKAO_MAP_APP_KEY}
ENV NEXT_PUBLIC_CLARITY_PROJECT_ID=${NEXT_PUBLIC_CLARITY_PROJECT_ID}
ENV NODE_ENV=production

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S appgroup \
    && adduser -S -G appgroup -u 10001 appuser

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

RUN npm prune --omit=dev

USER appuser
EXPOSE 80
CMD ["npm", "run", "start", "--", "-p", "80", "-H", "0.0.0.0"]
