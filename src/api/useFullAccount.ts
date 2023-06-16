import { ref, onMounted, watch } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate
} from '@/utils'
import { FullAccount } from '@/types'

const useFullAccount = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { globalUpdate, globalAccountUpdate } = useGlobalUpdate()

  const fetchAccount = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as FullAccount
  }

  const fullAccount = ref<FullAccount | null>(null)

  onMounted(async () => {
    fullAccount.value = await fetchAccount()
  })


  watch([globalUpdate, globalAccountUpdate, authState], async () => {
    fullAccount.value = await fetchAccount()
  })

  return fullAccount
}

export default useFullAccount
