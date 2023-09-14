<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue'
import { FullAccount } from '@/shared/types'
import { Textarea, SaveButton } from '@/shared/ui'
import {
  ImagesForm, Media, Skills, Specialties,
  AddressDropdown
} from './ui'
import { WidgetLayout } from './layouts'
import {
  useSettings, useImages, useSpecialties, useAddress,
  useMedia
} from './hooks'

const props = defineProps<{
  fullAccount: FullAccount,
}>()

const { setAvatar, setCover, uploadImage } = useImages()
const {
  allSpecialties, addedSpecialties, deletedSpecialties, uploadSpecialties, selectedSpecialties
} = useSpecialties({ fullAccount: props.fullAccount })
const {
  fetchLocations, locationsLoading, allLocations, addressValue, onSelect, selectedLocation
} = useAddress()
const { uploadMedia, removeMedia, editMedia } = useMedia()
const {
  uploadSettings, bio, skills, disabled
} = useSettings({ uploadImage, uploadSpecialties, address: addressValue })

const addressOpened = ref(false)
const getAddress = computed(() => {
  const hasCity = props.fullAccount.address.cityID !== 0
  const hasRegion = props.fullAccount.address.regionID !== 0
  const hasCountry = props.fullAccount.address.countryID !== 0
  if (hasCity || hasRegion || hasCountry)
    return [
      props.fullAccount.address.cityRusName,
      props.fullAccount.address.regionRusName,
      props.fullAccount.address.countryRusName
    ].join(', ')
  return ''
})
</script>

<template>
  <widget-layout>
    <template #images-upload>
      <images-form
        :avatar="fullAccount.avatar.avatarCompressed"
        :cover="fullAccount.profileCover"
        :full-name="`${fullAccount.firstName} ${fullAccount.lastName}`"
        :text-id="fullAccount.textID"
        @set-avatar="setAvatar"
        @set-cover="setCover"
      />
    </template>

    <template #bio>
      <Textarea
        label-text="О себе"
        :value="bio ?? fullAccount.bio"
        @update:value="p => bio = p"
        placeholder="О себе"
      />
    </template>

    <template #address>
      <address-dropdown
        :locations="allLocations"
        :loading="locationsLoading"
        v-model:visible="addressOpened"
        :selected="selectedLocation"
        :address="getAddress"
        @select="onSelect"
        @input="fetchLocations"
      />
    </template>

    <template #media>
      <Media
        :media="fullAccount.contacts.socialNetworks"
        @edit="editMedia"
        @remove="removeMedia"
        @add="uploadMedia"
      />
    </template>

    <template #specialties>
      <Specialties
        v-if="allSpecialties"
        :all-specialties="allSpecialties"
        :selected-specialties="selectedSpecialties ?? fullAccount.specialties.map((s) => s.id)"
        @select="id => {
          addedSpecialties.add(id)
          selectedSpecialties = [...new Set([...selectedSpecialties, ...addedSpecialties])]
        }"
        @remove="id => {
          deletedSpecialties.add(id)
          selectedSpecialties = selectedSpecialties.filter(s => !deletedSpecialties.has(s))
        }"
      />
    </template>

    <template #skills>
  <Skills
    :skills="skills || fullAccount.skills.split(', ').filter(Boolean)"
    @add="skill => {
      if (skills) skills.push(skill)
      else skills = [...fullAccount.skills, skill]
    }"
    @remove="skill => {
      if (skills) skills = skills.filter(s => s !== skill)
      else skills = [...fullAccount.skills.split(', ')].filter(s => s !== skill)
    }"
  />
</template>


    <template #save-button>
      <save-button :disabled="disabled" @click="uploadSettings" />
    </template>
  </widget-layout>
</template>
