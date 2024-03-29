import { onMounted, ref } from 'vue'
import useAppStore from '@/store/useAppStore'
import { fetchActions } from '@/store/constants'
import { Theme } from '../types'

const useThemes = () => {
  const { apiState, authState, dispatch } = useAppStore()

  const themes = ref<Theme[] | null>(null)
  const selectedTheme = ref<Theme | null>(null)

  const fetchThemes = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projectVacancies.getThemesList/`,
      info: { method: 'POST', body },
      errorMessage: '[views/VacanciesView/useThemes] Failed to fetch vacancies themes list'
    })) as Theme[]
  }

  onMounted(async () => {
    themes.value = await fetchThemes()
  })

  return { themes, selectedTheme }
}

export default useThemes
