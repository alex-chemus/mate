import useAppStore from "@/store/useAppStore"
import { fetchActions } from "@/store/constants"
import { FileInfo } from "../types"

export default function useCloudApi() {
  const { apiState, authState, dispatch } = useAppStore()

  const setFile = async (file: File) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('files', file)

    return await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.cloudUlr}/methods/cloud.uploadFiles/`,
      info: { method: 'POST', body },
    }) as FileInfo[]
  }

  const getFiles = async (ids: number[]) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('filesIDs', ids.join(', '))

    return await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.cloudUlr}/methods/cloud.getFilesInfo/`,
      info: { method: 'POST', body },
    }) as FileInfo[]
  }

  return { setFile, getFiles }
}