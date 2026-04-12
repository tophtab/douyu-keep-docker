FROM node:18-slim AS builder

WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package.json package-lock.json tsconfig.docker.json ./
RUN npm ci --ignore-scripts

COPY src ./src
RUN npm run build:docker

FROM node:18-slim AS runtime

WORKDIR /app

# Install chromium for puppeteer
RUN apt-get update && apt-get install -y chromium --no-install-recommends && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV TZ=Asia/Shanghai
ENV WEB_PORT=51417

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/build/docker ./dist/

RUN mkdir -p /app/config

EXPOSE 51417

CMD ["node", "dist/docker/index.js"]
