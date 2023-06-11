import { ref, onMounted, watch } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate
} from '@/utils'
import { FullAccountInfo } from '@/types'

const useFullAccountInfo = () => {
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
      }
    })) as FullAccountInfo
  }

  const fullAccountInfo = ref<FullAccountInfo | null>(null)

  onMounted(async () => {
    fullAccountInfo.value = await fetchAccountInfo()
  })


  watch([globalUpdate, globalAccountUpdate, authState], async () => {
    fullAccountInfo.value = await fetchAccountInfo()
  })

  return fullAccountInfo
}

export default useFullAccountInfo
