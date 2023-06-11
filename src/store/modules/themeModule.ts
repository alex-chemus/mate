import type { Module } from 'vuex'
import type { ThemeModuleState, RootState } from '../types'
import { themeActions } from '../constants'

type Theme = 'dark' | 'light'

const themeModule: Module<ThemeModuleState, RootState> = {
  state: () => ({
    theme: 'light'
  }),

  mutations: {
    [themeActions.SET_THEME](state, value: Theme) {
      state.theme = value
    }
  },

  actions: {
    [themeActions.GET_DEFAULT_THEME]({ commit }) {
      const prefers = (theme: Theme) => {
        if (localStorage.getItem('theme'))
          return localStorage.getItem('theme') === theme
        return window.matchMedia(`(prefers-color-scheme: ${theme})`).matches
      }

      if (prefers('light'))
        commit(themeActions.SET_THEME, 'light')
      else if (prefers('dark'))
        commit(themeActions.SET_THEME, 'dark')
    }
  }
}

export default themeModule
