import { ref, onMounted, watch } from 'vue'
import {
  useApiState, useAuthState, useDispatch, useUpdate
} from '@/utils'
import { fetchActions } from '@/store/constants'
import type { AccountInfo } from '../types'

const useAccountInfo = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { update } = useUpdate()

  const body = new FormData()
  body.append('token', authState.value.token as string)

  const fetchAccountInfo = async () => {
    if (!authState.value.token) return null

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as AccountInfo
  }

  const accountInfo = ref<AccountInfo | null>(null)

  onMounted(async () => {
    accountInfo.value = await fetchAccountInfo()
  })

  watch(update, async () => {
    accountInfo.value = await fetchAccountInfo()
  })

  return accountInfo
}

export default useAccountInfo
