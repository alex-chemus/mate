import { ref } from 'vue'

const useDebounce = (func: (...args: any[]) => void, wait: number) => {
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null) // eslint-disable-line
  const debouncing = ref(false)

  const debounced = (...args: any[]) => {
    debouncing.value = true

    const later = () => {
      if (timeout.value === null) return
      clearTimeout(timeout.value)
      func(...args)
      debouncing.value = false
    }

    if (timeout.value !== null) clearTimeout(timeout.value)
    timeout.value = setTimeout(later, wait)
  }

  return { debounced, debouncing }
}

export default useDebounce
