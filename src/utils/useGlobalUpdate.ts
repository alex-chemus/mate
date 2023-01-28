import { useStore } from 'vuex'
import { computed } from 'vue'
import type { RootState } from '@/store/types'
import { updateActions } from '@/store/constants'

const useGlobalUpdate = () => {
  const store = useStore<RootState>()
  const globalUpdate = computed(() => store.state.update.update)

  const setGlobalUpdate = () => {
    store.commit(updateActions.SET_UPDATE)
  }

  return { globalUpdate, setGlobalUpdate }
}

export default useGlobalUpdate
