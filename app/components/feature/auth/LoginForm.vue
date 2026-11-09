<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.email('Invalid email frontend'),
  password: z.string().min(8, 'Minimum 8 characters front'),
})

type LoginForm = z.infer<typeof LoginSchema>

const {
  handleSubmit,
  values,
} = useForm<LoginForm>({
  validationSchema: LoginSchema,
})

const { csrf, headerName } = useCsrf()
const submit = handleSubmit(async (values) => {
  await $fetch('/api/test', {
    method: 'POST',
    body: values,
    headers: {
      [headerName]: csrf,
    },
  })
})
</script>

<template>
  <UiForm
    :submit="submit"
  >
    <template #header>
      <h1 class="form__title">
        Login Form
      </h1>
      {{ values }}
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
