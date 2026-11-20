# Layers

The project is a **core** plus **layers**. A layer is one business area (auth, catalog, cart) with everything
it needs: pages, components, API routes, tables, schemas. Nuxt registers every folder in `layers/` automatically.

Removing a feature from a new project = deleting its layer and the things listed in its page in `docs/layers/`.

## Core vs layer

| Core (root)                                 | Layer (`layers/<name>/`)                                          |
| ------------------------------------------- | ----------------------------------------------------------------- |
| UI kit (`ui/`), app shell (`app/`), layouts | components of the feature: `components/<name>/`                   |
| styles, form validation, error texts        | pages, composables, utils of the feature                          |
| db connection, migrations, server helpers   | API routes, services, repositories                                |
| `config/`, `shared/types/api-errors.ts`     | tables and Zod schemas: `shared/*.table.ts`, `shared/*.schema.ts` |

## Structure of a layer

```text
layers/catalog/
├── nuxt.config.ts                 modules and config of the feature
├── app/
│   ├── app.config.ts              e.g. a navigation item
│   ├── components/catalog/        → <CatalogProductCard>
│   ├── composables/
│   ├── pages/catalog/
│   └── utils/
├── shared/
│   ├── product.table.ts           pgTable
│   └── product.schema.ts          drizzle-zod + rules
└── server/
    ├── api/products/              routes, as usual
    ├── product.service.ts         business rules
    └── product.repository.ts      queries
```

Nuxt rules work inside a layer: auto-imports, component names by path, `pages/`, `server/api/`.
Everything auto-imported is global, so put components into `components/<name>/` to avoid name clashes.

Add a service and a repository only when a route stops fitting on one screen. They are not in `server/utils`,
so they are imported explicitly and do not leak into the whole app.

## Dependencies

- A layer may import the core: `~/…`, `~~/server/…`, `#shared/…`.
- Inside a layer use `#layers/<name>/…` or relative paths.
- The core never imports a layer. ESLint enforces this.
- One layer may use another in one direction only (`cart` → `catalog`, never back).

The core reaches layers only through Nuxt merging, never through imports:

| Need                      | How                                                      |
| ------------------------- | -------------------------------------------------------- |
| a header link             | `navigation` in the layer `app.config.ts` (arrays merge) |
| tables for migrations     | `drizzle.config.ts` reads `layers/*/shared/*.table.ts`   |
| routes, pages, components | Nuxt scans every layer                                   |

## Known trade-offs

- **Error codes and texts are central** (`shared/types/api-errors.ts`, `app/utils/validation/messages.ts`).
  Deleting a layer leaves its codes there: harmless, remove when convenient. With i18n they move to per-layer locale files.
- **Env is central** (`config/env.ts`). A layer's variables are listed in `docs/layers/<name>.md`.
- **Dependencies are central** (`package.json`). A layer's packages are listed in `docs/layers/<name>.md`.
- **Migrations are central** (`server/db/migrations/`). A new project regenerates them anyway.
