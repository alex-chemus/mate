import type { Module } from 'vuex'
import type { RootState, RefresherModuleState } from '../types'
import { refresherActions } from '../constants'

const updateModule: Module<RefresherModuleState, RootState> = {
  state: () => ({
    refresher: Symbol(),
    projectsRefresher: Symbol(),
    accountRefresher: Symbol()
  }),

  mutations: {
    [refresherActions.REFRESH](state) {
      state.refresher = Symbol()
    },

    [refresherActions.REFRESH_PROJECTS](state) {
      state.projectsRefresher = Symbol()
    },

    [refresherActions.REFRESH_ACCOUNT](state) {
      state.accountRefresher = Symbol()
    }
  }
}

export default updateModule
