<script setup lang="ts">
import type { ButtonProps } from './types'
import { NuxtLink } from '#components'

const { disabled = false, to, type = 'button' } = defineProps<ButtonProps>()
const tag = computed(() => (to ? NuxtLink : 'button'))
const componentProps = computed(() => tag.value === NuxtLink
  ? { to }
  : { disabled, type })
</script>

<template>
  <component
    :is="tag"
    v-bind="componentProps"
  >
    <slot />
  </component>
</template>
