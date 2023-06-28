import { useStore } from 'vuex'
import type { RootState } from '@/store/types'

const useCommit = () => {
  const { commit } = useStore<RootState>()
  return commit
}

export default useCommit
