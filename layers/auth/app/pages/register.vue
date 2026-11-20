<script lang="ts" setup>
definePageMeta({ auth: 'guest' })
</script>

<template>
  <AuthCard title="Create account">
    <AuthSignUpForm />
    <p>
      Have an account? <NuxtLink to="/login">
        Sign in
      </NuxtLink>
    </p>
  </AuthCard>
</template>
