<script lang="ts" setup>
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

type SchemaType = z.infer<typeof LoginSchema>

const { csrf, headerName } = useCsrf()
async function onSubmit(values: SchemaType) {
  await $fetch('/api/test', {
    method: 'POST',
    body: values,
    headers: {
      [headerName]: csrf,
    },
  })
}
</script>

<template>
  <UiForm
    :submit="onSubmit"
    :schema="LoginSchema"
  >
    <template #header>
      <h1 class="form__title">
        Login Form
      </h1>
    </template>
    <template #default="{ disabled }">
      <UiFormField
        label="Email"
        name="email"
        required
        autocomplete="email"
        :disabled
      />

      <UiFormField
        name="password"
        label="Password"
        required
        :disabled
      />
    </template>
    <template #footer="{ loading }">
      <UiButton
        type="submit"
        :loading="loading"
      >
        Login
      </UiButton>
    </template>
  </UiForm>
</template>

<style scoped lang="scss">
.form {
  display: grid;
  width: 100%;
  max-width: 448px;
  padding: 32px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background-color: var(--card);
  gap: 24px;

  // .form__title
  &__title {
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 700;
  }
}
</style>
