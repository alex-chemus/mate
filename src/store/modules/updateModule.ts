import type { Module } from 'vuex'
import type { RootState, UpdateModuleState } from '../types'
import { updateActions } from '../constants'

const updateModule: Module<UpdateModuleState, RootState> = {
  state: () => ({
    update: Symbol()
  }),

  mutations: {
    [updateActions.SET_UPDATE](state) {
      state.update = Symbol()
    }
  }
}

export default updateModule
