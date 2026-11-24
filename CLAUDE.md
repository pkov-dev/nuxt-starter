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

## Git workflow (GitHub Flow)

- `main` is always working and deployable. No direct commits to `main`.
- Every feature or fix gets its own short-lived branch from an up-to-date `main`.
- Branch names: `<type>/<short-name>`, where type is `feat`, `fix`, `refactor`, `docs` or `chore`. Example: `feat/user-profile`.
- One branch — one task. Unrelated changes go to a separate branch.
- Commit messages and pull request titles: gitmoji + short description, as in the existing history.
- Push the branch and open a pull request into `main`. CI must pass before merging.
- Merge with squash: one commit per pull request.
- After merging, delete the branch and pull `main`.
- GitHub work (pull requests, checks, issues) through the `gh` CLI; git over SSH.
- Push and opening a pull request only after the user explicitly confirms that step. Agreeing to a plan is not a confirmation.
- The user merges pull requests. Never run `gh pr merge`.

## Rules in this file

- Only short actionable instructions, no explanations.
- Add a rule only when the user states a decision. A question is not a rule.
- Project rules and knowledge live in this repo (`CLAUDE.md`, `docs/`), never in agent memory.
