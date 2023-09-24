import { useStore } from "vuex"
import { RootState } from "./types"
import { computed } from "vue"

export default function useAppStore() {
  const store = useStore<RootState>()

  return {
    apiState: computed(() => store.state.api),
    authState: computed(() => store.state.auth),
    themeState: computed(() => store.state.theme),
    fetchState: computed(() => store.state.fetch),
    refresherState: computed(() => store.state.refresher),
    alertState: computed(() => store.state.alert),
    userState: computed(() => store.state.user.info),
    commit: store.commit,
    dispatch: store.dispatch
  }
}