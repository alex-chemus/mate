<script lang="ts" setup>
import { defineProps } from 'vue'
import { FullAccountInfo } from '@/utils'
import { Input } from '@/ui'
import GeneralSettingsLayout from './GeneralSettingsLayout.vue'
import { AvatarUpload } from './components'

defineProps<{
  fullAccountInfo: FullAccountInfo
}>()
</script>

<template>
  <general-settings-layout>
    <template #avatar-upload>
      <avatar-upload :img="fullAccountInfo.avatar.avatarCompressed" />
    </template>

    <template #first-name>
      <Input
        label-text="Имя"
        placeholder="Имя"
      />
    </template>

    <template #last-name>
      <Input
        label-text="Фамилия"
        placeholder="Фамилия"
      />
    </template>

    <template #patronymic>
      <Input
        label-text="Отчество/матчество"
        placeholder="Отчество/матчество"
      />
    </template>

    <template #text-id>
      <Input
        label-text="Имя пользователя"
        placeholder="Имя пользователя"
      />
    </template>

    <template #date-of-birth>
      <!-- сделать нормальный компонент -->
      <Input
        label-text="Дата рождения"
        placeholder="день/месяц/год"
      />
    </template>
  </general-settings-layout>
</template>
