import useAppStore from '@/store/useAppStore'
import { fetchActions } from '@/store/constants'

type Fields = {
  [index: string]: string
}

export default function useFetchApi() {
  const { apiState, authState, dispatch } = useAppStore()

  return async (method: string, fields: Fields = {}) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    Object.keys(fields).forEach(key => {
      body.append(key, fields[key])
    })

    return await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/${method}/`,
      info: { method: 'POST', body }
    })
  }
}