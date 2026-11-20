<script lang="ts" setup>
import type { SignUpInput } from '#layers/auth/shared/auth.schema'
import { SignUpSchema } from '#layers/auth/shared/auth.schema'

const signUp = useSignUp('email')

async function onSubmit({ confirmPassword: _, ...values }: SignUpInput) {
  await signUp.execute(values)

  if (signUp.error.value)
    throw authFormError(signUp.error.value)
}
</script>

<template>
  <UiForm
    :submit="onSubmit"
    :schema="SignUpSchema"
  >
    <template #default="{ disabled }">
      <UiFormField
        name="name"
        label="Name"
        autocomplete="name"
        required
        :disabled
      />
      <UiFormField
        name="email"
        label="Email"
        type="email"
        autocomplete="email"
        required
        :disabled
      />
      <UiFormField
        name="password"
        label="Password"
        type="password"
        autocomplete="new-password"
        required
        :disabled
      />
      <UiFormField
        name="confirmPassword"
        label="Confirm password"
        type="password"
        autocomplete="new-password"
        required
        :disabled
      />
    </template>
    <template #footer="{ loading }">
      <UiButton
        type="submit"
        :loading
      >
        Create account
      </UiButton>
    </template>
  </UiForm>
</template>
