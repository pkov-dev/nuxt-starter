# Nuxt Production Starter

## Purpose

Production-ready reusable Nuxt boilerplate.

Target projects:

- e-commerce
- SaaS
- booking systems
- dashboards
- internal tools
- client projects

Principles:

- Production-first architecture
- KISS
- Explicit over magic
- Minimal dependencies
- Avoid premature abstraction
- Prefer maintainable solutions
- Follow proven patterns

---

## Stack

### Frontend

- Nuxt 4
- Vue 3
- TypeScript
- pnpm
- SCSS
- Tailwind CSS (utility layer only)
- Pinia
- Nuxt Icon
- Nuxt Fonts

### Backend

- Nitro server
- PostgreSQL
- Drizzle ORM
- Zod validation

Database rules:

- `db/` is the single database layer
- Schema-first approach
- SQL migrations
- `snake_case` in PostgreSQL
- `camelCase` in TypeScript
- Prefer modern PostgreSQL patterns
- Use production-oriented schema design
- Prefer `text` for string fields unless length limitation is a real business requirement
- Prefer string/UUID-based identifiers over auto-increment integers
- Use database constraints to enforce data integrity
- Keep schemas explicit and maintainable

---

## Environment Configuration

Environment variables are validated using Zod schemas.

Rules:

- All environment variables must have a typed schema.
- Runtime validation is strict.
- Build-time validation may skip required runtime variables.
- Server secrets must never be exposed to the client.
- Environment configuration should be centralized.

---

## API Communication

Client-side API communication should be isolated from components.

Use composables as the API layer.

Examples:

- `useApi()`
- `useAuth()`
- `useUsers()`

Responsibilities:

- calling server endpoints
- handling loading and error states
- normalizing API responses

Avoid:

- direct API calls inside components
- mixing business logic with UI logic

---

## Architecture

Main principles:

- Feature-oriented structure
- High cohesion
- Low coupling
- Reusable components
- Clear separation of responsibilities
- Avoid unnecessary abstraction

---

## Project Structure

```text
nuxt-starter
│
├── app/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   │
│   │   ├── ui/
│   │   │   ├── button/
│   │   │   │   ├── Base.vue
│   │   │   │   ├── Primary.vue
│   │   │   │   ├── Secondary.vue
│   │   │   │   └── Icon.vue
│   │   │   │
│   │   │   ├── input/
│   │   │   │   ├── Base.vue
│   │   │   │   ├── Password.vue
│   │   │   │   ├── Search.vue
│   │   │   │   ├── Number.vue
│   │   │   │   ├── Textarea.vue
│   │   │   │   └── File.vue
│   │   │   │
│   │   │   ├── select/
│   │   │   │   ├── Base.vue
│   │   │   │   ├── Native.vue
│   │   │   │   └── Multiple.vue
│   │   │   │
│   │   │   ├── checkbox/
│   │   │   │   ├── Base.vue
│   │   │   │   └── Group.vue
│   │   │   │
│   │   │   ├── feedback/
│   │   │   │   ├── Alert.vue
│   │   │   │   ├── Toast.vue
│   │   │   │   ├── Message.vue
│   │   │   │   └── Progress.vue
│   │   │   │
│   │   │   ├── overlay/
│   │   │   │   ├── Modal.vue
│   │   │   │   ├── Drawer.vue
│   │   │   │   ├── Dropdown.vue
│   │   │   │   └── Popover.vue
│   │   │   │
│   │   │   ├── navigation/
│   │   │   │   ├── Tabs.vue
│   │   │   │   ├── Breadcrumbs.vue
│   │   │   │   ├── Pagination.vue
│   │   │   │   └── Menu.vue
│   │   │   │
│   │   │   │
│   │   │   └── table/
│   │   │       ├── Base.vue
│   │   │
│   │   ├── app/
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   ├── Sidebar.vue
│   │   │   ├── Logo.vue
│   │   │   ├── Loader.vue
│   │   │   ├── Error.vue
│   │   │   └── CookieBanner.vue
│   │   │
│   │   ├── shared/
│   │   │   ├── EmptyState.vue
│   │   │   ├── ErrorState.vue
│   │   │   ├── Confirm.vue
│   │   │   ├── Copy.vue
│   │   │   ├── Avatar.vue
│   │   │   ├── FilePreview.vue
│   │   │   └── StatusBadge.vue
│   │   │
│   │   ├── feature/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.vue
│   │   │   │   ├── RegisterForm.vue
│   │   │   │   ├── ForgotPassword.vue
│   │   │   │   └── UserMenu.vue
│   │   │   ├── user/
│   │   │   │   ├── Profile.vue
│   │   │   │   ├── Avatar.vue
│   │   │   │   └── Settings.vue
│   │   │   ├── catalog/
│   │   │   │   ├── Card.vue
│   │   │   │   ├── Filter.vue
│   │   │   │   ├── Sort.vue
│   │   │   │   └── List.vue
│   │   │   ├── checkout/
│   │   │   │   ├── Form.vue
│   │   │   │   ├── Summary.vue
│   │   │   │   └── Payment.vue
│   │   │   └── product/
│   │   │       ├── Card.vue
│   │   │       ├── Gallery.vue
│   │   │       └── Details.vue
│   │   │
│   │   └── page/
│   │       ├── home/
│   │       │   ├── Hero.vue
│   │       │   ├── Features.vue
│   │       │   ├── Reviews.vue
│   │       │   ├── Pricing.vue
│   │       │   └── Newsletter.vue
│   │       ├── about/
│   │       │   ├── Hero.vue
│   │       │   ├── Team.vue
│   │       │   └── History.vue
│   │       ├── product/
│   │       │   ├── Filter.vue
│   │       │   ├── Sort.vue
│   │       │   └── Gallery.vue
│   │       └── dashboard/
│   │           ├── Header.vue
│   │           ├── Stats.vue
│   │           └── Activity.vue
│   │
│   ├── composables/
│   ├── layouts/
│   ├── middleware/
│   ├── pages/
│   ├── plugins/
│   ├── utils/
│   ├── app.vue
│   └── app.config.ts
│
├── server/
│   ├── api/
│   ├── middleware/
│   ├── plugins/
│   └── modules/
│       ├── users/
│       │   ├── users.repository.ts
│       │   ├── users.service.ts
│       │   └── users.queries.ts
│       └── products/
│           ├── products.repository.ts
│           ├── products.service.ts
│           └── products.queries.ts
│
├── db/
│   ├── client.ts
│   ├── schema/
│   │   ├── users.ts
│   │   ├── products.ts
│   │   └── index.ts
│   └── migrations/
│
├── shared/
│   ├── types/
│   ├── utils/
│   ├── constants/
│   └── schemas/
│
├── public/
├── content/
├── test/
├── Dockerfile
├── compose.dev.yml
├── compose.prod.yml
├── compose.check.yml
├── config/
├── drizzle.config.ts
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

---

## Components Architecture

Components follow a layered approach:

```text
Base component
        ↓
Project-specific wrapper
        ↓
Feature component
```

Prefer composition over components with many styling/configuration props.

Avoid:

- large universal components
- excessive prop configuration
- duplicated UI logic

---

## Server Architecture

```text
server/

api/
modules/

module/

repository
service
queries
```

Rules:

- Repository = database access
- Service = business logic
- API = HTTP layer

---

## Composables

Composables are used for reusable client-side logic.

Examples:

- API fetching wrappers
- browser utilities
- stateful client logic

Avoid putting business logic directly inside components.

---

## Infrastructure

### Development

- Nuxt runs locally
- Infrastructure runs through Docker

### Production

- Docker Compose
- Nuxt container
- PostgreSQL container
- Nginx reverse proxy

## Future

- MinIO for object storage
- Redis only when required

---

## Security

Use:

- Nuxt Security
- CSRF protection
- Zod validation

Authentication:

Authentication should be isolated from application logic.

Possible solutions:

- Better Auth
- Nuxt Auth Utils

Rules:

- Authentication provider should not leak into business logic.
- Client auth state should be accessed through composables/stores.
- Authorization rules belong to server middleware/services.
- Auth implementation should be replaceable without rewriting the application.

---

## Coding Rules

Always:

- Prefer simple solutions
- Explain trade-offs
- Keep dependencies minimal
- Follow existing architecture

Avoid:

- Creating new top-level folders without reason
- Duplicate components
- Overengineering
- Premature abstractions

When adding new functionality:

Prefer extending existing architecture instead of creating new patterns.
