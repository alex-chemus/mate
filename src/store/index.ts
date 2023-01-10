import { createStore } from 'vuex'
import { apiModule, authModule, themeModule } from './modules'
import { RootState } from './types'

const store = createStore<RootState>({
  modules: {
    auth: authModule,
    theme: themeModule,
    api: apiModule
  }
})

export default store
