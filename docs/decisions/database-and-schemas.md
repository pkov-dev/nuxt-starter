# Database and schemas

## Where things live

| Path                | What                                      | Runs on |
| ------------------- | ----------------------------------------- | ------- |
| `shared/db/schema/` | tables (`pgTable`), no connection         | both    |
| `shared/schemas/`   | Zod schemas: drizzle-zod + business rules | both    |
| `server/db/`        | connection, migrations                    | server  |
| `app/`              | error texts                               | client  |

Inside `shared/db/schema/` use relative imports: drizzle-kit does not resolve Nuxt aliases.

## Columns

| Choice                                | Why                                                                               |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| `uuid().primaryKey().defaultRandom()` | ids are not guessable and can be created outside the database                     |
| `text()`, not `varchar(n)`            | same speed in PostgreSQL; a length limit is a business rule, put it in the schema |
| `timestamp({ withTimezone: true })`   | stores an exact moment; without it the value depends on the server time zone      |
| `updatedAt` with `$onUpdate`          | Drizzle sets it on every update                                                   |
| `casing: 'snake_case'`                | set in both `drizzle.config.ts` and `server/db/client.ts`; TS uses `camelCase`    |

## Structure from the database, rules in schemas

- **Structure** comes from the table: `createInsertSchema(users)`.
- **Validation rules** are added once in `shared/schemas/`.
- **Texts** live only in `app/`. `shared/schemas/` has no texts.

```ts
export const UserInsertSchema = createInsertSchema(users, {
  email: s => s.trim().pipe(z.email()),
  name: s => s.trim().min(2),
})

export const ProfileFormSchema = UserInsertSchema.pick({ email: true, name: true })
```

Forms are built with `.pick()`, `.omit()`, `.extend()`. Schemas without a table (login, password reset)
live in `shared/schemas/` too.

A table is not a form: the table stores `passwordHash`, the form has `password` and `confirmPassword`.

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
| `pnpm db:generate` | create a migration from the schema |
| `pnpm db:migrate`  | apply migrations                   |
| `pnpm db:studio`   | open Drizzle Studio                |
