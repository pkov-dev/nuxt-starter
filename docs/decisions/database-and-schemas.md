# Database and schemas

## Where things live

| Path                               | What                                      | Runs on |
| ---------------------------------- | ----------------------------------------- | ------- |
| `layers/<name>/shared/*.table.ts`  | tables (`pgTable`), no connection         | both    |
| `layers/<name>/shared/*.schema.ts` | Zod schemas: drizzle-zod + business rules | both    |
| `server/db/`                       | connection, migrations                    | server  |
| `app/utils/validation/`            | error texts                               | client  |

A table and its schemas sit next to each other in the layer that owns them. See [layers.md](layers.md).

Inside `*.table.ts` use relative imports only: drizzle-kit does not resolve Nuxt aliases.

The db client has no `schema`, so the core does not import layers. Use `db.select().from(table)`.
The relational API (`db.query.*`) needs the schema: add it when a layer really needs it.

## Columns

| Choice                                | Why                                                                               |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| `uuid().primaryKey().defaultRandom()` | ids are not guessable and can be created outside the database                     |
| `text()`, not `varchar(n)`            | same speed in PostgreSQL; a length limit is a business rule, put it in the schema |
| `timestamp({ withTimezone: true })`   | stores an exact moment; without it the value depends on the server time zone      |
| `updatedAt` with `$onUpdate`          | Drizzle sets it on every update                                                   |
| `casing: 'snake_case'`                | set in both `drizzle.config.ts` and `server/db/client.ts`; TS uses `camelCase`    |

## Structure from the database, rules in schemas

- **Structure** comes from the table: `createInsertSchema(user)`.
- **Validation rules** are added once in `*.schema.ts`.
- **Texts** live only in `app/`. Schemas have no texts.

```ts
const UserInsertSchema = createInsertSchema(user, {
  name: s => s.trim().min(1),
  email: s => s.trim().pipe(z.email()),
})

export const SignInSchema = UserInsertSchema
  .pick({ email: true })
  .extend({ password })
```

Forms are built with `.pick()`, `.omit()`, `.extend()`. A table is not a form: `account` stores a password hash,
the sign-up form has `password` and `confirmPassword`.

Limits shared by the server and the schema are constants in `*.schema.ts`, e.g. `PASSWORD_LENGTH`.

## Required strings: `.trim().min(1)`

`text().notNull()` becomes `z.string()`, and `''` passes it. NOT NULL does not mean "filled in".
Add `.trim().min(1)` (or a format such as `z.email()`) to every required string.

## Client bundle

A drizzle-zod schema pulls `drizzle-orm/pg-core` into the client: about +38 KB minified, +9 KB gzip
compared with the same schema written in plain Zod (measured with esbuild).

## drizzle-orm 1.0

In 1.0 (now a release candidate) drizzle-zod moves into `drizzle-orm/zod`.
On upgrade: change imports and remove the `drizzle-zod` package.

## Commands

| Command            | What                               |
| ------------------ | ---------------------------------- |
| `pnpm db:generate` | create a migration from the tables |
| `pnpm db:migrate`  | apply migrations                   |
| `pnpm db:studio`   | open Drizzle Studio                |
