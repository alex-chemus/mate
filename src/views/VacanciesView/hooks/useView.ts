import { ref } from 'vue'
import useAppStore from '@/store/useAppStore'
import { fetchActions } from '@/store/constants'
import { FullVacancy } from '@/shared/types'

const useView = () => {
  const { apiState, authState, dispatch } = useAppStore()

  const viewUpdate = ref<symbol | null>(null)

  const view = async (vacancy: FullVacancy) => {
    if (vacancy.isViewed) return

    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('projectVacancyID', vacancy.id.toString())

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projectVacancies.setAsViewed/`,
      info: { method: 'POST', body },
      errorMessage: '[views/VacanciesView/useView] Failed to set vacancy as viewed'
    })

    viewUpdate.value = Symbol()
  }

  return { view, viewUpdate }
}

export default useView
