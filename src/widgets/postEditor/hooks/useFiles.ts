import { ref, computed } from 'vue'
import { IFile } from '../types'

const useFiles = () => {
  const files = ref<IFile[] | null>(null)

  const addFiles = (payload: FileList) => {
    if (!files.value) files.value = []

    for (let i = 0; i < payload.length; i++) {
      setTimeout(() => {
        files.value!.push({
          fileInfo: payload[i],
          id: Date.now()
        } as IFile)
      }, 1)
    }
  }

  const removeFiles = (payload: number[]) => {
    if (!files.value) return
    files.value = files.value.filter((f) => {
      return !payload.includes(f.id)
    })
  }

  const getFiles = computed<IFile[] | null>(() => files.value)

  return {
    addFiles, removeFiles, getFiles
  }
}

export default useFiles
