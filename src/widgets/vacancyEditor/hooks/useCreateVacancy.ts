import { ref, Ref, ComputedRef } from 'vue'
import {
  useApiState, useAuthState, useDispatch, useAlert
} from '@/utils'
import { fetchActions } from '@/store/constants'
import { FileInfo } from '@/types'
import { IFile } from '../types'

const useCreateVacancy = ({
  getFiles, projectID
}: {
  getFiles: ComputedRef<IFile[] | null> | Ref<IFile[] | null>,
  projectID: number
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { setDangerMessage, setSuccessMessage } = useAlert()

  const name = ref<string | null>(null)
  const description = ref<string | null>(null)
  const themeID = ref<number | null>(null)
  const skills = ref<string[]>([])

  const uploadingFile = ref<number | null>(null)

  const uploadFile = async (file: IFile) => {
    uploadingFile.value = file.id

    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('files', file.fileInfo)

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.cloudUlr}/methods/cloud.uploadFiles/`,
      info: { method: 'POST', body }
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

  const checkData = () => {
    if (name.value === null || name.value === '') {
      setDangerMessage('Введите заголовок вакансии')
      return
    }

    if (description.value === null || description.value === '') {
      setDangerMessage('Введите описание вакансии')
    }
  }

  const createVacancy = async () => {
    checkData()

    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('projectID', projectID.toString())
    body.append('title', name.value!)
    body.append('description', description.value!)

    if (skills.value)
      body.append('skills', skills.value.join(', '))

    if (getFiles.value) {
      const fileIDs = await uploadFiles(getFiles.value)
      body.append('media', fileIDs.join(', '))
    }

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projectVacancies.create/`,
      info: { method: 'POST', body }
    })

    setSuccessMessage('Опубликовано')
  }

  return {
    name, description, themeID, skills, createVacancy, uploadFile, uploadingFile
  }
}

export default useCreateVacancy
