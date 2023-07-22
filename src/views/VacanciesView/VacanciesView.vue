<script lang="ts" setup>
import { ViewLayout, VacancyLayout } from './layouts'
import {
  useThemes, useVacancies, useLike, useView,
  useCurrentVacancy, useProjects, useMergedVacancies
} from './hooks'
import {
  Filters, Card, Pagination, ContentPlaceholder,
  LikeButton
} from './ui'

const { themes, selectedTheme } = useThemes()
const { toggleLike, likeUpdate } = useLike()
const { view, viewUpdate } = useView()
const {
  vacancies,
  onType,
  nextPage,
  prevPage,
  isLoading,
  isFirstPage,
  isLastPage,
} = useVacancies({ selectedTheme, update: [likeUpdate, viewUpdate] })
const projects = useProjects({ vacancies })
const mergedVacancies = useMergedVacancies({ vacancies, projects })
const currentVacancy = useCurrentVacancy({ vacancies })
</script>

<template>
  <view-layout :loading="isLoading" :is-open="!!currentVacancy">
    <template #filters>
      <filters
        :selected-theme="selectedTheme"
        :themes="themes"
        @select-theme="theme => {
          selectedTheme = theme
          currentVacancy = null
        }"
        @input="onType"
      />
    </template>

    <template v-if="mergedVacancies" #cards>
      <card
        v-for="{ vacancy, project } in mergedVacancies" :key="vacancy.id"
        :vacancy="vacancy"
        :project-info="project"
        :is-current="!!currentVacancy && vacancy.id === currentVacancy.vacancy.id"
        @toggle-like="p => toggleLike({ id: vacancy.id, value: p })"
        @view="() => {
          currentVacancy = { vacancy, project }
          view(vacancy)
        }"
        @close="currentVacancy = null"
      />
    </template>

    <template v-else-if="vacancies && vacancies.length === 0" #cards>
      <content-placeholder type="not found" />
    </template>

    <template v-else #cards>
      <content-placeholder type="loader" />
    </template>

    <template #vacancy>
      <vacancy-layout
        v-if="currentVacancy"
        :vacancy="currentVacancy.vacancy"
        :project="currentVacancy.project"
        @toggle-like="p => toggleLike({ id: currentVacancy!.vacancy.id, value: p })"
      >
        <template #like-button>
          <like-button
            :vacancy="currentVacancy.vacancy"
            @toggle-like="p => toggleLike({ id: currentVacancy!.vacancy.id, value: p })"
          />
        </template>
      </vacancy-layout>
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
  </view-layout>
</template>
