FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 6006

CMD ["pnpm", "storybook", "--", "--no-open", "--port", "6006", "--host", "0.0.0.0"]
