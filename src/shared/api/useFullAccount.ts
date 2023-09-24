import { ref, onMounted, watch } from 'vue'
import { fetchActions } from '@/store/constants'
import { useGlobalRefresher } from '@/shared/utils'
import useAppStore from '@/store/useAppStore'
import { FullAccount } from '@/shared/types'

const useFullAccount = (logErrorMessage?: string) => {
  const { apiState, authState, dispatch } = useAppStore()
  const { globalRefresher, globalAccountRefresher } = useGlobalRefresher()

  const fetchAccount = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
      info: { method: 'POST', body },
      errorMessage: logErrorMessage
    })) as FullAccount
  }

  const fullAccount = ref<FullAccount | null>(null)

  onMounted(async () => {
    fullAccount.value = await fetchAccount()
  })


  watch([globalRefresher, globalAccountRefresher, authState], async () => {
    fullAccount.value = await fetchAccount()
  })

  return fullAccount
}

export default useFullAccount
