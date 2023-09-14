import useAppStore from '@/store/useAppStore'
import { fetchActions } from '@/store/constants'
import { FullUser } from '@/shared/types'

const useFetchFullUsers = (logErrorMessage?: string) => {
  const { apiState, authState, dispatch } = useAppStore()

  const fetchUsers = async (usersIDs: number[]) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('usersIDs', usersIDs.join(', '))

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/users.getInfo/`,
      info: { method: 'POST', body },
      errorMessage: logErrorMessage
    })) as FullUser[]
  }

  return fetchUsers
}

export default useFetchFullUsers
