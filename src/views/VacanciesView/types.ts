import { FullVacancy, FullProject } from '@/types'

export type Theme = {
  id: number,
  title: string
}

export type MergedVacancy = {
  vacancy: FullVacancy,
  project: FullProject
}
