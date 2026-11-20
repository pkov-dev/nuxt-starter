<script lang="ts" setup>
import type { SignInInput } from '#layers/auth/shared/auth.schema'
import { SignInSchema } from '#layers/auth/shared/auth.schema'

const signIn = useSignIn('email')

async function onSubmit(values: SignInInput) {
  await signIn.execute(values)

  if (signIn.error.value)
    throw authFormError(signIn.error.value)
}
</script>

<template>
  <UiForm
    :submit="onSubmit"
    :schema="SignInSchema"
  >
    <template #default="{ disabled }">
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
        autocomplete="current-password"
        required
        :disabled
      />
    </template>
    <template #footer="{ loading }">
      <UiButton
        type="submit"
        :loading
      >
        Sign in
      </UiButton>
    </template>
  </UiForm>
</template>
