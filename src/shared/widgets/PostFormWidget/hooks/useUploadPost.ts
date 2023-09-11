import { ComputedRef, ref, computed } from 'vue'
import { useAlert } from '@/shared/utils'
import useAppStore from '@/store/useAppStore'
import { fetchActions } from '@/store/constants'
import { FileInfo } from '@/shared/types'
import { IFile } from '../types'

const useUploadPost = ({
  id, getFiles, type, onAdd
}: {
  type: 'user' | 'project'
  id?: number,
  getFiles: ComputedRef<IFile[] | null>,
  onAdd: () => void
}) => {
  const { apiState, authState, dispatch } = useAppStore()
  const { setSuccessMessage } = useAlert()

  const title = ref<string | null>(null)
  const getTitle = computed(() => title.value)
  const setTitle = (s: string) => {
    if (s.length > 255) title.value = s.slice(0, 255)
    else title.value = s
  }

  const description = ref<string | undefined>(undefined)
  const uploadingFile = ref<number | null>(null)

  const uploadFile = async (file: IFile) => {
    uploadingFile.value = file.id

    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('files', file.fileInfo)

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.cloudUlr}/methods/cloud.uploadFiles/`,
      info: { method: 'POST', body },
      errorMessage: '[widgets/PostFormWidget/useUplaodPosts] Failed to upload post files'
    })) as FileInfo[]

    uploadingFile.value = null
    return res[0]
  }

  const uploadFiles = async (files: IFile[]) => {
    const res: number[] = []

    /* eslint-disable */
    for (const file of files) {
      const fileInfo = await uploadFile(file)
      if (fileInfo) res.push(fileInfo.fileID)
    }
    /* eslint-enable */

    return res
  }

  const uploadPost = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    if (title.value) body.append('title', title.value)
    if (description.value) body.append('description', description.value)
    if (id && type === 'project') body.append('projectID', id.toString())

    if (getFiles.value) {
      const fileIDs = await uploadFiles(getFiles.value)
      body.append('media', fileIDs.join(', '))
    }

    if (type === 'project') {
      await dispatch(fetchActions.FETCH, {
        url: `${apiState.value.apiUrl}/mate/projectPosts.create/`,
        info: { method: 'POST', body },
        errorMessage: '[widgets/PostFormWidget/useUplaodPosts] Failed to create project post'
      })
      //setGlobalProjectsUpdate()
    } else {
      await dispatch(fetchActions.FETCH, {
        url: `${apiState.value.apiUrl}/mate/userPosts.create/`,
        info: { method: 'POST', body },
        errorMessage: '[widgets/PostFormWidget/useUplaodPosts] Failed to create user post'
      })
      //setGlobalAccountUpdate()
    }

    onAdd()
    setSuccessMessage('Опубликовано')
  }

  return {
    setTitle, getTitle, description, uploadPost, uploadingFile
  }
}

export default useUploadPost
