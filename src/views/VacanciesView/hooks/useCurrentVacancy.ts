import { Ref, ref, watch } from 'vue'
import { FullVacancy } from '@/shared/types'
import { MergedVacancy } from '../types'

const useCurrentVacancy = ({ vacancies }: { vacancies: Ref<FullVacancy[] | null> }) => {
  const currentVacancy = ref<MergedVacancy | null>(null)

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
