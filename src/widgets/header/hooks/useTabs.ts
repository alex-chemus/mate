import { computed, ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Tab } from '../types'

const useTabs = (id: ComputedRef<number | null>) => {
  const route = useRoute()
  const router = useRouter()

  const currentTab = computed<Tab>(() => {
    if (id.value && route.path.startsWith(`/user/${id.value}`)) return 'profile'
    if (route.path.startsWith('/search-projects')) return 'search-vacancies'
    return null
  })

  const switchTabs = (p: Tab) => {
    switch (p) {
      case 'profile':
        router.push({ path: `/user/${id.value}` })
        break;

      case 'search-vacancies':
        router.push({ path: '/search-vacancies' })
        break;

      default: break;
    }
  }

  return { currentTab, switchTabs }
}

export default useTabs
