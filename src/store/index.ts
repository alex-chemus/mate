import { createStore } from 'vuex'
import {
  apiModule, authModule, themeModule, fetchModule
} from './modules'
import { RootState } from './types'

const store = createStore<RootState>({
  modules: {
    auth: authModule,
    theme: themeModule,
    api: apiModule,
    fetch: fetchModule
  }
})

export default store
