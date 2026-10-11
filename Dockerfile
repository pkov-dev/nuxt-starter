ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-slim AS base

WORKDIR /app

RUN corepack enable

ENV NITRO_HOST=0.0.0.0
ENV HUSKY=0


FROM base AS dev

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install

COPY . .

CMD ["pnpm", "dev"]



FROM base AS build

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build



FROM base AS prod

ENV NODE_ENV=production

COPY --from=build /app/.output ./.output

USER node

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]