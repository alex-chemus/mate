import { Ref, ref, watch } from 'vue'
import { FullVacancyInfo, FullProjectInfo } from '@/types'

const useCurrentVacancy = ({ vacancies }: { vacancies: Ref<FullVacancyInfo[] | null> }) => {
  const currentVacancy = ref<{
    vacancy: FullVacancyInfo,
    project: FullProjectInfo
  } | null>(null)

  watch(vacancies, () => {
    if (currentVacancy.value === null || vacancies.value === null) return
    const vacancy = vacancies.value
      .find((v) => v.id === currentVacancy.value!.vacancy.id)
    if (vacancy) currentVacancy.value = {
      project: currentVacancy.value.project,
      vacancy
    }
  })

  return currentVacancy
}

export default useCurrentVacancy
