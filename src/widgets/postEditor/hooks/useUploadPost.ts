import { ComputedRef, ref, computed } from 'vue'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate, FileInfo
} from '@/utils'
import { fetchActions } from '@/store/constants'
import { IFile } from '../types'

const useUploadPost = ({
  type, id, getFiles
}: {
  type: 'user' | 'project'
  id: number,
  getFiles: ComputedRef<IFile[] | null>
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { setGlobalProjectsUpdate } = useGlobalUpdate()

  const title = ref<string | null>(null)
  const getTitle = computed(() => title.value)
  const setTitle = (s: string) => {
    if (s.length > 255) title.value = s.slice(0, 255)
    else title.value = s
  }

  const description = ref<string | undefined>(undefined)

  const uploadFiles = async (files: IFile[]) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('files', files[0].fileInfo) // по временной схеме

    const res = await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.cloudUlr}/methods/cloud.uploadFiles/`,
      info: {
        method: 'POST',
        body
      }
    }) as FileInfo[]

    return res.map((f) => f.fileID)
  }

  const uploadPost = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    if (title.value) body.append('title', title.value)
    if (description.value) body.append('description', description.value)
    if (id) body.append('projectID', id.toString())

    if (getFiles.value) {
      const fileIDs = await uploadFiles(getFiles.value)
      body.append('media', fileIDs.join(', '))
    }

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projectPosts.create/`,
      info: {
        method: 'POST',
        body
      }
    })

    setGlobalProjectsUpdate()
  }

  return {
    setTitle, getTitle, description, uploadPost
  }
}

export default useUploadPost
