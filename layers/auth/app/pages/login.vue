<script lang="ts" setup>
definePageMeta({ auth: 'guest' })
</script>

<template>
  <AuthCard title="Sign in">
    <AuthSignInForm />
    <p>
      No account? <NuxtLink to="/register">
        Create one
      </NuxtLink>
    </p>
  </AuthCard>
</template>
