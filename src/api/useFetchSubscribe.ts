import { useApiState, useAuthState, useDispatch } from '@/utils'
import { fetchActions } from '@/store/constants'

const useFetchSubscribe = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const fetchSubscribe = async (type: 'user' | 'project', id: number) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    if (type === 'user') body.append('userID', id.toString())
    else body.append('projectID', id.toString())

    //body.append('userID', userID.toString())
    const reqType = type === 'user' ? 'users' : 'projects'

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/${reqType}.subscribe/`,
      info: {
        method: 'POST',
        body
      }
    })
  }

  const fetchUnsubscribe = async (type: 'user' | 'project', id: number) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    if (type === 'user') body.append('userID', id.toString())
    else body.append('projectID', id.toString())

    //body.append('userID', userID.toString())
    const reqType = type === 'user' ? 'users' : 'projects'

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/${reqType}.unsubscribe/`,
      info: {
        method: 'POST',
        body
      }
    })
  }

  return { fetchSubscribe, fetchUnsubscribe }
}

export default useFetchSubscribe
