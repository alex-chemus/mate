import type { RootState } from '@/store/types'
import { useStore } from 'vuex'
import { computed } from 'vue'

const useAuthState = () => {
  const { state } = useStore<RootState>()
  const authState = computed(() => state.auth)

  return authState
}

export default useAuthState
