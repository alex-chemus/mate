import type { Module } from 'vuex'
import type { AuthModuleState, RootState } from '@/store/types'
import { authActions } from '../constants'

const authModule: Module<AuthModuleState, RootState> = {
  state: () => ({
    token: null,
    isError: false,
    errorMessage: null,
    fetchedToken: false
  }),

  mutations: {
    [authActions.SET_TOKEN](state, value: string) {
      state.token = value
    },

    [authActions.SET_FETCHED_TOKEN](state, value: boolean) {
      state.fetchedToken = value
    },

    [authActions.SET_ERROR](state, value: string) {
      state.isError = true
      state.errorMessage = value
    }
  },

  actions: {
    [authActions.GET_LOCAL_TOKEN]({ commit }) {
      const token = localStorage.getItem('token')

      if (token === null) {
        // todo later
        commit(authActions.SET_ERROR, 'Не найден локальный токен')
      } else if (token.trim().length > 0) {
        commit(authActions.SET_TOKEN, token)
      } else {
        // todo later
        commit(authActions.SET_ERROR, 'Не найден локальный токен')
      }

      commit(authActions.SET_FETCHED_TOKEN, true)
    },

    async [authActions.FETCH_TOKEN]({ commit, rootState }, payload: { login: string, password: string }) {
      if (!payload.login.trim() || !payload.password.trim()) return

      console.log('fetch token')

      const body = new FormData();
      body.append('login', payload.login)
      body.append('password', payload.password)

      try {
        const res = await fetch(`${rootState.api.apiUrl}/id/auth.getToken/`, {
          method: 'POST',
          body
        })

        const data = await res.json()

        commit(authActions.SET_TOKEN, data.response)
        localStorage.setItem('token', data.response)
      } catch (e) {
        commit(authActions.SET_ERROR, 'Неверный запрос токена')
      }
    }
  }
}

export default authModule
