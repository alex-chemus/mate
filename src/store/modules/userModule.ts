import type { Module } from 'vuex'
import type { UserModuleState, RootState } from '../types'
import { userActions } from '../constants'

const userModule: Module<UserModuleState, RootState> = {
  state: () => ({
    id: null
  }),

  mutations: {
    [userActions.SET_ID](state, value: number) {
      state.id = value
    }
  }
}

export default userModule
