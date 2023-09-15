import { onMounted, ref } from 'vue'
import { fetchActions } from '@/store/constants'
import useAppStore from '@/store/useAppStore'

const useThemes = () => {
  const { apiState, authState, dispatch } = useAppStore()

  type Theme = { id: number, title: string }
  const themes = ref<Theme[] | null>(null)

  const fetchThemes = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projectVacancies.getThemesList/`,
      info: { method: 'POST', body },
      errorMessage: '[views/ProjectView/VacancyFormWidget/useThemes] Failed to fetch vacancies themes list'
    })) as Theme[]
  }

  onMounted(async () => {
    themes.value = await fetchThemes()
  })

  return themes
}

export default useThemes
