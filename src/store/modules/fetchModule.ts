import type { Module } from 'vuex'
import type { RootState, FetchModuleState } from '../types'
import { fetchActions } from '../constants'

const fetchModule: Module<FetchModuleState, RootState> = {
  state: () => ({
    errorCode: null,
    errorMsg: null
  }),

  mutations: {
    // eslint-disable-next-line
    [fetchActions.SET_ERROR](state, payload: { error_code: 3 | 4 | 5, error_msg: string }) {
      if (![3, 4, 5].includes(payload.error_code)) return

      if (payload.error_msg === 'Invalid token') {
        state.errorCode = payload.error_code
        state.errorMsg = 'Ошибка авторизации'
        return
      }

      state.errorCode = payload.error_code
      switch (payload.error_code) {
        case 3:
          state.errorMsg = 'Нет прав для выполнения этого действия'
          break

        case 4:
          state.errorMsg = 'Один или несколько переданных параметров неверные'
          break

        default:
          state.errorMsg = 'Запрос не может быть выполнен'
      }
    }
  },

  actions: {
    async [fetchActions.FETCH]({ commit }, payload: { url: string, info: RequestInit | undefined }) {
      const res = await fetch(payload.url, payload.info)

      type Data = {
        error?: {
          /* eslint-disable */
          error_code: 3 | 4 | 5,
          error_msg: string
          /* eslint-enable */
        },
        [index: string]: any
      }

      const data = (await res.json()) as Data

      if (data.error) {
        commit(fetchActions.SET_ERROR, data.error)
        return null
      }

      return data.response
    }
  }
}

export default fetchModule
