<script lang="ts" setup>
// import z from 'zod'

// const LoginSchema = z.object({
//   email: z.string().email('Invalid email frontend'),
//   password: z.string().min(8, 'Minimum 8 characters front'),
// })

// type LoginForm = z.infer<typeof LoginSchema>

// const {
//   handleSubmit,
//   defineField,
//   setErrors,
// } = useForm<LoginForm>({
//   validationSchema: toTypedSchema(LoginSchema),
// })

const form = ref({
  email: '',
  password: '',
})

const { csrf, headerName } = useCsrf()

async function login() {
  const result = await $fetch('/api/test', {
    method: 'POST',
    body: form.value,
    headers: {
      [headerName]: csrf,
    },
  })

  return result
}
</script>

<template>
  <UiForm
    :submit="login"
  >
    <template #header>
      <h1 class="form__title">
        Login Form
      </h1>
    </template>
    <template #default="{ disabled }">
      <UiFormField
        v-model="form.email"
        label="Email"
        :disabled
      />

      <UiFormField
        v-model="form.password"
        label="Password"
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
