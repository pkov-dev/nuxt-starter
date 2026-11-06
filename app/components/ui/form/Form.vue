<script lang="ts" setup>
import { FetchError } from 'ofetch'

type ServerErrors = Record<string, string[]>

interface Props {
  submit: () => Promise<unknown>
  disabled?: boolean
  successMessage?: string
  showMessage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
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

const loading = ref(false)
const internalError = ref<string>()
const serverValidationErrors = ref<ServerErrors>()
const success = ref(false)

async function handleSubmit() {
  if (loading.value)
    return

  loading.value = true
  internalError.value = undefined
  serverValidationErrors.value = undefined
  success.value = false

  try {
    await props.submit()

    success.value = true
    emit('success')
  }
  catch (error) {
    if (error instanceof FetchError) {
      internalError.value = error.data?.statusMessage

      if (error.data.data) {
        serverValidationErrors.value = error.data.data
      }
    }

    if (!internalError.value) {
      internalError.value = 'Something went wrong'
    }

    emit('error', { error, message: internalError.value })
  }
  finally {
    loading.value = false
  }
}

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
    @submit.prevent="handleSubmit"
  >
    <slot name="header" />

    <slot v-if="props.showMessage" name="message">
      <LazyUiAlert
        v-if="message"
        :status="message.status"
        :message="message.message"
      />
    </slot>

    <slot
      :loading
      :disabled="disabled || loading"
      :server-validation-errors
    />

    <slot
      name="footer"
      :loading
      :disabled="disabled || loading"
    />
  </form>
</template>
