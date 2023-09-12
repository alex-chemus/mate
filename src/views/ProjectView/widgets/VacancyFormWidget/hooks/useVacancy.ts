import { ref, Ref, ComputedRef } from 'vue'
import {
  useApiState, useAuthState, useDispatch, useAlert
} from '@/shared/utils'
import { fetchActions } from '@/store/constants'
import { FileInfo } from '@/shared/types'
import { IFile } from '../types'

const useVacancy = ({
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

  const disabled = ref(false)

  const isUploadingFile = ref<number | null>(null)

  const uploadFile = async (file: IFile) => {
    isUploadingFile.value = file.id

    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('files', file.fileInfo)

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.cloudUlr}/methods/cloud.uploadFiles/`,
      info: { method: 'POST', body },
      errorMessage: '[views/ProjectView/VacancyFormWidget/useVacancy] Failed to upload vacancy files'
    })) as FileInfo[]

    isUploadingFile.value = null
    return res[0]
  }

  const uploadFiles = async (files: IFile[]) => {
    disabled.value = true

    const res: number[] = []

    for (const file of files) {
      const fileInfo = await uploadFile(file)
      if (fileInfo) res.push(fileInfo.fileID)
    }

    disabled.value = false

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

  const uploadVacancy = async () => {
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
      info: { method: 'POST', body },
      errorMessage: '[views/ProjectView/VacancyFormWidget/useVacancy] Failed to create vacancy'
    })

    setSuccessMessage('Опубликовано')
  }

  return {
    name, description, themeID, skills, uploadVacancy, uploadFile, isUploadingFile, disabled
  }
}

export default useVacancy
