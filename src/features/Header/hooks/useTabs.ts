import { computed, ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Tab } from '../types'

const useTabs = ({ id }: { id: ComputedRef<number | null> }) => {
  const route = useRoute()
  const router = useRouter()

  const currentTab = computed<Tab>(() => {
    if (id.value && route.path.startsWith(`/user/${id.value}`)) return 'profile'
    if (route.path.startsWith('/vacancies')) return 'vacancies'
    if (route.path.startsWith('/projects-list')) return 'projects'
    if (route.path.startsWith('/feed')) return 'feed'
    return null
  })

  const switchTabs = (p: Tab) => {
    switch (p) {
      case 'profile':
        router.push({ path: `/user/${id.value}` })
        break;

      case 'vacancies':
        router.push({ path: '/vacancies' })
        break;

      case 'projects':
        router.push({ path: '/projects-list' })
        break

      case 'feed':
        router.push({ path: '/feed' })
        break

      default: break;
    }
  }

  return { currentTab, switchTabs }
}

export default useTabs
