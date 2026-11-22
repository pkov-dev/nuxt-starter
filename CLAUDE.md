# Rules for working on this project

Project docs: [docs/README.md](docs/README.md). Read `docs/project-guide.md` and the relevant `docs/decisions/*.md` before changing architecture.

## Code style

- No comments in code. At most a one-line JSDoc on a function when the types do not make it obvious.
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
- A layer is documented in `docs/layers/<name>.md` and linked from `docs/README.md`.

## Checks

- `pnpm check` (lint, stylelint, typecheck) must pass before a commit.
