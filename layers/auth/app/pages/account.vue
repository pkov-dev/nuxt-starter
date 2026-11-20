<script lang="ts" setup>
definePageMeta({ auth: 'user' })

const { user } = useUserSession()
const signOut = useSignOut()
</script>

<template>
  <AuthCard title="Account">
    <dl>
      <dt>Name</dt>
      <dd>{{ user?.name }}</dd>
      <dt>Email</dt>
      <dd>{{ user?.email }}</dd>
    </dl>
    <UiButton
      :loading="signOut.status.value === 'pending'"
      @click="signOut.execute()"
    >
      Sign out
    </UiButton>
  </AuthCard>
</template>
