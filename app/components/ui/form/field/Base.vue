<script setup lang="ts">
import { useField } from 'vee-validate'
import { useId } from 'vue'

const props = withDefaults(defineProps<FormFieldProps>(), {
  validateOnValueUpdate: false,
})
const id = useId()

const {
  value,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField<InputValue>(props.name)

const describedBy = computed(() => {
  return [
    props.description ? `${id}-description` : undefined,
    errorMessage.value ? `${id}-error` : undefined,
  ]
    .filter(Boolean)
    .join(' ') || undefined
})

const field = computed(() => ({
  id,
  'modelValue': value.value,
  'onUpdate:modelValue': (newValue: InputValue) => {
    handleChange(newValue, props.validateOnValueUpdate)
  },
  'onBlur': handleBlur,
  'aria-invalid': errorMessage.value
    ? 'true'
    : undefined,
  'aria-describedby': describedBy.value,
}))

const state = computed(() => ({
  error: errorMessage.value,
  touched: meta.touched,
  dirty: meta.dirty,
  valid: meta.valid,
  pending: meta.pending,
}))
</script>

<template>
  <div class="form-field">
    <label
      v-if="label"
      :for="id"
      class="form-field__label"
    >
      {{ label }}

      <span
        v-if="required"
        class="form-field__required"
        aria-hidden="true"
      >
        *
      </span>
    </label>

    <slot
      :field
      :state
    />

    <p
      v-if="state.error"
      :id="`${id}-error`"
      class="form-field__error"
    >
      {{ state.error }}
    </p>

    <p
      v-else-if="description"
      :id="`${id}-description`"
      class="form-field__description"
    >
      {{ description }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.form-field {
  display: grid;
  gap: 6px;

  // .form-field__label

  &__label {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
  }

  .form-field {
    // .form-field__required
    &__required {
      margin-left: 2px;
      color: var(--destructive);
    }
  }

  // .form-field__description
  &__description {
    color: var(--muted-foreground);
  }

  // .form-field__error
  &__error {
    color: var(--destructive);
    line-height: 1;
  }

  &__description,
  &__error {
    font-size: 12px;
  }
}
</style>
