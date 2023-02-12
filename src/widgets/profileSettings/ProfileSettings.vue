<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue'
import { FullAccountInfo, Location } from '@/utils'
import {
  Textarea, SaveButton, Input, SearchUngroupedSelect
} from '@/ui'
import {
  ImagesUpload, Media, Skills, Specialties,
  AddressSelect
} from './components'
import {
  useUploadProfileSettings, useUploadImage, useSpecialties, useAddress
} from './hooks'
import ProfileSettingsLayout from './ProfileSettingsLayout.vue'

defineProps<{
  fullAccountInfo: FullAccountInfo,
}>()

const { setAvatar, setCover, uploadImage } = useUploadImage()
const { allSpecialties, selectedSpecialties, uploadSpecialties } = useSpecialties()
const {
  fetchLocations, locationsLoading, allLocations, addressValue, onSelect, selectedLocation
} = useAddress()
const {
  uploadProfileSettings, bio, media, skills
} = useUploadProfileSettings({ uploadImage, uploadSpecialties, address: addressValue })

const addressOpened = ref(false)
const selectedAddress = ref<number | undefined>(undefined)
// test data
const locs = ref<Location[] | null>([
  {
    endpointName: 'Пермь',
    countryID: 1,
    cityID: 1,
    regionID: 1
  },
  {
    endpointName: 'Екат',
    countryID: 2,
    cityID: 2,
    regionID: 2
  },
  {
    endpointName: 'Екат1',
    countryID: 2,
    cityID: 2,
    regionID: 2
  },
  {
    endpointName: 'Екат2',
    countryID: 2,
    cityID: 2,
    regionID: 2
  },
  {
    endpointName: 'Екат3',
    countryID: 2,
    cityID: 2,
    regionID: 2
  },
  {
    endpointName: 'Екат4',
    countryID: 2,
    cityID: 2,
    regionID: 2
  },
  {
    endpointName: 'Пермь',
    countryID: 1,
    cityID: 1,
    regionID: 1
  },
  {
    endpointName: 'Пермь',
    countryID: 1,
    cityID: 1,
    regionID: 1
  },
  {
    endpointName: 'Пермь',
    countryID: 1,
    cityID: 1,
    regionID: 1
  },
  {
    endpointName: 'Пермь',
    countryID: 1,
    cityID: 1,
    regionID: 1
  },
  {
    endpointName: 'Пермь',
    countryID: 1,
    cityID: 1,
    regionID: 1
  },
])
// const getPopupContainer = () => {
//   return document.querySelector('.settings-modal .ant-modal-content') as HTMLElement
//   //return document.body
// }
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

    <template #address>
      <address-select
        :locations="allLocations"
        :loading="locationsLoading"
        v-model:visible="addressOpened"
        :selected="selectedLocation"
        @select="onSelect"
        @input="s => fetchLocations(s)"
      />
      <!-- <address-select :locations="locs" :loading="true" /> -->
      <!-- <search-select
        v-if="popupContainer"
        v-model:visible="selectOpened" :data="[]"
        :container="popupContainer" placement="bottomLeft"
      >
        <template #input>
          <button @click="selectOpened = !selectOpened">click me</button>
        </template>
      </search-select> -->
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

    <template #save-button>
      <save-button @click="uploadProfileSettings()" />
    </template>
  </profile-settings-layout>
</template>
