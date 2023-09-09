<script lang="ts" setup>
import { useUserState } from '@/shared/utils'
import { Input, SaveButton, DateInput } from '@/shared/ui'
import { WidgetLayout } from './layouts'
import { Sex, AvatarForm, TextIdInput } from './ui'
import { useUploadAvatar, useSettings } from './hooks'

const userState = useUserState()

const { setAvatar, uploadAvatar } = useUploadAvatar()
const {
  uploadSettings, sex, firstName, lastName,
  patronymic, textID, getBirthday, setBirthday
} = useSettings({ uploadAvatar })
</script>

<template>
  <widget-layout v-if="userState">
    <template #avatar-upload>
      <avatar-form
        :img="userState.avatar.avatarCompressed"
        :full-name="`${firstName ?? userState.firstName} ${lastName ?? userState.lastName}`"
        :text-id="textID ?? userState.textID"
        @set-avatar="setAvatar"
      />
    </template>

    <template #first-name>
      <Input
        label-text="Имя"
        placeholder="Имя"
        :value="firstName ?? userState.firstName"
        @update:value="p => firstName = p"
      />
    </template>

    <template #last-name>
      <Input
        label-text="Фамилия"
        placeholder="Фамилия"
        :value="lastName ?? userState.lastName"
        @update:value="p => lastName = p"
      />
    </template>

    <template #patronymic>
      <Input
        label-text="Отчество/матчество"
        placeholder="Отчество/матчество"
        :value="patronymic ?? userState.patronymic"
        @update:value="p => patronymic = p"
      />
    </template>

    <template #text-id>
      <text-id-input
        :value="textID ?? userState.textID"
        @update:value="p => textID = p"
      />
    </template>

    <template #sex>
      <Sex
        :sex="sex ?? userState.sex"
        @select="payload => sex = payload"
      />
    </template>

    <template #date-of-birth>
      <date-input
        :value="getBirthday ?? userState.birthday.split('.').reverse().join('-')"
        @update:value="setBirthday"
        label="Дата рождения"
      />
    </template>

    <template #upload-button>
      <save-button @click="uploadSettings" />
    </template>
  </widget-layout>
</template>
