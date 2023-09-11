import type { Module } from 'vuex'
import { FullAccount } from '@/shared/types'
import type { UserModuleState, RootState } from '../types'
import { userActions } from '../constants'

const userModule: Module<UserModuleState, RootState> = {
  state: () => ({
    info: null
  }),

  mutations: {
    [userActions.SET_INFO](state, value: FullAccount) {
      state.info = value
    }
  }
}

export default userModule
