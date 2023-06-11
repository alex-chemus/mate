<script lang="ts" setup>
import { ref } from 'vue'
import {
  NextButton, PrevButton, FinishButton, Pagination,
  NameSection, AvatarSection, SuccessSection
} from './ui'
import { WithTransition } from './hocs'
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
    <!-- <template #header>
      <Header />
    </template> -->

    <template #content>
      <with-transition :current-page="currentPage">
        <name-section
          v-if="currentPage === 1"
          :name="name"
          :nametag="nametag"
          :themes="themes ?? []"
        />
        <avatar-section
          v-if="currentPage === 2"
          @set-avatar="setAvatar"
          @set-cover="setCover"
          @update:description="p => description = p"
        />
        <success-section v-if="currentPage === 3" />
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
