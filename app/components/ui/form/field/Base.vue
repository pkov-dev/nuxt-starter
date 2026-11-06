<script lang="ts" setup>
import { useId } from 'vue'

const props = defineProps<FormFieldProps>()
const id = useId()

const describedBy = computed(() => {
  return [
    props.description ? `${id}-description` : undefined,
    props.error ? `${id}-error` : undefined,
  ]
    .filter(Boolean)
    .join(' ') || undefined
})
</script>

<template>
  <div class="form-field">
    <label
      v-if="props.label"
      :for="id"
      class="form-field__label"
    >
      {{ props.label }}

      <span
        v-if="props.required"
        class="form-field__required"
        aria-hidden="true"
      >
        *
      </span>
    </label>

    <slot
      :field="{
        id,
        'error': Boolean(props.error),
        'aria-describedby': describedBy,
        'aria-invalid': props.error ? 'true' : undefined,
      }"
    />
    <p
      v-if="props.error"
      :id="`${id}-error`"
      class="form-field__error"
    >
      {{ props.error }}
    </p>
    <p
      v-else-if="props.description"
      :id="`${id}-description`"
      class="form-field__description"
    >
      {{ props.description }}
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
