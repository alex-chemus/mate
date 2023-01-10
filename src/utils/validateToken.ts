import useAuthState from './useAuthState'

const validateToken = () => {
  const authState = useAuthState()

  if (!authState.value.fetchedToken) {
    throw new Error('token has not been fetched')
  } else if (authState.value.isError) {
    throw new Error('token fetched with error')
  } else if (!authState.value.token) {
    throw new Error('invalid token')
  }
}

export default validateToken
