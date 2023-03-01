import { ref, onMounted } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

const usePostEditor = () => {
  const route = useRoute()
  const router = useRouter()

  const isOpen = ref(false)

  onMounted(() => {
    isOpen.value = Object.keys(route.query).includes('post-editor')
  })

  onBeforeRouteUpdate((newRoute) => {
    isOpen.value = Object.keys(newRoute.query).includes('post-editor')
  })

  const openPostEditor = () => {
    router.push({ path: route.path, query: { 'post-editor': null } })
  }

  const closePostEditor = () => {
    router.push({ path: route.path })
  }

  return { isOpen, openPostEditor, closePostEditor }
}

export default usePostEditor
