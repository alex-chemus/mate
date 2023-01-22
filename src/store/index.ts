import { createStore } from 'vuex'
import {
  apiModule, authModule, themeModule, fetchModule, updateModule
} from './modules'
import { RootState } from './types'

const store = createStore<RootState>({
  modules: {
    auth: authModule,
    theme: themeModule,
    api: apiModule,
    fetch: fetchModule,
    update: updateModule
  }
})

export default store
