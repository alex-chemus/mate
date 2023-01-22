import { useStore } from 'vuex'
import { computed } from 'vue'
import type { RootState } from '@/store/types'
import { updateActions } from '@/store/constants'

const useUpdate = () => {
  const store = useStore<RootState>()
  const update = computed(() => store.state.update.update)

  const setUpdate = () => {
    store.commit(updateActions.SET_UPDATE)
  }

  return { update, setUpdate }
}

export default useUpdate
