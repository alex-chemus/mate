import { Module } from 'vuex'
import { AlertModuleState, RootState } from '../types'
import { alertActions } from '../constants'

const alertModule: Module<AlertModuleState, RootState> = {
  state: () => ({
    update: Symbol(),
    message: null,
    type: null
  }),

  mutations: {
    [alertActions.SET_MESSAGE](state, payload: string) {
      state.update = Symbol()
      state.message = payload
      state.type = null
    },

    [alertActions.SET_DANGER_MESSAGE](state, payload: string) {
      state.update = Symbol()
      state.message = payload
      state.type = 'danger'
    },

    [alertActions.SET_SUCCESS_MESSAGE](state, payload: string) {
      state.update = Symbol()
      state.message = payload
      state.type = 'success'
    }
  }
}

export default alertModule
