import { onMounted, ref } from 'vue'
import { fetchActions } from '@/store/constants'
import { useApiState, useAuthState, useDispatch } from '@/utils'

const useThemes = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  type Theme = { id: number, title: string }
  const themes = ref<Theme[] | null>(null)

  const fetchThemes = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.getThemesList/`,
      info: { method: 'POST', body }
    })) as Theme[]
  }

  onMounted(async () => {
    themes.value = await fetchThemes()
  })

  return themes
}

export default useThemes
