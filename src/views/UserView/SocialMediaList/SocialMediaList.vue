<script setup lang="ts">
import { defineProps } from 'vue'
import { SocialMedia } from '@/shared/types'
import { IconWorldQuestion } from '@tabler/icons-vue';

defineProps<{
  items: SocialMedia[]
}>()
</script>

<template>
  <div class="social-media-list">
    <a
      v-for="item in items" :key="item.id"
      :href="item.url" :title="item.service"
      class="social-media-list__item"
    >
      <img v-if="item.logo" :src="item.logo" class="social-media-list__logo" />
      <div v-else class="social-media-list__logo">
        <icon-world-question />
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss" src="./SocialMediaList.scss" />