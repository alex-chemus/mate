import { ref, onMounted, watch } from 'vue'
import useAppStore from '@/store/useAppStore'
import { useGlobalRefresher } from '@/shared/utils'
import { fetchActions } from '@/store/constants'
import { Account } from '../types'

const useAccount = () => {
  const { apiState, authState, dispatch } = useAppStore()
  const { globalRefresher, globalAccountRefresher } = useGlobalRefresher()

  const fetchAccountInfo = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    const fields = ['firstName', 'lastName', 'avatar', 'email', 'findcreekID', 'textID']
    body.append('fields', fields.join(', '))

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
      info: {
        method: 'POST',
        body
      },
      errorMessage: '[features/Header/useAccount] Failed to fetch account info'
    })) as Account
  }

  const account = ref<Account | null>(null)

  onMounted(async () => {
    account.value = await fetchAccountInfo()
  })

  watch([globalRefresher, globalAccountRefresher], async () => {
    account.value = await fetchAccountInfo()
  })

  return account
}

export default useAccount
