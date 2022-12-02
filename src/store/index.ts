import { createStore } from 'vuex'
import { IState } from './types'

export default createStore<IState>({
  state: {
    theme: 'light',
    token: null,
    apiUrl: 'https://api.findcreek.com'
  },

  mutations: {
    setTheme(state, value: 'dark' | 'light') {
      state.theme = value
    },

    setToken(state, value: string | null) {
      state.token = value
    }
  }
})
