import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import {
  ref, onMounted, computed, watch
} from 'vue'
import { Tab } from '../types'
import useAccountInfo from './useAccountInfo'

const useTabs = ({ accountInfo }: { accountInfo: ReturnType<typeof useAccountInfo> }) => {
  const route = useRoute()
  const router = useRouter()
  const currentTab = ref<Tab | null>(null)
  const projects = ref(accountInfo.value ? [
    ...accountInfo.value.projectsManagement.administrator,
    ...accountInfo.value.projectsManagement.editor,
    ...accountInfo.value.projectsManagement.founder
  ] : [])

  watch(accountInfo, () => {
    projects.value = accountInfo.value ? [
      ...accountInfo.value.projectsManagement.administrator,
      ...accountInfo.value.projectsManagement.editor,
      ...accountInfo.value.projectsManagement.founder
    ] : []
  })

  const hasProjects = computed(() => projects.value.length > 0)
  console.log('has projects', hasProjects.value)
  console.log(projects.value)

  onMounted(() => {
    const hasSettings = Object.keys(route.query).includes('settings')

    if (!hasSettings) currentTab.value = null

    if (hasSettings && !route.query.settings)
      router.push({ path: `${route.path}`, query: { settings: 'general' } })

    if (hasProjects.value) {
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

        case 'projects':
          currentTab.value = 'projects'
          break

        default:
          currentTab.value = null
      }
    } else {
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

        default:
          currentTab.value = null
      }
    }
  })

  onBeforeRouteUpdate((newRoute) => {
    const hasSettings = Object.keys(newRoute.query).includes('settings')

    if (!hasSettings) {
      currentTab.value = null
      return true
    }


    if (hasSettings && !newRoute.query.settings)
      return { path: `${route.path}`, query: { settings: 'general' } }

    if (hasProjects.value) {
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

        case 'projects':
          currentTab.value = 'projects'
          break

        default:
          currentTab.value = null
      }
    } else {
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

        default:
          currentTab.value = null
      }
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

      case 'projects':
        return 'Редактировать профиль проекта'

      case 'privacy':
        return 'Безопасность'

      default:
        return null
    }
  })

  return {
    currentTab, toggleTabs, currentTitle, hasProjects
  }
}

export default useTabs
