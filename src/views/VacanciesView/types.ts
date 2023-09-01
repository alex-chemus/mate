import { FullVacancy, FullProject } from '@/shared/types'

export type Theme = {
  id: number,
  title: string
}

export type MergedVacancy = {
  vacancy: FullVacancy,
  project: FullProject
}
