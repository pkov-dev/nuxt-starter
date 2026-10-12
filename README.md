# Nuxt Starter

Nuxt 4 + Vue 3 + TypeScript starter.

## Stack

- Nuxt 4
- Vue 3
- TypeScript
- pnpm
- Node.js 24
- PostgreSQL 18
- Docker Compose
- ESLint
- Husky

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
pnpm check        # lint + typecheck
```

---

## Environment

Environment variables are validated with Zod.

Required variables must exist in `.env` before running the application.
