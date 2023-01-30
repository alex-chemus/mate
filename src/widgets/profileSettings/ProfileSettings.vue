<script lang="ts" setup>
import { defineProps, defineEmits, watch } from 'vue'
import { FullAccountInfo } from '@/utils'
import { Textarea } from '@/ui'
import {
  ImagesUpload, Media, Skills, Specialties
} from './components'
import { useUploadProfileSettings, useUploadImage, useSpecialties } from './hooks'
import ProfileSettingsLayout from './ProfileSettingsLayout.vue'

const props = defineProps<{
  fullAccountInfo: FullAccountInfo,
  update?: symbol
}>()

const emit = defineEmits<{
  (e: 'wasUpdated'): void
}>()

const { setAvatar, setCover, uploadImage } = useUploadImage()
const { allSpecialties, selectedSpecialties, uploadSpecialties } = useSpecialties()
const {
  uploadProfileSettings, bio, media, skills
} = useUploadProfileSettings({ uploadImage, uploadSpecialties })

watch(
  () => props.update,
  async () => {
    await uploadProfileSettings()
    emit('wasUpdated')
  }
)
</script>

<template>
  <profile-settings-layout>
    <template #images-upload>
      <images-upload
        :avatar="fullAccountInfo.avatar.avatarCompressed"
        :cover="fullAccountInfo.profileCover"
        :full-name="`${fullAccountInfo.firstName} ${fullAccountInfo.lastName}`"
        :text-id="fullAccountInfo.textID"
        @upload-avatar="setAvatar"
        @upload-cover="setCover"
      />
    </template>

    <template #bio>
      <Textarea
        label-text="О себе"
        :value="bio ?? fullAccountInfo.bio"
        @update:value="p => bio = p"
        placeholder="О себе"
      />
    </template>

    <template #specialties>
      <Specialties
        v-if="allSpecialties"
        :all-specialties="allSpecialties"
        :selected-specialties="selectedSpecialties ?? fullAccountInfo.specialties.map((s) => s.id)"
        @select="id => {
          if (!selectedSpecialties)
            selectedSpecialties = [...fullAccountInfo.specialties.map((s) => s.id), id]
          else
            selectedSpecialties.push(id)
        }"
        @remove="id => {
          if (selectedSpecialties?.includes(id))
            selectedSpecialties = selectedSpecialties.filter(s => s !== id)
        }"
      />
    </template>

    <template #skills>
      <Skills
        :skills="skills ?? fullAccountInfo.skills.split(', ')"
        @add="s => {
          if (skills) skills.push(s)
          else skills = [...fullAccountInfo.skills, s]
        }"
        @remove="r => {
          if (skills) skills = skills.filter(s => s !== r)
          else skills = [...fullAccountInfo.skills.split(', ')].filter(s => s !== r)
        }"
      />
    </template>
  </profile-settings-layout>
</template>
