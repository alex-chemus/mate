import { ref, onMounted, watch } from 'vue'
import { fetchActions } from '@/store/constants'
import useApiState from './useApiState'
import useAuthState from './useAuthState'
import useDispatch from './useDispatch'
import useUpdate from './useUpdate'
import type { FullAccountInfo } from './types'

const useFullAccountInfo = () => {
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
    })) as FullAccountInfo
  }

  const fullAccountInfo = ref<FullAccountInfo | null>(null)

  onMounted(async () => {
    fullAccountInfo.value = await fetchAccountInfo()
  })

  watch(update, async () => {
    fullAccountInfo.value = await fetchAccountInfo()
  })

  return fullAccountInfo
}

export default useFullAccountInfo
