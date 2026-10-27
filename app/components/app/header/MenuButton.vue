<script lang="ts" setup>
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

const ariaLabel = computed(() => props.isOpen ? 'Close navigation menu' : 'Open navigation menu')
</script>

<template>
  <button
    type="button"
    class="menu-button"
    :class="{
      open: isOpen,
    }"
    :aria-label
    :aria-expanded="isOpen"
    @click="emit('toggle')"
  >
    <span />
  </button>
</template>

<style lang="scss" scoped>
.menu-button {
  display: none;

  @media (width < to-em($md)) {
    position: relative;
    z-index: 5;
    display: block;
    width: 30px;
    height: 18px;

    span,
    &::before,
    &::after {
      position: absolute;
      right: 0;
      width: 100%;
      height: 2px;
      border-radius: 2px;
      background-color: #000;
      content: '';
      transition: all 0.3s ease 0s;
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
    }

    span {
      top: calc(50% - 1px);
    }

    &.open {
      span {
        opacity: 0;
        transform: scaleX(0);
      }

      &::before {
        top: calc(50% - 1px);
        transform: rotate(-45deg);
      }

      &::after {
        bottom: calc(50% - 1px);
        transform: rotate(45deg);
      }
    }
  }
}
</style>
