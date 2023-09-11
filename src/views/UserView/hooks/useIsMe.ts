import { ref } from 'vue'
import useAppStore from '@/store/useAppStore'
import { fetchActions } from '@/store/constants'

const useIsMe = () => {
  const { apiState, authState, dispatch } = useAppStore()

  const accountInfo = ref<{ findcreekID: number } | null>(null)

  const fetchAccountInfo = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('fields', 'findcreekID')

    accountInfo.value = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
      info: { method: 'POST', body },
      errorMessage: '[views/UserView/useIsMe] Failed to fetch account id'
    })) as { findcreekID: number }
  }

  const isMe = (id: number) => {
    if (!accountInfo.value) return undefined
    return id === accountInfo.value.findcreekID
  }

  return { fetchAccountInfo, isMe }
}

export default useIsMe
