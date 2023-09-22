import { ref, ComputedRef } from 'vue'
import { FileInfo } from '@/shared/types'

const useViewer = (
  { getImages }:
  { getImages: ComputedRef<FileInfo[]> }
) => {
  const viewImage = ref<{
    file: FileInfo,
    i: number
  } | null>(null)

  const prevImage = () => {
    if (viewImage.value === null) return
    if (viewImage.value.i === 0) return

    viewImage.value = {
      file: getImages.value[viewImage.value.i - 1],
      i: viewImage.value.i - 1
    }
  }

  const nextImage = () => {
    if (viewImage.value === null) return
    if (viewImage.value.i === getImages.value.length - 1) return

    viewImage.value = {
      file: getImages.value[viewImage.value.i + 1],
      i: viewImage.value.i + 1
    }
  }

  return { viewImage, nextImage, prevImage }
}

export default useViewer
