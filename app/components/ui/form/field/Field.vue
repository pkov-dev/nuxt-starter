<script setup lang="ts">
const props = defineProps<FormTextFieldProps>()

const inputProps = computed(() => {
  const { label, name, required, description, validateOnValueUpdate, ...rest } = props

  return rest
})
</script>

<template>
  <UiFormFieldBase
    :name
    :label
    :required
    :description
    :validate-on-value-update
  >
    <template #default="{ field }">
      <UiInput
        v-bind="{ ...inputProps, ...field }"
        :type="props.type"
      />
    </template>
  </UiFormFieldBase>
</template>
