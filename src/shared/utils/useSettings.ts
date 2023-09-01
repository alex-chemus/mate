import { useRoute, useRouter } from 'vue-router'
import { Tab } from '@/features/Settings/types'

const useSettings = () => {
  const router = useRouter()
  const route = useRoute()

  const openSettings = (settings?: Tab) => {
    router.push({ path: `${route.path}`, query: { settings: settings ?? 'general' } })
  }

  return { openSettings }
}

export default useSettings
