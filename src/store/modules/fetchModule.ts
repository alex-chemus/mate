import type { Module } from 'vuex'
import type { RootState, FetchModuleState } from '../types'
import { fetchActions, authActions } from '../constants'

type SetErrorPayload = {
  logError?: string,
  fetchError: {
    error_code: 3 | 4 | 5, // eslint-disable-line
    error_msg: string // eslint-disable-line
  }
}

const fetchModule: Module<FetchModuleState, RootState> = {
  state: () => ({
    errorCode: null,
    errorMsg: null
  }),

  actions: {
    async [fetchActions.SET_ERROR]({ dispatch, state }, { logError, fetchError }: SetErrorPayload) {
      if (![3, 4, 5].includes(fetchError.error_code)) return

      if (fetchError.error_msg === 'Invalid token' && process.env.NODE_ENV !== "development" ) {
        // state.errorCode = fetchError.error_code
        // state.errorMsg = 'Ошибка авторизации'
        dispatch(authActions.REDIRECT)
        return
      }

      state.errorCode = fetchError.error_code
      switch (fetchError.error_code) {
        case 3:
          state.errorMsg = 'Нет прав для выполнения этого действия'
          break

        case 4:
          state.errorMsg = 'Один или несколько переданных параметров неверные'
          break

        default:
          state.errorMsg = 'Запрос не может быть выполнен'
      }

      if (logError) console.error(logError) // eslint-disable-line
    },

    async [fetchActions.FETCH]({ dispatch }, payload: {
      url: string,
      info: RequestInit | undefined,
      errorMessage?: string
    }) {
      const res = await fetch(payload.url, payload.info)

      type Data = {
        error?: {
          /* eslint-disable */
          error_code: 3 | 4 | 5,
          error_msg: string
          /* eslint-enable */
        },
        [index: string]: any
      } | any[]

      const data = (await res.json()) as Data

      if (!Array.isArray(data) && data.error) {
        dispatch(fetchActions.SET_ERROR, {
          fetchError: data.error,
          logError: payload.errorMessage
        } as SetErrorPayload)
        return null
      }

      return Array.isArray(data) ? data : data.response
    }
  }
}

export default fetchModule
