FROM node:lts-alpine as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 

FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:lts-alpine as runner

ARG APP=/app

ENV APP_USER=runner
RUN addgroup -S $APP_USER \
    && adduser -S $APP_USER -G $APP_USER \
    && mkdir -p ${APP}

RUN chown -R $APP_USER:$APP_USER ${APP}

WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json