<script lang="ts" setup>
import type { ButtonProps } from './types'

const props = defineProps<ButtonProps>()
</script>

<template>
  <UiButtonBase
    v-bind="props"
    :disabled="props.disabled || props.loading"
    class="button"
    :class="{ loading: props.loading }"
  >
    <span class="button__text">
      <slot>
        Submit
      </slot>
    </span>
    <Icon
      v-if="props.loading"
      name="app:spinner"
      size="18"
      class="button__spinner"
    />
  </UiButtonBase>
</template>

<style lang="scss" scoped>
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: 1px solid var(--primary);
  border-radius: var(--radius-md);
  background: var(--primary);
  color: var(--primary-foreground);
  cursor: pointer;
  transition: opacity 0.2s ease;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  }

  &:disabled {
    opacity: 0.6;
  }

  // .button__text
  &__text {
    transition: opacity 0.2s ease;

    .loading & {
      opacity: 0;
    }
  }

  // .button__spinner
  &__spinner {
    position: absolute;
    display: inline-flex;
    transition: opacity 0.2s;
  }
}
</style>
