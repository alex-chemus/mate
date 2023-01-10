export type AuthModuleState = {
  token: string | null,
  isError: boolean,
  errorMessage: string | null
  fetchedToken: boolean
}

export type ThemeModuleState = {
  theme: 'light' | 'dark'
}

export type ApiModuleState = {
  apiUrl: 'https://api.findcreek.com'
}

export type RootState = {
  auth: AuthModuleState,
  theme: ThemeModuleState,
  api: ApiModuleState
}
