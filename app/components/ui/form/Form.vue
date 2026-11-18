<script lang="ts" setup generic="T extends ZodObject">
import type { FormOptions } from 'vee-validate'
import type { z, ZodObject } from 'zod'
import type { Namespace } from '~/utils/validation/get-message'
import { FetchError } from 'ofetch'
import { useForm } from 'vee-validate'
import { formatServerIssues, isIssueList } from '~/utils/validation/format-server-issues'
import { withMessages } from '~/utils/validation/with-messages'

interface Props<T extends ZodObject> {
  schema: T
  submit: (values: z.infer<T>) => Promise<unknown>
  initialValues?: FormOptions<z.infer<T>>['initialValues']
  successMessage?: string
  showMessage?: boolean
  namespace?: Namespace
}

const props = withDefaults(defineProps<Props<T>>(), {
  successMessage: 'Form submitted successfully',
  showMessage: true,
})

const emit = defineEmits<{
  success: []
  error: [{
    error: unknown
    message: string
  }]
}>()

const internalError = ref<string>()
const success = ref(false)

const {
  handleSubmit,
  values,
  isSubmitting,
  setErrors,
} = useForm<z.infer<T>>({
  validationSchema: withMessages(props.schema, props.namespace),
  initialValues: props.initialValues,
})

const onSubmit = handleSubmit(async () => {
  internalError.value = undefined
  success.value = false

  try {
    await props.submit(values)

    success.value = true
    emit('success')
  }
  catch (error) {
    if (error instanceof FetchError) {
      internalError.value = error.data?.statusMessage

      const issues = error.data?.data

      if (isIssueList(issues)) {
        setErrors(formatServerIssues(issues, values, props.namespace))
      }
    }

    if (!internalError.value) {
      internalError.value = 'Something went wrong'
    }

    emit('error', { error, message: internalError.value })
  }
})

const message = computed(() => {
  if (internalError.value) {
    return {
      status: 'error' as const,
      message: internalError.value,
    }
  }

  if (success.value) {
    return {
      status: 'success' as const,
      message: props.successMessage,
    }
  }

  return null
})
</script>

<template>
  <form
    class="form"
    @submit.prevent="onSubmit"
  >
    <slot name="header" />
    {{ values }}
    <slot v-if="props.showMessage" name="message">
      <LazyUiAlert
        v-if="message"
        :status="message.status"
        :message="message.message"
      />
    </slot>

    <slot
      :loading="isSubmitting"
      :disabled="isSubmitting"
    />

    <slot
      name="footer"
      :loading="isSubmitting"
      :disabled="isSubmitting"
    />
  </form>
</template>
