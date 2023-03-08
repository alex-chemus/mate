<script lang="ts" setup>
import { Header } from '@/widgets'
import {
  useThemes, useVacancies, useLike, useView, useCurrentVacancy
} from './hooks'
import {
  Filters, CardsContainer, Card, Pagination, Vacancy, ContentPlaceholder
} from './components'
import VacanciesPageLayout from './VacanciesPageLayout.vue'

const { themes, selectedTheme } = useThemes()
const { toggleLike, likeUpdate } = useLike()
const { view, viewUpdate } = useView()
const {
  vacancies,
  onType,
  nextPage,
  prevPage,
  isLoading,
  projectsInfo,
  isFirstPage,
  isLastPage,
} = useVacancies({ selectedTheme, update: [likeUpdate, viewUpdate] })
const currentVacancy = useCurrentVacancy({ vacancies })
</script>

<template>
  <vacancies-page-layout :loading="isLoading" :is-open="!!currentVacancy">
    <template #header>
      <Header />
    </template>

    <template #filters>
      <filters
        :selected-theme="selectedTheme"
        :themes="themes"
        @select-theme="p => selectedTheme = p"
        @input="onType"
      />
    </template>

    <template v-if="projectsInfo && vacancies && vacancies.length" #cards>
      <cards-container
        :vacancies="vacancies"
        :projects-info="projectsInfo"
        v-slot="{ info }"
      >
        <card
          v-for="vacancy in info" :key="vacancy.vacancy.id"
          :vacancy="vacancy.vacancy"
          :project-info="vacancy.project"
          :is-current="!!currentVacancy && vacancy.vacancy.id === currentVacancy.vacancy.id"
          @toggle-like="p => toggleLike({ id: vacancy.vacancy.id, value: p })"
          @view="() => {
            currentVacancy = vacancy
            view(vacancy.vacancy)
          }"
          @close="currentVacancy = null"
        />
      </cards-container>
    </template>

    <template v-else-if="vacancies && vacancies.length === 0" #cards>
      <content-placeholder type="not found" />
    </template>

    <template v-else #cards>
      <content-placeholder type="loader" />
    </template>

    <template #vacancy>
      <vacancy
        v-if="currentVacancy"
        :vacancy="currentVacancy.vacancy"
        :project="currentVacancy.project"
        @toggle-like="p => toggleLike({ id: currentVacancy!.vacancy.id, value: p })"
      />
    </template>

    <template #pagination>
      <pagination
        :is-first-page="isFirstPage"
        :is-last-page="isLastPage"
        @prev="() => {
          currentVacancy = null
          prevPage()
        }"
        @next="() => {
          currentVacancy = null
          nextPage()
        }"
      />
    </template>
  </vacancies-page-layout>
</template>
