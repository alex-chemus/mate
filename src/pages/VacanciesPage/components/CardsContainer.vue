<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { FullVacancyInfo, FullProjectInfo } from '@/types'
import Card from './Card.vue'

const props = defineProps<{
  vacancies: FullVacancyInfo[] | null,
  projectsInfo: FullProjectInfo[] | null
}>()

const emit = defineEmits<{
  (e: 'toggle-like', payload: { id: number, value: boolean }): void
}>()

const getInfo = computed(() => {
  if (props.vacancies === null || props.projectsInfo === null) return null

  const result: {
    vacancy: FullVacancyInfo,
    project: FullProjectInfo
  }[] = []

  props.vacancies.forEach((vacancy) => {
    const project = props.projectsInfo?.find((p) => p.id === vacancy.projectID)
    if (project === undefined) return
    result.push({ vacancy, project })
  })

  return result
})
</script>

<template>
  <!-- <card
    v-for="vacancy in getInfo" :key="vacancy.vacancy.id"
    :vacancy="vacancy.vacancy"
    :project-info="vacancy.project"
    @toggle-like="p => emit('toggle-like', { id: vacancy.vacancy.id, value: p })"
  /> -->
  <slot :info="getInfo" />
</template>
