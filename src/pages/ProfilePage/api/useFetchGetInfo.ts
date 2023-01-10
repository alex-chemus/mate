import { useApiState, useAuthState, validateToken } from '@/utils'
import type { AccountInfo } from '../types'

const useFetchGetInfo = () => {
  const apiState = useApiState()
  const authState = useAuthState()

  validateToken()

  const body = new FormData()
  body.append('token', authState.value.token as string)

  return async () => {
    const res = await fetch(`${apiState.value.apiUrl}/mate/account.getInfo/`, {
      method: 'POST',
      body
    })

    const data = await res.json()

    return data.response as AccountInfo
  }
}

export default useFetchGetInfo
