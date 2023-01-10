import { useStore } from 'vuex'
import { RootState } from '@/store/types'
import { computed } from 'vue'

const useTheme = () => {
  const { state } = useStore<RootState>()
  const theme = computed(() => state.theme.theme)

  return theme
}

export default useTheme
