import {
  ref, onMounted, watch, computed
} from 'vue'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate
} from '@/utils'
import { FullAccountInfo } from '@/types'
import { fetchActions } from '@/store/constants'

const useAccountInfo = (props: Readonly<{
  fullAccountInfo?: FullAccountInfo
}>) => {
  if (props.fullAccountInfo) {
    return computed(() => props.fullAccountInfo)
  }

  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { globalUpdate, globalAccountUpdate } = useGlobalUpdate()

  // const fields = ['firstName', 'lastName', 'avatar', 'email']
  // body.append('fields', fields.join(', '))

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

  const accountInfo = ref<FullAccountInfo | null>(null)

  onMounted(async () => {
    accountInfo.value = await fetchAccountInfo()
  })

  watch([globalUpdate, globalAccountUpdate], async () => {
    accountInfo.value = await fetchAccountInfo()
  })

  return accountInfo
}

export default useAccountInfo
