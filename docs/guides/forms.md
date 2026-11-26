# Forms

## Structure

```text
UiForm                 lifecycle: submit, validation, loading, submit errors, success
 └── UiFormFieldBase   label, hint, error text, required, a11y; the control comes through a slot
      └── UiInput      the control
```

| File                                     | Component         | Role                                      |
| ---------------------------------------- | ----------------- | ----------------------------------------- |
| `app/components/ui/form/Form.vue`        | `UiForm`          | knows the schema, not the fields          |
| `app/components/ui/form/field/Base.vue`  | `UiFormFieldBase` | field wrapper, independent of the control |
| `app/components/ui/form/field/Field.vue` | `UiFormField`     | shortcut: `UiFormFieldBase` + `UiInput`   |
| `app/components/ui/input/Base.vue`       | `UiInputBase`     | native input: value, events, attributes   |
| `app/components/ui/input/Input.vue`      | `UiInput`         | project styling, error state              |

`UiInput` supports `text`, `email`, `password`, `number`, `tel`, `url`, `search`.
Among components, only `UiForm` and `UiFormFieldBase` import vee-validate.

## Adding a form

1. Schema in the layer: `layers/<name>/shared/<name>.schema.ts`. See [decisions/database-and-schemas.md](../decisions/database-and-schemas.md).
2. A feature component with `UiForm`:

```vue
<UiForm :schema="SignInSchema" :submit="onSubmit">
  <template #default="{ disabled }">
    <UiFormField name="email" label="Email" type="email" required :disabled />
  </template>
  <template #footer="{ loading }">
    <UiButton type="submit" :loading>Sign in</UiButton>
  </template>
</UiForm>
```

- `submit` gets the parsed values, so schema transforms apply.
- An error thrown in `submit` is shown by `UiForm`: form errors in the alert, field errors under fields.
- A control other than a text input goes through the slot:

```vue
<UiFormFieldBase name="email" label="Email">
  <template #default="{ field }">
    <UiInput v-bind="field" />
  </template>
</UiFormFieldBase>
```

Error codes and texts: [decisions/validation-and-errors.md](../decisions/validation-and-errors.md).
Example: `layers/auth/app/components/auth/SignInForm.vue`.
