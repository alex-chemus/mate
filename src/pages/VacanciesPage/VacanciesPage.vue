<script lang="ts" setup>
import { Input } from '@/ui'
import { Header } from '@/widgets';
import { useThemes, useVacancies } from './hooks'
import { Filters, CardsContainer } from './components'
import VacanciesPageLayout from './VacanciesPageLayout.vue'

const { themes, selectedTheme } = useThemes()
const {
  vacancies, onType, nextPage, prevPage, isLoading, projectsInfo
} = useVacancies({ selectedTheme })
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
      <cards-container
        :vacancies="vacancies"
        :projects-info="projectsInfo"
      />
    </template>
  </vacancies-page-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

li, p {
  color: var(--heading-color-2);
}
</style>
