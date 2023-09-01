import {
  onMounted, onUnmounted, ref, computed
} from 'vue'

const breakpoints = {
  xl: 1440,
  lg: 992,
  md: 768,
  sm: 480
} as const

const useWindowWidth = () => {
  const windowWidth = ref(window.innerWidth)

  const onWidthChange = () => {
    windowWidth.value = window.innerWidth
  }
  onMounted(() => window.addEventListener('resize', onWidthChange))
  onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  return {
    windowWidth: computed(() => windowWidth.value),
    breakpoints
  }
}

export default useWindowWidth
