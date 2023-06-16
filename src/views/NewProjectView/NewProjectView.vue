<script lang="ts" setup>
import { ref } from 'vue'
import { ViewLayout } from './layouts'
import {
  NextButton, PrevButton, FinishButton, Pagination,
  NameSection, AvatarSection, SuccessSection
} from './ui'
import { WithTransition } from './hocs'
import { useProject, useThemes, useImages } from './hooks'

const currentPage = ref<1 | 2 | 3>(1)

const themes = useThemes()
const { setAvatar, setCover, uploadImage } = useImages()
const {
  name, nametag, themeID, description, uploadProject
} = useProject({ uploadImage })
</script>

<template>
  <view-layout :current-page="currentPage">
    <template #content>
      <with-transition :current-page="currentPage">
        <name-section
          v-if="currentPage === 1"
          :name="name"
          :nametag="nametag"
          :themes="themes ?? []"
          @update:name="n => name = n"
          @update:nametag="t => nametag = t"
          @select-theme="t => themeID = t"
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
        <finish-button @click="uploadProject" />
      </template>
    </template>
  </view-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
