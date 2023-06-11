import { ref, onMounted } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

const useUrlWatcher = () => {
  const route = useRoute()
  const router = useRouter()
  const isOpen = ref(false)

  onMounted(() => {
    isOpen.value = Object.keys(route.query).includes('vacancy-editor')
  })

  onBeforeRouteUpdate((newRoute) => {
    isOpen.value = Object.keys(newRoute.query).includes('vacancy-editor')
  })

  const close = () => {
    router.push({ path: route.path })
  }

  return { isOpen, close }
}

export default useUrlWatcher
