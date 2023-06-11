import { useStore } from 'vuex'
import { RootState } from '@/store/types'
import { computed } from 'vue'
import { alertActions } from '@/store/constants'

const useAlert = () => {
  const store = useStore<RootState>()

  const update = computed(() => store.state.alert.update)
  const message = computed(() => store.state.alert.message)
  const type = computed(() => store.state.alert.type)

  const setMessage = (payload: string) => {
    store.commit(alertActions.SET_MESSAGE, payload)
  }

  const setDangerMessage = (payload: string) => {
    store.commit(alertActions.SET_DANGER_MESSAGE, payload)
  }

  const setSuccessMessage = (payload: string) => {
    store.commit(alertActions.SET_SUCCESS_MESSAGE, payload)
  }

  return {
    update, message, type, setMessage, setDangerMessage, setSuccessMessage
  }
}

export default useAlert
