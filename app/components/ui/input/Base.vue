<script setup lang="ts">
const { type = 'text', ...props } = defineProps<FormTextInputProps>()

const modelValue = defineModel<InputValue>()
</script>

<template>
  <input
    :id="props.id"
    v-model="modelValue"
    :name="props.name"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :required="props.required"
    :readonly="props.readonly"
    :autocomplete="props.autocomplete"
    :pattern="props.pattern"
    :type
    :aria-invalid="props.error ? 'true' : undefined"
    :aria-describedby="props.ariaDescribedby"
    v-bind="$attrs"
  >
</template>
