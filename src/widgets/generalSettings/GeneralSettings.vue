<script lang="ts" setup>
import { defineProps } from 'vue'
import { FullAccountInfo } from '@/types'
import { Input, SaveButton, DateInput } from '@/ui'
import GeneralSettingsLayout from './GeneralSettingsLayout.vue'
import { Sex, AvatarUpload, TextIdInput } from './components'
import { useUploadAvatar, useUploadGeneralSettings } from './hooks'

const props = defineProps<{
  fullAccountInfo: FullAccountInfo,
}>()

const { setAvatar, uploadAvatar } = useUploadAvatar()
const {
  uploadGeneralSettings, sex, firstName, lastName,
  patronymic, textID, getBirthday, setBirthday
} = useUploadGeneralSettings({
  uploadAvatar, fullAccountInfo: props.fullAccountInfo
})
</script>

<template>
  <general-settings-layout>
    <template #avatar-upload>
      <avatar-upload
        :img="fullAccountInfo.avatar.avatarCompressed"
        :full-name="`${firstName ?? fullAccountInfo.firstName} ${lastName ?? fullAccountInfo.lastName}`"
        :text-id="textID ?? fullAccountInfo.textID"
        @set-avatar="setAvatar"
      />
    </template>

    <template #first-name>
      <Input
        label-text="Имя"
        placeholder="Имя"
        :value="firstName ?? fullAccountInfo.firstName"
        @update:value="p => firstName = p"
      />
    </template>

    <template #last-name>
      <Input
        label-text="Фамилия"
        placeholder="Фамилия"
        :value="lastName ?? fullAccountInfo.lastName"
        @update:value="p => lastName = p"
      />
    </template>

    <template #patronymic>
      <Input
        label-text="Отчество/матчество"
        placeholder="Отчество/матчество"
        :value="patronymic ?? fullAccountInfo.patronymic"
        @update:value="p => patronymic = p"
      />
    </template>

    <template #text-id>
      <!-- <Input
        label-text="Имя страницы"
        placeholder="Имя страницы"
        :value="textID ?? fullAccountInfo.textID"
        @update:value="p => textID = p"
      >
        <template #before>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-at" />
          </svg>
        </template>
      </Input> -->
      <text-id-input
        :value="textID ?? fullAccountInfo.textID"
        @update:value="p => textID = p"
      />
    </template>

    <template #sex>
      <Sex
        :sex="sex ?? fullAccountInfo.sex"
        @select="payload => sex = payload"
      />
    </template>

    <template #date-of-birth>
      <date-input
        :value="getBirthday ?? fullAccountInfo.birthday.split('.').reverse().join('-')"
        @update:value="p => setBirthday(p)"
        label="Дата рождения"
      />
    </template>

    <template #save-button>
      <save-button @click="uploadGeneralSettings()" />
    </template>
  </general-settings-layout>
</template>
