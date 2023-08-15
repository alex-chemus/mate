import type { Module } from 'vuex'
import type { ApiModuleState, RootState } from '@/store/types'

const apiModule: Module<ApiModuleState, RootState> = {
  state: () => ({
    apiUrl: process.env.VUE_APP_API_URL || 'https://t1.api.findcreek.com',
    cloudUlr: process.env.VUE_APP_CLOUD_URL || 'https://cloud.findcreek.com'
  })
}

export default apiModule
