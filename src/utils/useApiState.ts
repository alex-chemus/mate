import { useStore } from 'vuex'
import type { RootState } from '@/store/types'
import { computed } from 'vue'

const useApiState = () => {
  const store = useStore<RootState>()
  const api = computed(() => store.state.api)

  return api
}

export default useApiState
