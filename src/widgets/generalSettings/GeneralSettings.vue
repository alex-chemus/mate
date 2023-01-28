<script lang="ts" setup>
import { defineProps, defineEmits, watch } from 'vue'
import { FullAccountInfo } from '@/utils'
import { Input } from '@/ui'
import GeneralSettingsLayout from './GeneralSettingsLayout.vue'
import { Sex, AvatarUpload } from './components'
import { useUploadAvatar, useUploadForm } from './hooks'

const props = defineProps<{
  fullAccountInfo: FullAccountInfo,
  update?: symbol
}>()

const emit = defineEmits<{
  (e: 'wasUpdated'): void
}>()

const { setAvatar, uploadAvatar } = useUploadAvatar()
const {
  uploadForm, sex, firstName, lastName,
  patronymic, textID
} = useUploadForm({
  uploadAvatar
})

watch(
  () => props.update,
  async () => {
    await uploadForm()
    emit('wasUpdated')
  }
)
</script>

<template>
  <general-settings-layout>
    <template #avatar-upload>
      <avatar-upload
        :img="fullAccountInfo.avatar.avatarCompressed"
        :full-name="`${fullAccountInfo.firstName} ${fullAccountInfo.lastName}`"
        :text-id="fullAccountInfo.textID"
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

    <!-- <template #date-of-birth>
      <Input
        label-text="Дата рождения"
        placeholder="день/месяц/год"
      />
    </template> -->
  </general-settings-layout>
</template>
