export enum authActions {
  SET_TOKEN = 'AUTH__SET_TOKEN',
  GET_LOCAL_TOKEN = 'AUTH__GET_LOCAL_TOKEN',
  REDIRECT = 'AUTH__REDIRECT'
}

export enum themeActions {
  SET_THEME = 'THEME__SET_THEME',
  GET_DEFAULT_THEME = 'THEME__GET_DEFAULT_THEME'
}

export enum fetchActions {
  SET_ERROR = 'FETCH__SET_ERROR',
  FETCH = 'FETCH__FETCH'
}

export enum refresherActions {
  REFRESH = 'REFRESH',
  REFRESH_ACCOUNT = 'REFRESH_ACCOUNT',
  REFRESH_PROJECTS = 'REFRESH_PROJECTS'
}

export enum alertActions {
  SET_MESSAGE = 'SET_MESSAGE',
  SET_DANGER_MESSAGE = 'SET_DANGER_MESSAGE',
  SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE'
}

export enum userActions {
  SET_INFO = 'SET_INFO',
}
