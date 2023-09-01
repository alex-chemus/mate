export type AuthModuleState = {
  token: string | null,
}

export type ThemeModuleState = {
  theme: 'light' | 'dark'
}

export type ApiModuleState = {
  apiUrl: string,
  cloudUlr: string
}

export type FetchModuleState = {
  errorCode: number | null,
  errorMsg: string | null
}

export type UpdateModuleState = {
  update: symbol,
  accountUpdate: symbol,
  projectsUpdate: symbol
}

export type AlertModuleState = {
  update: symbol,
  message: string | null,
  type: null | 'danger' | 'success'
}

export type UserModuleState = {
  id: number | null
}

export type RootState = {
  auth: AuthModuleState,
  theme: ThemeModuleState,
  api: ApiModuleState,
  fetch: FetchModuleState,
  update: UpdateModuleState,
  alert: AlertModuleState,
  user: UserModuleState
}
