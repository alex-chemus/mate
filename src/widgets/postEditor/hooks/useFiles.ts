import { ref, computed } from 'vue'
import { IFile } from '../types'

const useFiles = () => {
  const files = ref<IFile[] | null>(null)

  const addFiles = (payload: FileList) => {
    if (!files.value) files.value = []

    for (let i = 0; i < payload.length; i++) {
      files.value.push({
        fileInfo: payload[i],
        id: Date.now()
      } as IFile)
    }
  }

  const removeFiles = (payload: number[]) => {
    if (!files.value) return
    files.value = files.value.filter((f) => {
      return !payload.includes(f.id)
    })
  }

  // const getFileList = computed<FileList | null>(() => {
  //   if (!files.value) return null

  //   const fileList = new FileList()

  //   for (let i = 0; i < files.value.length; i++) {
  //     fileList[i] = files.value[i].fileInfo
  //   }

  //   return fileList
  // })

  const getFiles = computed<IFile[] | null>(() => files.value)

  return {
    addFiles, removeFiles, getFiles
  }
}

export default useFiles
