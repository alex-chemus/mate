import type { Module } from 'vuex'
import type { RootState, UpdateModuleState } from '../types'
import { updateActions } from '../constants'

const updateModule: Module<UpdateModuleState, RootState> = {
  state: () => ({
    update: Symbol(),
    projectsUpdate: Symbol(),
    accountUpdate: Symbol()
  }),

  mutations: {
    [updateActions.SET_UPDATE](state) {
      state.update = Symbol()
    },

    [updateActions.SET_PROJECTS_UPDATE](state) {
      state.projectsUpdate = Symbol()
    },

    [updateActions.SET_ACCOUNT_UPDATE](state) {
      state.accountUpdate = Symbol()
    }
  }
}

export default updateModule
