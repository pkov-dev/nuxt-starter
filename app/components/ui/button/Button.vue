<script lang="ts" setup>
import type { ButtonProps } from './types'

const props = defineProps<ButtonProps>()
</script>

<template>
  <UiButtonBase
    v-bind="props"
    class="button"
  >
    <slot>
      Submit
    </slot>
  </UiButtonBase>
</template>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: 1px solid var(--primary);
  border-radius: var(--radius);
  background: var(--primary);
  color: var(--primary-foreground);
  cursor: pointer;
  transition: opacity 0.2s ease;

  @media (hover: hover) {
    &:hover {
      opacity: 0.9;
    }
  }

  &:disabled {
    opacity: 0.5;
  }
}
</style>
