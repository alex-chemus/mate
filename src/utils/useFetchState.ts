import type { RootState } from '@/store/types'
import { useStore } from 'vuex'
import { computed } from 'vue'

const useFetchState = () => {
  const { state } = useStore<RootState>()
  const fetchState = computed(() => state.fetch)

  return fetchState
}

export default useFetchState
