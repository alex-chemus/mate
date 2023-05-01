export enum authActions {
  SET_FETCHED_TOKEN = 'AUTH__SET_FETCHED_TOKEN',
  SET_TOKEN = 'AUTH__SET_TOKEN',
  // SET_ERROR = 'AUTH__SET_ERROR',
  GET_LOCAL_TOKEN = 'AUTH__GET_LOCAL_TOKEN',
  FETCH_TOKEN = 'AUTH__FETCH_TOKEN'
}

export enum themeActions {
  SET_THEME = 'THEME__SET_THEME',
  GET_DEFAULT_THEME = 'THEME__GET_DEFAULT_THEME'
}

export enum fetchActions {
  SET_ERROR = 'FETCH__SET_ERROR',
  FETCH = 'FETCH__FETCH'
}

export enum updateActions {
  SET_UPDATE = 'SET_UPDATE',
  SET_ACCOUNT_UPDATE = 'SET_ACCOUNT_UPDATE',
  SET_PROJECTS_UPDATE = 'SET_PROJECTS_UPDATE'
}

export enum alertActions {
  SET_MESSAGE = 'SET_MESSAGE',
  SET_DANGER_MESSAGE = 'SET_DANGER_MESSAGE',
  SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE'
}

export enum userActions {
  SET_ID = 'SET_ID'
}
