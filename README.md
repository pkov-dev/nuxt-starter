# Nuxt Starter

Nuxt 4 + Vue 3 + TypeScript starter.

Architecture and decisions: [docs/](docs/README.md). Rules for contributors: [CONTRIBUTING.md](CONTRIBUTING.md).

## Stack

- Nuxt 4, Vue 3, TypeScript, pnpm, Node.js 24
- SCSS, Tailwind CSS (utilities only), Pinia, Nuxt Icon, Nuxt Fonts, Nuxt Image
- Zod 4, vee-validate
- PostgreSQL 18, Drizzle ORM
- Better Auth
- nuxt-security
- Docker Compose
- ESLint, Stylelint, Husky

---

## New project from this template

```bash
gh repo create <name> --template pkov-dev/nuxt-starter --private --clone
cd <name>
```

Creates a GitHub repository from this template and clones it. Then follow [Installation](#installation).

---

## Installation

Requirements:

- Node.js `>=24 <25`
- pnpm `11.20.0`
- Docker

Install:

```bash
pnpm install
```

Create environment:

```bash
cp .env.example .env
```

---

## Development

Start:

```bash
pnpm dev
```

Runs Nuxt dev server with Docker services.

---

## Production

Build and start:

```bash
docker compose -f compose.prod.yml up --build -d
```

Start existing build:

```bash
docker compose -f compose.prod.yml up -d
```

Stop:

```bash
docker compose -f compose.prod.yml down
```

Remove volumes:

```bash
docker compose -f compose.prod.yml down -v
```

---

## Commands

```bash
pnpm build        # production build
pnpm preview      # preview production build
pnpm typecheck    # TypeScript check
pnpm lint         # ESLint
pnpm stylelint    # Stylelint
pnpm docs:check   # links, paths and doc index in docs are valid
pnpm check        # lint + stylelint + typecheck + docs:check
pnpm db:generate  # generate migrations
pnpm db:migrate   # apply migrations
pnpm db:studio    # Drizzle Studio
```

---

## Environment

Environment variables are validated with Zod in `config/env.ts`.

- Every variable has a typed schema.
- Validation is strict at runtime; at build time (`APP_BUILD=true`) required runtime variables are skipped.
- Required variables must exist in `.env` before running the application.
- Server secrets never reach the client.
- Variables of a layer are listed in its page in [docs/layers/](docs/layers/).
