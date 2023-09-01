import { useStore } from 'vuex'
import { RootState } from '@/store/types'
import { computed } from 'vue'
import { themeActions } from '@/store/constants'

const useTheme = () => {
  const { state, commit } = useStore<RootState>()

  const theme = computed(() => state.theme.theme)

  const toggleTheme = () => {
    if (theme.value === 'light') {
      localStorage.setItem('theme', 'dark')
      commit(themeActions.SET_THEME, 'dark')
    } else {
      localStorage.setItem('theme', 'light')
      commit(themeActions.SET_THEME, 'light')
    }
  }

  return { theme, toggleTheme }
}

export default useTheme
