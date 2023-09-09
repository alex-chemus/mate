import { useStore } from 'vuex'
import { RootState } from '@/store/types'
import { computed } from 'vue'

const useUserState = () => {
  const store = useStore<RootState>()
  const user = computed(() => store.state.user.info)

  return user
}

export default useUserState
