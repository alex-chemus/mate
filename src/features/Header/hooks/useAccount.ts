import { ref, onMounted, watch } from 'vue'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate
} from '@/utils'
import { fetchActions } from '@/store/constants'
import { Account } from '../types'

const useAccount = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { globalUpdate, globalAccountUpdate } = useGlobalUpdate()

  const fetchAccountInfo = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    const fields = ['firstName', 'lastName', 'avatar', 'email', 'findcreekID']
    body.append('fields', fields.join(', '))

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as Account
  }

  const account = ref<Account | null>(null)

  onMounted(async () => {
    account.value = await fetchAccountInfo()
  })

  watch([globalUpdate, globalAccountUpdate], async () => {
    account.value = await fetchAccountInfo()
  })

  return account
}

export default useAccount