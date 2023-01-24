import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, watch } from 'vue'

// const useSettings = () => {
//   const route = useRoute()
//   const router = useRouter()
//   const settingsOpen = ref(route.path.endsWith('settings'))

//   // watch(() => route.path, () => {
//   //   settingsOpen.value = route.path.endsWith('/settings')
//   // })

//   // onBeforeRouteUpdate((_, newRoute) => {
//   //   if (Object.keys(newRoute.query).includes('settings'))
//   // })

//   const toggleSettings = (value: boolean) => {
//     if (value)
//       router.push({ path: `${route.path}/settings` })
//     else
//       router.push({ path: route.path.split('/settings')[0] })
//   }

//   return { settingsOpen, toggleSettings }
// }

const useSettings = () => {
  const router = useRouter()
  const route = useRoute()

  const openSettings = () => {
    router.push({ path: `${route.path}`, query: { settings: 'general' } })
  }

  return { openSettings }
}

export default useSettings
