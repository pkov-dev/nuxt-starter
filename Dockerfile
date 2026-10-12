ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /app
RUN corepack enable pnpm
RUN mkdir -p /app && chown node:node /app
ENV NITRO_HOST=0.0.0.0


FROM base AS dev
USER node
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY --chown=node:node . .
CMD ["pnpm", "check"]


FROM base AS build
USER node
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY --chown=node:node . .
RUN pnpm build


FROM base AS prod
COPY --from=build /app/.output ./.output
USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]