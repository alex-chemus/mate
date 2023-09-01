import { watch } from 'vue'
import { useFetchState } from '@/shared/utils'
import { useRouter } from 'vue-router'

const useErrorsProcess = () => {
  const fetchState = useFetchState()
  const router = useRouter()

  watch(
    () => fetchState.value.errorCode,
    () => {
      if (fetchState.value.errorCode)
        router.push('/error')
    }
  )
}

export default useErrorsProcess
