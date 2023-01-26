import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { Tab } from '../types'

const useTabs = () => {
  const route = useRoute()
  const router = useRouter()
  const currentTab = ref<Tab | null>(null)

  onMounted(() => {
    const hasSettings = Object.keys(route.query).includes('settings')

    if (!hasSettings) currentTab.value = null

    if (hasSettings && !route.query.settings)
      router.push({ path: `${route.path}`, query: { settings: 'general' } })

    switch (route.query.settings) {
      case 'general':
        currentTab.value = 'general'
        break

      case 'profile':
        currentTab.value = 'profile'
        break

      case 'privacy':
        currentTab.value = 'privacy'
        break

      case 'project':
        currentTab.value = 'project'
        break

      default:
        currentTab.value = null
    }
  })

  onBeforeRouteUpdate((newRoute, _) => {
    const hasSettings = Object.keys(newRoute.query).includes('settings')

    if (!hasSettings) {
      currentTab.value = null
      return true
    }

    console.log(newRoute.query.settings)

    if (hasSettings && !newRoute.query.settings)
      return { path: `${route.path}`, query: { settings: 'general' } }

    switch (newRoute.query.settings) {
      case 'general':
        currentTab.value = 'general'
        break

      case 'profile':
        currentTab.value = 'profile'
        break

      case 'privacy':
        currentTab.value = 'privacy'
        break

      case 'project':
        currentTab.value = 'project'
        break

      default:
        currentTab.value = null
    }

    return true
  })

  const toggleTabs = (tab: Tab | null) => {
    if (tab)
      router.push({ path: `${route.path}`, query: { settings: tab } })
    else
      router.push({ path: route.path })
  }

  const currentTitle = computed(() => {
    switch (currentTab.value) {
      case 'general':
        return 'Редактировать основную информацию'

      case 'profile':
        return 'Редактировать профиль'

      case 'project':
        return 'Редактировать профиль проекта'

      case 'privacy':
        return 'Безопасность'

      default:
        return null
    }
  })

  return { currentTab, toggleTabs, currentTitle }
}

export default useTabs
