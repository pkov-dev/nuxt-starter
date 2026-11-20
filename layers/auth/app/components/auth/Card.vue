<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="auth-card">
    <div class="auth-card__body">
      <h1 class="auth-card__title">
        {{ title }}
      </h1>
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.auth-card {
  display: grid;
  min-height: calc(100svh - 143px);
  padding-top: 130px;
  padding-bottom: 60px;
  place-items: center;

  // .auth-card__body
  &__body {
    display: grid;
    width: 100%;
    max-width: 448px;
    padding: 32px;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background-color: var(--card);
    gap: 24px;
  }

  // .auth-card__title
  &__title {
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 700;
  }
}
</style>
