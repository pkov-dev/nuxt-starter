<script lang="ts" setup>
type MessageStatus = 'success' | 'error' | 'warning'

interface Props {
  status: MessageStatus
  message: string
  title?: string
  iconName?: string
}

const props = defineProps<Props>()

const iconName = computed(() => {
  if (props.iconName)
    return props.iconName
  else if (props.status === 'success')
    return 'form-success-circle'
  else if (props.status === 'warning')
    return 'form-exclamation-triangle'
  else if (props.status === 'error')
    return 'form-exclamation-circle'
  return undefined
})
</script>

<template>
  <div
    class="message"
    :class="props.status"
  >
    <Icon
      v-if="iconName"
      :name="`app:${iconName}`"
      class="message__icon"
    />
    <div class="message__content">
      <p
        v-if="props.title"
        class="message__title"
      >
        {{ props.title }}
      </p>

      <p>
        {{ props.message }}
      </p>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  &__icon {
  }

  &__content {
  }

  &__title {
  }
}

.message {
  --message-color: currentcolor;
  --message-background: transparent;
  --message-border: var(--border);

  display: flex;
  align-items: flex-start;
  padding: 10px 12px;
  border: 1px solid var(--message-border);
  border-radius: var(--radius-md);
  background-color: var(--message-background);
  color: var(--message-color);
  font-size: 14px;
  gap: 8px;

  // .message__icon
  &__icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-top: to-em(1, 14);
  }

  // .message__content
  &__content {
    display: grid;
    gap: 2px;
  }

  // .message__title
  &__title {
    font-weight: 600;
  }

  &.success {
    --message-color: oklch(52.7% 0.154 150.069deg);
    --message-background: oklch(98.2% 0.018 155.826deg);
    --message-border: oklch(87.1% 0.15 154.449deg);
  }

  &.error {
    --message-color: var(--destructive);
    --message-background: oklch(97.1% 0.013 17.38deg);
    --message-border: oklch(80.8% 0.114 19.571deg);
  }

  &.warning {
    --message-color: oklch(55.5% 0.163 48.998deg);
    --message-background: oklch(98.7% 0.022 95.277deg);
    --message-border: oklch(87.9% 0.169 91.605deg);
  }
}
</style>
