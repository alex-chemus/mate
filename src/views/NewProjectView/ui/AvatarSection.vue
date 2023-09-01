<script lang="ts" setup>
import { defineEmits } from 'vue'
import { Textarea } from '@/shared/ui'
import ImagesForm from './ImagesForm.vue'

const emit = defineEmits<{
  (e: 'update:description', description: string): void,
  (e: 'set-avatar', files: FileList): void,
  (e: 'set-cover', files: FileList): void
}>()
</script>

<template>
  <div class="avatar-widget">
    <h1 class="heading">Укажите описание, выберите аватарку и шапку для проекта</h1>
    <p class="text">Позже всю информацию можно будет изменить</p>

    <div class="images-container">
      <images-form
        @set-avatar="files => emit('set-avatar', files)"
        @set-cover="files => emit('set-cover', files)"
      />
    </div>

    <Textarea
      label-text="О проекте"
      placeholder="О проекте"
      :rows="3"
      @update:value="value => emit('update:description', value)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.heading {
  @include findcreek-bold(30px, var(--heading-color-2));
  margin-bottom: 28px;

  @include lg {
    font-size: 24px;
  }
}

.text {
  @include findcreek-medium(16px, var(--text-color-1));
  margin-bottom: 48px;
}

.images-container {
  margin-bottom: 18px;
}
</style>
