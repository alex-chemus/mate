import type { Module } from 'vuex'
import type { ApiModuleState, RootState } from '@/store/types'

const apiModule: Module<ApiModuleState, RootState> = {
  state: () => ({
    apiUrl: 'https://api.findcreek.com',
    cloudUlr: 'https://cloud.findcreek.com'
  })
}

export default apiModule
