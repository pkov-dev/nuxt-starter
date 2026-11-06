<script lang="ts" setup>

</script>

<template>
  <section class="login">
    <div class="login__container">
      <FeatureAuthLoginForm />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.login {
  // .login__container
  &__container {
    display: grid;
    min-height: calc(100svh - 143px);
    padding-top: 130px;
    padding-bottom: 60px;
    place-items: center;
  }
}
</style>
