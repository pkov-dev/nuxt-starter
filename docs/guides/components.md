# Components

## Three levels

```text
Base     low-level behavior, no project styling     UiInputBase, UiButtonBase
  ↓
Ui       project styling and design system           UiInput, UiButton
  ↓
Feature  UI components + business logic of a layer   AuthSignInForm
```

- `Base` and `Ui` components live in the core: `app/components/ui/<name>/`.
- Feature components live in their layer: `layers/<name>/app/components/<name>/`.
- The app shell (header, footer, navigation) lives in `app/components/app/`.

Prefer composition of small components over one universal component with many configuration props.

## Naming

Nuxt names components by path inside `components/`: `app/components/ui/button/Base.vue` → `<UiButtonBase>`,
`app/components/ui/button/Button.vue` → `<UiButton>`.
A layer puts its components into `components/<name>/`, so names do not clash: `<AuthCard>`.

## UI kit

| Folder                      | Components                                 |
| --------------------------- | ------------------------------------------ |
| `app/components/ui/button/` | `UiButtonBase`, `UiButton`                 |
| `app/components/ui/input/`  | `UiInputBase`, `UiInput`                   |
| `app/components/ui/form/`   | `UiForm`, `UiFormFieldBase`, `UiFormField` |
| `app/components/ui/alert/`  | `UiAlert`                                  |

Forms: [forms.md](forms.md). Styles: [decisions/styles.md](../decisions/styles.md).

## Adding a component

1. Used by one layer only → the layer's `components/<name>/`.
2. Reusable across layers → `app/components/ui/<name>/`: a `Base.vue` for behavior if it is needed, a `<Name>.vue` for styling.
