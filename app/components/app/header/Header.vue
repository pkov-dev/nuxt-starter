<script lang="ts" setup>

</script>

<template>
  <header class="header">
    <div class="header__container">
      <AppHeaderLogo class="header__logo" />
      <AppHeaderNav />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgb(0, 0, 0, 10%);

  // .header__container
  &__container {
    position: relative;
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: space-between;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: var(--background);
    column-gap: 25px;

    @media (width < to-em($md)) {
      &::before {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--background);
        content: '';
      }
    }
  }

  // .header__logo
  &__logo {
    position: relative;
    z-index: 2;
    flex-shrink: 0;
  }
}
</style>
