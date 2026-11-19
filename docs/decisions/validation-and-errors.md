# Validation and errors

## Texts live only on the client

The server returns codes, never user-facing texts. All texts are in
`app/utils/validation/messages.ts`.

Why: one place for texts, i18n only on the client, server texts can leak internals.

## Three kinds of errors

| Kind                                          | Server                                                               | Client shows                                 |
| --------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------- |
| Schema error                                  | thrown by `readValidatedBodyZod` automatically                       | text under the field                         |
| Field error (business rule, e.g. email taken) | `throw createError(fieldError<typeof body>('email', 'email_taken'))` | text under the field                         |
| Form error (e.g. invalid credentials)         | `throw createError(formError(401, 'invalid_credentials'))`           | text in the form alert                       |
| Unexpected error                              | anything                                                             | `errors.unknown`, server text is never shown |

Codes are declared in `shared/types/api-errors.ts`, helpers live in `server/utils/errors.ts`. `fieldError` requires the body type, so only existing fields compile.
TypeScript requires a text for every code.
Name codes after what happened: `email_taken`, not `show_email_error`.

## Text lookup

`fields[fieldName][key]` → `defaults[key]` → `defaults.invalid`

- `key`: `required` for empty values, `custom.<code>` for field errors,
  `too_small.<origin>` / `too_big.<origin>`, otherwise the Zod issue code.
- "Required" is derived from the input (undefined, null, '' or whitespace):
  Zod 4 reports empty values as `invalid_type` / `too_small` / `invalid_format`.
- A field name means the same thing across the app (`email` is always an email).
  No per-form or per-entity texts.
- Texts are short. Templates use `{min}` / `{max}` (vue-i18n syntax).

## Where input comes from

- Client validation: Zod passes `input` to the error map (`localizeSchema`).
- Server issues: Zod strips `input`, so `formatServerIssues` restores it from form values.

## i18n

`translate.ts` is the single swap point: replace the lookup with `te(key) ? t(key, params) : undefined`
and move `messages` to a locale file.

## Code placement

A function lives in the file that uses it. Used by several files → nearest common parent:
`app/utils` (client), `server/utils` (server), `shared/` (both).
