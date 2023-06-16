import { useApiState, useAuthState, useDispatch } from '@/utils'
import { fetchActions } from '@/store/constants'
import { FullUser } from '@/types'

const useFetchFullUsers = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const fetchUsers = async (usersIDs: number[]) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('usersIDs', usersIDs.join(', '))

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/users.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as FullUser[]
  }

  return fetchUsers
}

export default useFetchFullUsers
