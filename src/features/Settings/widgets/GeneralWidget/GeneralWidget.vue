<script lang="ts" setup>
import { defineProps } from 'vue'
import { FullAccount } from '@/shared/types'
import { Input, SaveButton, DateInput } from '@/shared/ui'
// import GeneralSettingsLayout from './GeneralSettingsLayout.vue'
import { WidgetLayout } from './layouts'
import { Sex, AvatarForm, TextIdInput } from './ui'
import { useUploadAvatar, useSettings } from './hooks'

defineProps<{
  fullAccount: FullAccount,
}>()

const { setAvatar, uploadAvatar } = useUploadAvatar()
const {
  uploadSettings, sex, firstName, lastName,
  patronymic, textID, getBirthday, setBirthday
} = useSettings({ uploadAvatar })
</script>

<template>
  <widget-layout>
    <template #avatar-upload>
      <avatar-form
        :img="fullAccount.avatar.avatarCompressed"
        :full-name="`${firstName ?? fullAccount.firstName} ${lastName ?? fullAccount.lastName}`"
        :text-id="textID ?? fullAccount.textID"
        @set-avatar="setAvatar"
      />
    </template>

    <template #first-name>
      <Input
        label-text="Имя"
        placeholder="Имя"
        :value="firstName ?? fullAccount.firstName"
        @update:value="p => firstName = p"
      />
    </template>

    <template #last-name>
      <Input
        label-text="Фамилия"
        placeholder="Фамилия"
        :value="lastName ?? fullAccount.lastName"
        @update:value="p => lastName = p"
      />
    </template>

    <template #patronymic>
      <Input
        label-text="Отчество/матчество"
        placeholder="Отчество/матчество"
        :value="patronymic ?? fullAccount.patronymic"
        @update:value="p => patronymic = p"
      />
    </template>

    <template #text-id>
      <!-- <Input
        label-text="Имя страницы"
        placeholder="Имя страницы"
        :value="textID ?? fullAccount.textID"
        @update:value="p => textID = p"
      >
        <template #before>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-at" />
          </svg>
        </template>
      </Input> -->
      <text-id-input
        :value="textID ?? fullAccount.textID"
        @update:value="p => textID = p"
      />
    </template>

    <template #sex>
      <Sex
        :sex="sex ?? fullAccount.sex"
        @select="payload => sex = payload"
      />
    </template>

    <template #date-of-birth>
      <date-input
        :value="getBirthday ?? fullAccount.birthday.split('.').reverse().join('-')"
        @update:value="setBirthday"
        label="Дата рождения"
      />
    </template>

    <template #upload-button>
      <save-button @click="uploadSettings" />
    </template>
  </widget-layout>
</template>
