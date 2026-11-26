# Contributing

Setup and commands: [README.md](README.md). Architecture and decisions: [docs/](docs/README.md).

## Git workflow (GitHub Flow)

- `main` is always working and deployable. No direct commits to `main`.
- Every feature or fix gets its own short-lived branch from an up-to-date `main`.
- Branch names: `<type>/<short-name>`, where type is `feat`, `fix`, `refactor`, `docs` or `chore`. Example: `feat/user-profile`.
- One branch — one task. Unrelated changes go to a separate branch.
- Commit messages and pull request titles: gitmoji + short description. Example: `:sparkles: auth layer with Better Auth`.
- Push the branch and open a pull request into `main`. CI must pass before merging.
- Merge with squash: one commit per pull request.
- After merging, delete the branch and pull `main`.

## Checks

- `pnpm check` (lint, stylelint, typecheck, docs check) must pass before a commit. It also runs on pre-push and in CI.
- The docs check fails on a link, an anchor or a backticked repo path in docs that does not exist, or a doc not listed in `docs/README.md`. Write paths from the repo root.

## Code style

- No comments in code, except JSDoc.
- Every exported function and composable has a short JSDoc: purpose, `@param` per parameter, `@returns`, `@example`, one line each, no types. An internal helper gets one only when its name and types are not enough.
- Explanations of decisions go to `docs/decisions/*.md`, not into code.
- User-facing messages (validation, errors) are as short as possible without losing meaning.
- No untyped hardcoded strings: field names, codes and keys passed between layers are typed, so TypeScript catches mistakes. A literal is fine only where a type checks it.

## Where code lives

- A function lives in the file that uses it.
- If several files need it, move it to the nearest common parent:
  - `app/utils` — client only;
  - `server/utils` — server only;
  - `shared/` — both client and server.
- Do not put client-only helpers in `shared/`.
- Inside a layer the same rule applies within `layers/<name>/`.

## Documentation

- All documentation lives in `docs/`. No `README.md` inside layers or other subfolders.
- `docs/README.md` is the index: every doc is listed with a "read when" hint.
- Kinds of docs:
  - `overview.md` — what the project is and how its parts connect;
  - `guides/` — how something works and how to extend it;
  - `decisions/` — why: one topic per file, edited in place;
  - `layers/<name>.md` — contract of a layer: routes, tables, codes, extension points.
- Docs describe the current state only. No plans, task lists or thinking process.
- Each fact lives in one place; other docs link to it.
- Docs are for another developer: impersonal and short.
- A decision made during a task goes to `docs/` in the same branch.
- Docs change in the same branch when the code changes something a doc describes, or adds a layer, a convention or a decision another developer needs. A new layer gets `docs/layers/<name>.md`; a new doc gets a row in `docs/README.md`.
- Internal details, fixes and refactors that keep documented behavior do not need docs.
