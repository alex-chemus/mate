import { useApiState, useAuthState, useDispatch } from '@/utils'
import { fetchActions } from '@/store/constants'
import type { AccountInfo } from '../types'

const useFetchGetInfo = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const body = new FormData()
  body.append('token', authState.value.token as string)

  return async () => {
    /*const res = await fetch(`${apiState.value.apiUrl}/mate/account.getInfo/`, {
      method: 'POST',
      body
    })
    const data = await res.json()*/
    //return data.response as AccountInfo

    if (!authState.value.token) return null

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as AccountInfo
  }
}

export default useFetchGetInfo
