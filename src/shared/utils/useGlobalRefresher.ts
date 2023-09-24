import { useStore } from 'vuex'
import { computed } from 'vue'
import type { RootState } from '@/store/types'
import { refresherActions } from '@/store/constants'

const useGlobalRefresher = () => {
  const store = useStore<RootState>()

  const globalRefresher = computed(() => store.state.refresher.refresher)
  const globalAccountRefresher = computed(() => store.state.refresher.accountRefresher)
  const globalProjectsRefresher = computed(() => store.state.refresher.projectsRefresher)

  const refreshGlobal = () => {
    store.commit(refresherActions.REFRESH)
  }

  const refreshAccountGlobal = () => {
    store.commit(refresherActions.REFRESH_ACCOUNT)
  }

  const refreshProjectsGlobal = () => {
    store.commit(refresherActions.REFRESH_ACCOUNT)
  }

  return {
    globalRefresher,
    globalAccountRefresher,
    globalProjectsRefresher,
    refreshGlobal,
    refreshAccountGlobal,
    refreshProjectsGlobal
  }
}

export default useGlobalRefresher
