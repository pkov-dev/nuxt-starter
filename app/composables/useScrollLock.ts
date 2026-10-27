interface ScrollLockOptions {
  target?: Ref<HTMLElement | null> | HTMLElement
  disableTouch?: boolean
}

/**
 * Locks scrolling on a target element.
 *
 * Defaults to document.body.
 */
export function useScrollLock(
  options: ScrollLockOptions = {},
) {
  const locked = ref(false)
  const disableTouch = options.disableTouch ?? true

  const getTarget = () => {
    if (options.target) {
      return unref(options.target)
    }
    return document.body
  }

  const lock = () => {
    if (!import.meta.client)
      return

    if (locked.value)
      return

    const element = getTarget()
    if (!element)
      return

    element.style.overflow = 'hidden'

    if (disableTouch) {
      element.style.touchAction = 'none'
    }

    locked.value = true
  }

  const unlock = () => {
    if (!import.meta.client)
      return

    if (!locked.value)
      return

    const element = getTarget()
    if (!element)
      return

    element.style.overflow = ''

    if (disableTouch) {
      element.style.touchAction = ''
    }

    locked.value = false
  }

  return {
    locked,
    lock,
    unlock,
  }
}
