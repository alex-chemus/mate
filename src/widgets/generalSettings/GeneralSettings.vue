<script lang="ts" setup>
import { defineProps } from 'vue'
import { FullAccountInfo } from '@/utils'
import { Input, SaveButton } from '@/ui'
import GeneralSettingsLayout from './GeneralSettingsLayout.vue'
import { Sex, AvatarUpload } from './components'
import { useUploadAvatar, useUploadGeneralSettings } from './hooks'

const props = defineProps<{
  fullAccountInfo: FullAccountInfo,
}>()

const { setAvatar, uploadAvatar } = useUploadAvatar()
const {
  uploadGeneralSettings, sex, firstName, lastName,
  patronymic, textID
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
        @upload="setAvatar"
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
      <Input
        label-text="Имя пользователя"
        placeholder="Имя пользователя"
        :value="textID ?? fullAccountInfo.textID"
        @update:value="p => textID = p"
      />
    </template>

    <template #sex>
      <Sex
        :sex="sex ?? fullAccountInfo.additionalData.sex"
        @select="payload => sex = payload"
      />
    </template>

    <template #save-button>
      <save-button @click="uploadGeneralSettings()" />
    </template>
  </general-settings-layout>
</template>
