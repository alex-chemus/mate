import { useStore } from 'vuex'
import { computed } from 'vue'
import type { RootState } from '@/store/types'
import { updateActions } from '@/store/constants'

const useGlobalUpdate = () => {
  const store = useStore<RootState>()

  const globalUpdate = computed(() => store.state.update.update)
  const globalAccountUpdate = computed(() => store.state.update.accountUpdate)
  const globalProjectsUpdate = computed(() => store.state.update.projectsUpdate)

  const setGlobalUpdate = () => {
    store.commit(updateActions.SET_UPDATE)
  }

  const setGlobalAccountUpdate = () => {
    store.commit(updateActions.SET_ACCOUNT_UPDATE)
  }

  const setGlobalProjectsUpdate = () => {
    store.commit(updateActions.SET_PROJECTS_UPDATE)
  }

  return {
    globalUpdate,
    globalAccountUpdate,
    globalProjectsUpdate,
    setGlobalUpdate,
    setGlobalAccountUpdate,
    setGlobalProjectsUpdate
  }
}

export default useGlobalUpdate
