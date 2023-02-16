import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Tab } from '../types'

const useTabs = () => {
  const route = useRoute()
  const router = useRouter()

  const currentTab = computed<Tab>(() => {
    if (route.path.startsWith('/profile')) return 'profile'
    if (route.path.startsWith('/search-projects')) return 'search-vacancies'
    return null
  })

  const switchTabs = (p: Tab) => {
    console.log(p)

    switch (p) {
      case 'profile':
        router.push({ path: '/profile' })
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
