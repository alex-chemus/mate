import { useApiState, useAuthState, useDispatch } from '@/utils'
import { fetchActions } from '@/store/constants'
import type { ProjectInfo } from '../types'

const useFetchProjectsInfo = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const body = new FormData()
  body.append('token', authState.value.token as string)

  return async (projectsIds: number[] | string[]) => {
    if (!authState.value.token) return null

    console.log(projectsIds.join(', '))
    body.append('projectsIDs', projectsIds.join(', '))

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/project.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as ProjectInfo[]
  }
}

export default useFetchProjectsInfo
