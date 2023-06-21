import { ref, Ref, watch } from 'vue'
import { FullProject, FullVacancy } from '@/types'
import { useFetchFullProjects } from '@/api'

const useProjects = (
  { vacancies }:
  { vacancies: Ref<FullVacancy[] | null> }
) => {
  const fetchFullProjects = useFetchFullProjects('[views/VacanciesView/useProjects] Failed to fetch projects')
  const projects = ref<FullProject[] | null>(null)

  watch(vacancies, async () => {
    if (vacancies.value === null) return
    const projectsIDs = [...new Set(vacancies.value.map((v) => v.projectID))]

    if (projectsIDs.length > 0)
      projects.value = await fetchFullProjects(projectsIDs)
  })

  return projects
}

export default useProjects
