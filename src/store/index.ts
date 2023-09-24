import { createStore } from 'vuex'
import {
  apiModule, authModule, themeModule, fetchModule, refresherModule, alertModule, userModule
} from './modules'
import { RootState } from './types'

const store = createStore<RootState>({
  modules: {
    auth: authModule,
    theme: themeModule,
    api: apiModule,
    fetch: fetchModule,
    refresher: refresherModule,
    alert: alertModule,
    user: userModule
  }
})

export default store
