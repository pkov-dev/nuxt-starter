<script lang="ts" setup>
const props = defineProps<FormTextFieldProps>()
const modelValue = defineModel<InputValue>()

const inputProps = computed(() => {
  const { label, error, description, ...rest } = props

  return rest
})
</script>

<template>
  <UiFormFieldBase
    :label="props.label"
    :error="props.error"
    :required="props.required"
    :description="props.description"
  >
    <template #default="{ field }">
      <UiInput
        v-bind="{ ...inputProps, ...field }"
        v-model="modelValue"
        :type="props.type"
      />
    </template>
  </UiFormFieldBase>
</template>
