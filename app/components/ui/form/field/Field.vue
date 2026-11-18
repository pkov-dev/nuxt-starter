<script setup lang="ts">
import { FORM_VALIDATION_DEFAULTS } from '../constants'

const props = withDefaults(defineProps<FormTextFieldProps>(), FORM_VALIDATION_DEFAULTS)

const inputProps = computed(() => {
  const { label, name, required, description, validateOnValueUpdate, validateOnBlur, ...rest } = props

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
    :validate-on-blur
  >
    <template #default="{ field }">
      <UiInput
        v-bind="{ ...inputProps, ...field }"
        :type="props.type"
      />
    </template>
  </UiFormFieldBase>
</template>
