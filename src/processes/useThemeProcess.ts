import { watch, onMounted } from 'vue'
import { themeActions } from '@/store/constants'
import { useTheme, useDispatch } from '@/utils'

const useThemeProcess = () => {
  const { theme } = useTheme()
  const dispatch = useDispatch()

  const changeTheme = () => {
    const root = document.querySelector(':root') as HTMLElement
    const app = document.getElementById('app') as HTMLElement

    if (theme.value === 'light') {
      root.dataset.theme = 'light'
      app.className = 'light'
    } else {
      root.dataset.theme = 'dark'
      app.className = 'dark'
    }
  }

  watch(theme, changeTheme)

  onMounted(() => {
    dispatch(themeActions.GET_DEFAULT_THEME)
    changeTheme()
  })
}

export default useThemeProcess
