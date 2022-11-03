import { createStore } from 'vuex'
import { IState } from './types'

export default createStore<IState>({
  state: {
    theme: 'light'
  },

  mutations: {
    setTheme(state, value: 'dark' | 'light') {
      state.theme = value
    }
  }
})
