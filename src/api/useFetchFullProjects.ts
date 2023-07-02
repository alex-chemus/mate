import { fetchActions } from '@/store/constants'
import { useApiState, useAuthState, useDispatch } from '@/shared/utils'
import { FullProject } from '@/shared/types'

const useFetchFullProjects = (logErrorMessage?: string) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const fetchFullProjects = async (projectsIDs: number[]) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('projectsIDs', projectsIDs.join(', '))

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.getInfo/`,
      info: { method: 'POST', body },
      errorMessage: logErrorMessage
    })) as FullProject[]
  }

  return fetchFullProjects
}

export default useFetchFullProjects
