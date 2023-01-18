import { useApiState, useAuthState, useDispatch } from '@/utils'
import { fetchActions } from '@/store/constants'
import type { ProjectInfo } from '../types'

const useFetchProjectInfo = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const body = new FormData()
  body.append('token', authState.value.token as string)

  return async (id: string) => {
    if (!authState.value.token) return null

    body.append('projectsIDs', id)

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/project.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    }))[0] as ProjectInfo
  }
}

export default useFetchProjectInfo
