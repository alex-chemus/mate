<script lang="ts" setup>
import { Header } from '@/widgets';
import {
  useThemes, useVacancies, useLike, useView
} from './hooks'
import { Filters, CardsContainer, Card } from './components'
import VacanciesPageLayout from './VacanciesPageLayout.vue'

const { themes, selectedTheme } = useThemes()
const { toggleLike, likeUpdate } = useLike()
const { view, viewUpdate } = useView()
const {
  vacancies, onType, nextPage, prevPage, isLoading, projectsInfo
} = useVacancies({ selectedTheme, update: [likeUpdate, viewUpdate] })
</script>

<template>
  <vacancies-page-layout :loading="isLoading">
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

    <template v-if="projectsInfo && projectsInfo.find((p) => p.id)" #cards>
      <!-- <div v-if="vacancies">
        <p v-for="vacancy in vacancies" :key="vacancy.id">
          {{ vacancy.title }}
        </p>
      </div> -->
      <!-- <card
        v-for="vacancy in vacancies" :key="vacancy.id"
      /> -->
      <!-- <cards-container
        :vacancies="vacancies"
        :projects-info="projectsInfo"
        @toggle-like="toggleLike"
      /> -->

      <cards-container
        :vacancies="vacancies"
        :projects-info="projectsInfo"
        v-slot="{ info }"
      >
        <card
          v-for="vacancy in info" :key="vacancy.vacancy.id"
          :vacancy="vacancy.vacancy"
          :project-info="vacancy.project"
          @toggle-like="p => toggleLike({ id: vacancy.vacancy.id, value: p })"
          @view="view(vacancy.vacancy)"
        />
      </cards-container>
    </template>
  </vacancies-page-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

li, p {
  color: var(--heading-color-2);
}
</style>
