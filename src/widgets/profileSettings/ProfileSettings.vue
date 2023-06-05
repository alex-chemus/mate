<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue'
import { FullAccountInfo } from '@/types'
import { Textarea, SaveButton } from '@/ui'
import {
  ImagesUpload, Media, Skills, Specialties,
  AddressSelect
} from './components'
import {
  useUploadProfileSettings, useUploadImage, useSpecialties, useAddress,
  useMedia
} from './hooks'
import ProfileSettingsLayout from './ProfileSettingsLayout.vue'

const props = defineProps<{
  fullAccountInfo: FullAccountInfo,
}>()

const { setAvatar, setCover, uploadImage } = useUploadImage()
const { allSpecialties, selectedSpecialties, uploadSpecialties } = useSpecialties()
const {
  fetchLocations, locationsLoading, allLocations, addressValue, onSelect, selectedLocation
} = useAddress()
const {
  onAdd, onRemove, onEdit
} = useMedia({ fullAccountInfo: props.fullAccountInfo })
const {
  uploadProfileSettings, bio, skills
} = useUploadProfileSettings({ uploadImage, uploadSpecialties, address: addressValue })

const addressOpened = ref(false)
const getAddress = computed(() => {
  const hasCity = props.fullAccountInfo.address.cityID !== 0
  const hasRegion = props.fullAccountInfo.address.regionID !== 0
  const hasCountry = props.fullAccountInfo.address.countryID !== 0
  if (hasCity || hasRegion || hasCountry)
    return [
      props.fullAccountInfo.address.cityRusName,
      props.fullAccountInfo.address.regionRusName,
      props.fullAccountInfo.address.countryRusName
    ].join(', ')
  return ''
})
</script>

<template>
  <profile-settings-layout>
    <template #images-upload>
      <images-upload
        :avatar="fullAccountInfo.avatar.avatarCompressed"
        :cover="fullAccountInfo.profileCover"
        :full-name="`${fullAccountInfo.firstName} ${fullAccountInfo.lastName}`"
        :text-id="fullAccountInfo.textID"
        @set-avatar="setAvatar"
        @set-cover="setCover"
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

    <template #address>
      <address-select
        :locations="allLocations"
        :loading="locationsLoading"
        v-model:visible="addressOpened"
        :selected="selectedLocation"
        :address="getAddress"
        @select="onSelect"
        @input="s => fetchLocations(s)"
      />
    </template>

    <template #media>
      <Media
        :media="fullAccountInfo.contacts.socialNetworks"
        @edit="onEdit"
        @remove="onRemove"
        @add="onAdd"
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
          else if (!selectedSpecialties.includes(id))
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

    <template #save-button>
      <save-button @click="uploadProfileSettings()" />
    </template>
  </profile-settings-layout>
</template>
