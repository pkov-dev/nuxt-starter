# Auth layer

Email and password auth with [Better Auth](https://better-auth.com) through [`@nuxtjs/better-auth`](https://better-auth.nuxt.dev).

## Files

```text
layers/auth/
├── nuxt.config.ts                     module, redirects, CSRF off for /api/auth/**
├── app/
│   ├── app.config.ts                  "Account" navigation item
│   ├── auth.config.ts                 Better Auth client
│   ├── components/auth/
│   │   ├── Card.vue                   <AuthCard>
│   │   ├── SignInForm.vue             <AuthSignInForm>
│   │   └── SignUpForm.vue             <AuthSignUpForm>
│   ├── pages/
│   │   ├── login.vue                  guests only
│   │   ├── register.vue               guests only
│   │   └── account.vue                users only
│   └── utils/auth-form-error.ts       Better Auth codes → app error codes
├── server/auth.config.ts              Better Auth server: Drizzle adapter, uuid ids
└── shared/
    ├── auth.table.ts                  user, session, account, verification
    └── auth.schema.ts                 SignInSchema, SignUpSchema, types
```

Better Auth serves its API at `/api/auth/**`. CSRF from nuxt-security is off there:
Better Auth checks the request origin itself.

## Protecting routes

```ts
definePageMeta({ auth: 'user' })
```

```ts
const { user } = await requireUserSession(event)
```

`definePageMeta` is UX only. Always check the session in API routes.

## Errors

Better Auth error codes are mapped in `layers/auth/app/utils/auth-form-error.ts`.
Unknown codes show `errors.unknown`. To show a new one, add a code to `shared/types/api-errors.ts`,
a text to `app/utils/validation/messages.ts` and a line to the map.

## Tables

`auth.table.ts` follows the Better Auth schema with project conventions: uuid ids, `timestamptz`, snake_case.
A Better Auth plugin may need extra columns or tables: its docs list them in the "Schema" section.
Add them to `auth.table.ts`, then run `pnpm db:generate`.

## Removing the layer

1. Delete `layers/auth/` and `docs/layers/auth.md`.
2. `pnpm remove better-auth @nuxtjs/better-auth`.
3. Remove `BETTER_AUTH_SECRET` from `config/env.ts` and `.env`.
4. Remove auth codes from `shared/types/api-errors.ts` and their texts from `messages.ts` (optional).
5. Regenerate migrations: delete `server/db/migrations/`, run `pnpm db:generate`.

## Env

| Variable               | Where      | Note                                              |
| ---------------------- | ---------- | ------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | always     | at least 32 characters: `openssl rand -base64 32` |
| `NUXT_PUBLIC_SITE_URL` | production | site origin, e.g. `https://example.com`           |
