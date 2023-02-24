import {
  useApiState, useAuthState, useDispatch, FullUserInfo
} from '@/utils'
import { fetchActions } from '@/store/constants'

const useFetchFullUsersInfo = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const fetchUsersInfo = async (usersIDs: number[]) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('usersIDs', usersIDs.join(', '))

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/users.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as FullUserInfo[]
  }

  return fetchUsersInfo
}

export default useFetchFullUsersInfo
