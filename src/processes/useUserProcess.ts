import { onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useApiState, useAuthState, useDispatch } from '@/shared/utils'
import { fetchActions, userActions } from '@/store/constants'
import { RootState } from '@/store/types'
import { FullAccount } from '@/shared/types'

const useUserProcess = () => {
  const dispatch = useDispatch()
  const apiState = useApiState()
  const authState = useAuthState()
  const store = useStore<RootState>()

  const fetchUserID = async () => {
    if (!authState.value.token) return

    const body = new FormData()
    body.append('token', authState.value.token as string)

    const res = await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
      info: { body, method: 'POST' },
      errorMessage: '[processes/useUserProcess] Failed to fetch account info'
    })

    store.commit(userActions.SET_INFO, res as FullAccount)
  }

  onMounted(fetchUserID)
  watch(authState, fetchUserID)
}

export default useUserProcess
