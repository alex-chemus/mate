import { FullAccount } from "@/shared/types"

export type AuthModuleState = {
  token: string | null,
}

export type ThemeModuleState = {
  theme: 'light' | 'dark'
}

export type ApiModuleState = {
  apiUrl: string,
  cloudUlr: string,
}

export type FetchModuleState = {
  errorCode: number | null,
  errorMsg: string | null
}

export type RefresherModuleState = {
  refresher: symbol,
  accountRefresher: symbol,
  projectsRefresher: symbol
}

export type AlertModuleState = {
  update: symbol,
  message: string | null,
  type: null | 'danger' | 'success'
}

export type UserModuleState = {
  info: FullAccount | null
}

export type RootState = {
  auth: AuthModuleState,
  theme: ThemeModuleState,
  api: ApiModuleState,
  fetch: FetchModuleState,
  refresher: RefresherModuleState,
  alert: AlertModuleState,
  user: UserModuleState
}
