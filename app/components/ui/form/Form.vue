<script lang="ts" setup generic="T extends ZodObject">
import type { FormOptions } from 'vee-validate'
import type { z, ZodObject } from 'zod'
import { FetchError } from 'ofetch'
import { useForm } from 'vee-validate'
import { formatServerIssues, isIssueList } from '~/utils/validation/format-server-issues'
import { getFormErrorMessage } from '~/utils/validation/get-form-error-message'
import { localizeSchema } from '~/utils/validation/localize-schema'
import { messages } from '~/utils/validation/messages'

interface Props<T extends ZodObject> {
  schema: T
  submit: (values: z.infer<T>) => Promise<unknown>
  initialValues?: FormOptions<z.infer<T>>['initialValues']
  successMessage?: string
  showMessage?: boolean
}

const props = withDefaults(defineProps<Props<T>>(), {
  successMessage: messages.form.success,
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
  validationSchema: localizeSchema(props.schema),
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
    if (import.meta.dev)
      console.error(error)

    internalError.value = getFormErrorMessage(error)

    const issues = error instanceof FetchError ? error.data?.data : undefined

    if (isIssueList(issues)) {
      setErrors(formatServerIssues(issues, values))
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
