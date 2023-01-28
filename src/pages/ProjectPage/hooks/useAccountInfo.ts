import { ref, onMounted, watch } from 'vue'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate
} from '@/utils'
import { fetchActions } from '@/store/constants'
import type { AccountInfo } from '../types'

const useAccountInfo = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { globalUpdate } = useGlobalUpdate()

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

  watch(globalUpdate, async () => {
    accountInfo.value = await fetchAccountInfo()
  })

  return accountInfo
}

export default useAccountInfo
