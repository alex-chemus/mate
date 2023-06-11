import { ref } from 'vue'

const useProject = () => {
  const name = ref<string | null>(null)
  const nametag = ref<string | null>(null)
  const theme = ref<number | null>(null)
  const description = ref<string | null>(null)

  return {
    name, nametag, theme, description
  }
}

export default useProject
