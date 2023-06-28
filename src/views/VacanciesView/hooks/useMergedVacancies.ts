import { computed, Ref } from 'vue'
import { FullVacancy, FullProject } from '@/shared/types'
import { MergedVacancy } from '../types'

const useMergedVacancies = (
  { vacancies, projects }: {
    vacancies: Ref<FullVacancy[] | null>,
    projects: Ref<FullProject[] | null>
  }
) => {
  const mergedVacancies = computed(() => {
    if (vacancies.value === null || projects.value === null) return null

    const result: MergedVacancy[] = []

    vacancies.value.forEach((vacancy) => {
      const project = projects.value?.find((p) => p.id === vacancy.projectID)
      if (project === undefined) return
      result.push({ vacancy, project })
    })

    return result
  })

  return mergedVacancies
}

export default useMergedVacancies
