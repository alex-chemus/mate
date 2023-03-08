import { ref } from 'vue'
import { useApiState, useAuthState, useDispatch } from '@/utils'
import { fetchActions } from '@/store/constants'
import { FullVacancyInfo } from '@/types'

const useView = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const viewUpdate = ref<symbol | null>(null)

  const view = async (vacancy: FullVacancyInfo) => {
    if (vacancy.isViewed) return

    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('projectVacancyID', vacancy.id.toString())

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projectVacancies.setAsViewed/`,
      info: { method: 'POST', body }
    })

    viewUpdate.value = Symbol()
  }

  return { view, viewUpdate }
}

export default useView
