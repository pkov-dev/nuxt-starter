# Overview

Reusable Nuxt starter for production projects: e-commerce, SaaS, booking systems, dashboards, internal tools,
client projects. Stack and setup: [README](../README.md).

## Principles

- Production-first, KISS, explicit over magic.
- Minimal dependencies.
- No premature abstraction: extend the existing architecture before adding a new pattern.
- No new top-level folders or duplicate components without a reason.

## Top-level structure

```text
app/          client: pages, layouts, UI kit, app shell, composables, stores, validation texts
server/       server infrastructure: db client and migrations, plugins, utils
shared/       code for both client and server: API error codes
layers/       one folder per business area, e.g. auth
config/       env schema and validation, used by nuxt.config and server
tools/        build scripts, e.g. icon collection
public/       static files
docs/         documentation
```

## Core and layers

The root folders are the **core**: UI kit, app shell, validation, db connection, server helpers.
Each business area is a **layer** in `layers/<name>/` with its own pages, components, API routes, tables and schemas.
The core never imports a layer. Details: [decisions/layers.md](decisions/layers.md).

## Client, server, shared

| Folder    | Runs on | May import                     |
| --------- | ------- | ------------------------------ |
| `app/`    | client  | `shared/`                      |
| `server/` | server  | `shared/`, `config/`           |
| `shared/` | both    | nothing from the other folders |

ESLint enforces these boundaries. Where a function lives: [CONTRIBUTING.md](../CONTRIBUTING.md#where-code-lives).

## Security

- `nuxt-security`: security headers and CSRF protection.
- Input is validated with Zod on the server, the client never decides.
- Server secrets live in `config/env.ts` and never reach the client.
- Auth is isolated in `layers/auth/`: business code does not depend on the auth provider.
  Authorization is checked on the server. Details: [layers/auth.md](layers/auth.md).
