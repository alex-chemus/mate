import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import { Tab } from '../types'
import useAccountInfo from './useAccount'

const useTabs = ({ account }: { account: ReturnType<typeof useAccountInfo> }) => {
  const route = useRoute()
  const router = useRouter()
  const currentTab = ref<Tab | null>(null)
  const projects = ref(account.value ? [
    ...account.value.projectsManagement.administrator,
    ...account.value.projectsManagement.editor,
    ...account.value.projectsManagement.founder
  ] : [])

  watch(account, () => {
    projects.value = account.value ? [
      ...account.value.projectsManagement.administrator,
      ...account.value.projectsManagement.editor,
      ...account.value.projectsManagement.founder
    ] : []
  })

  const hasProjects = computed(() => projects.value.length > 0)

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

        default:
          currentTab.value = null
      }
    }
  })

  router.beforeEach((newRoute) => {
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

        default:
          currentTab.value = null
      }
    }

    return true
  })

  const toggleTabs = (tab: Tab | null) => {
    if (tab) router.push({ path: `${route.path}`, query: { settings: tab } })
    else router.push({ path: route.path })
  }

  const currentTitle = computed(() => {
    switch (currentTab.value) {
      case 'general': return 'Редактировать основную информацию'
      case 'profile': return 'Редактировать профиль'
      case 'projects': return 'Редактировать профиль проекта'
      default: return null
    }
  })

  return {
    currentTab, toggleTabs, currentTitle, hasProjects
  }
}

export default useTabs
