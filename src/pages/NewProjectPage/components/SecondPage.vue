<script lang="ts" setup>
import { defineEmits } from 'vue'
import { Textarea } from '@/ui'
import ImagesUpload from './ImagesUpload.vue'

const emit = defineEmits<{
  (e: 'update:description', payload: string): void,
  (e: 'upload-avatar', payload: FileList): void,
  (e: 'upload-cover', payload: FileList): void
}>()
</script>

<template>
  <div class="second-page">
    <h1 class="heading">Укажите описание, выберите аватарку и шапку для проекта</h1>
    <p class="text">Позже всю информацию можно будет изменить</p>

    <div class="images-container">
      <images-upload
        @upload-avatar="p => emit('upload-avatar', p)"
        @upload-cover="p => emit('upload-cover', p)"
      />
    </div>

    <Textarea
      label-text="О проекте"
      placeholder="О проекте"
      :rows="3"
      @update:value="p => emit('update:description', p)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.heading {
  @include findcreek-bold(30px, var(--heading-color-2));
  margin-bottom: 28px;
}

.text {
  @include findcreek-bold(14px, var(--text-color-1));
  margin-bottom: 48px;
}

.images-container {
  margin-bottom: 18px;
}
</style>
