import { computed } from "vue";
import { useRoute } from "vue-router";
import { useUserState } from "@/shared/utils";

type Tab = "profile" | "vacancies" | "projects" | "search" | "settings"

export default function useRouring() {
  const route = useRoute()
  const userState = useUserState()

  const currentTab = computed<Tab | null>(() => {
    const { id } = userState.value

    console.log(route.path, id)

    switch (true) {
      case id && route.path.startsWith(`/user/${id}`): return 'profile'
      case route.path.startsWith('/vacancies'): return 'vacancies'
      case route.path.startsWith('/projects-list'): return 'projects'
      case route.path.startsWith('/global-search'): return 'search'
      default: return null
    }
  })

  return { currentTab }
}
