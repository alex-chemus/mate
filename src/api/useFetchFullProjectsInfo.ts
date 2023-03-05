import { fetchActions } from '@/store/constants'
import { useApiState, useAuthState, useDispatch } from '@/utils'
import { FullProjectInfo } from '@/types'

const useFullProjectsInfo = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const fetchFullProjectsInfo = async (projectsIDs: number[]) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('projectsIDs', projectsIDs.join(', '))

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as FullProjectInfo[]
  }

  return fetchFullProjectsInfo
}

export default useFullProjectsInfo
