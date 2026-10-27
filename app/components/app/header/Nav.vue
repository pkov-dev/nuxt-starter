<script lang="ts" setup>
import { navigation } from '~/data/navigation'

const { lock, unlock } = useScrollLock()
const uiStore = useUIStore()
const route = useRoute()

watch(() => uiStore.isHeaderMenuOpen, (val) => {
  if (val)
    lock()
  else unlock()
})

watch(() => route.path, () => {
  uiStore.closeHeaderMenu()
})
</script>

<template>
  <div class="header-nav">
    <AppHeaderMenuButton :is-open="uiStore.isHeaderMenuOpen" @toggle="uiStore.toggleHeaderMenu" />
    <nav
      class="header-nav__body"
      :class="{
        open: uiStore.isHeaderMenuOpen,
      }"
    >
      <ul class="header-nav__list">
        <li
          v-for="item in navigation"
          :key="item.label"
        >
          <NuxtLink
            :to="item.to"
            class="header-nav__link"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.header-nav {
  display: flex;
  align-items: center;

  // .header-nav__body
  &__body {
    @media (width < to-em($md)) {
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      display: flex;
      overflow: auto;
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
      padding: 100px 15px 0;
      background-color: var(--background);
      opacity: 0;
      row-gap: 40px;
      transform: translateY(-12px) scale(0.98);
      transition:
        opacity 250ms ease-out,
        transform 300ms ease-out;

      &.open {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  }

  // .header-nav__list
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 4px 40px;

    @media (width < to-em($md)) {
      flex-direction: column;
      row-gap: 16px;
    }
  }

  // .header-nav__link
  &__link {
    // &.router-link-active.router-link-exact-active {
    //   text-decoration: underline;
    // }
  }
}
</style>
