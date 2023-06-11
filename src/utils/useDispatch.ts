import { useStore } from 'vuex'
import type { RootState } from '@/store/types'

const useDispatch = () => {
  const { dispatch } = useStore<RootState>()
  return dispatch
}

export default useDispatch
