import type { Module } from 'vuex'
import type { AuthModuleState, RootState } from '@/store/types'
import { authActions } from '../constants'

const authModule: Module<AuthModuleState, RootState> = {
  state: () => ({
    token: null
  }),

  mutations: {
    [authActions.SET_TOKEN](state, value: string) {
      state.token = value
      localStorage.setItem('token', state.token)
    }
  },

  actions: {
    [authActions.GET_LOCAL_TOKEN]({ commit }) {
      const token = localStorage.getItem('token')

      if (token === null) {
        const redirectPath = encodeURIComponent(`${window.location.protocol}//${window.location.hostname}/redirect`)
        const href = `
          https://id.findcreek.com/auth/?redirectTo=${redirectPath}&returnToken=true
        `
        window.location.href = href
        alert('Нет токена')
      } else if (token.trim().length > 0) {
        commit(authActions.SET_TOKEN, token)
      } else {
        alert('Ошибка авторизации') // eslint-disable-line
      }
    }
  }
}

export default authModule
