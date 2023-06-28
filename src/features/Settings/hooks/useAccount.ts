import { ref, onMounted, watch } from 'vue'
import { FullAccount } from '@/shared/types'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate
} from '@/shared/utils'
import { fetchActions } from '@/store/constants'

const useAccount = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { globalUpdate, globalAccountUpdate } = useGlobalUpdate()

  const fetchAccountInfo = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
      info: {
        method: 'POST',
        body
      },
      errorMessage: '[features/Settings/useAccount] Failed to fetch account info'
    })) as FullAccount
  }

  const account = ref<FullAccount | null>(null)

  onMounted(async () => {
    account.value = await fetchAccountInfo()
  })

  watch([globalUpdate, globalAccountUpdate, authState], async () => {
    account.value = await fetchAccountInfo()
  })

  return account
}

export default useAccount
