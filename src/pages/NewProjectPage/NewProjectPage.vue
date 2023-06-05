<script lang="ts" setup>
import { ref } from 'vue'
import { Header } from '@/widgets'
import {
  NextButton, PrevButton, FinishButton, Pagination,
  withTransition, FirstWidget, SecondWidget, FinalWidget
} from './components'
import { useProject, useThemes, useImages } from './hooks'
import NewProjectLayout from './NewProjectLayout.vue'

const currentPage = ref<1 | 2 | 3>(1)

const themes = useThemes()
const { setAvatar, setCover } = useImages()
const {
  name, nametag, theme, description
} = useProject()
</script>

<template>
  <new-project-layout :current-page="currentPage">
    <template #header>
      <Header />
    </template>

    <template #content>
      <with-transition :current-page="currentPage">
        <first-widget
          v-if="currentPage === 1"
          :name="name"
          :nametag="nametag"
          :themes="themes ?? []"
        />
        <second-widget
          v-if="currentPage === 2"
          @upload-avatar="setAvatar"
          @upload-cover="setCover"
          @update:description="p => description = p"
        />
        <final-widget v-if="currentPage === 3" />
      </with-transition>
    </template>

    <template #pagination>
      <pagination :current-page="currentPage" @select="p => currentPage = p" />
    </template>

    <template #buttons>
      <template v-if="currentPage === 1">
        <next-button @click="currentPage = 2" />
      </template>

      <template v-if="currentPage === 2">
        <prev-button @click="currentPage = 1" />
        <next-button @click="currentPage = 3" />
      </template>

      <template v-if="currentPage === 3">
        <prev-button @click="currentPage = 2" />
        <finish-button />
      </template>
    </template>
  </new-project-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
