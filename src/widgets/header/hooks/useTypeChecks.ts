import { KeyedSearchItem, KeyedProjectFields, KeyedUserFields } from '../types'

const useTypeChecks = () => {
  const isProject = (item: KeyedSearchItem): item is KeyedProjectFields => {
    return (item as KeyedProjectFields).name !== undefined
  }

  const isUser = (item: KeyedSearchItem): item is KeyedUserFields => {
    return (item as KeyedUserFields).findcreekID !== undefined
  }

  return { isProject, isUser }
}

export default useTypeChecks
