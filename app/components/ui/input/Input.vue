<script lang="ts" setup>
const props = defineProps<FormTextInputProps>()
const modelValue = defineModel<InputValue>()
</script>

<template>
  <UiInputBase
    v-bind="props"
    v-model="modelValue"
    class="input"
    :class="{
      error: props.error,
    }"
  />
</template>

<style lang="scss" scoped>
.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--input);
  border-radius: var(--radius-md);
  background: var(--background);
  color: var(--foreground);
  transition: border-color 0.2s ease;

  &::placeholder {
    color: var(--muted-foreground);
    transition: opacity 0.2s;
  }

  &:focus::placeholder {
    opacity: 0;
  }

  &:hover {
    border-color: var(--input-hover);
  }

  &:focus-visible {
    border-color: var(--input-focus);
    outline: none;
  }

  &:disabled {
    background: var(--muted);
    opacity: 0.6;
  }

  &.error {
    border-color: var(--destructive);
  }
}
</style>
