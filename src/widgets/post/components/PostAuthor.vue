<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'

interface IAuthor {
  img?: string,
  fullname: string,
  nickname: string
}

const props = defineProps<{
  author: IAuthor
}>()

const { theme } = useTheme()
</script>

<template>
  <div class="author-container">
    <img v-if="props.author.img" :src="props.author.img" alt="" class="icon" />
    <div v-else class="icon placeholder" />

    <div class="author-wrapper" :class="theme">
      <small>@{{ author.nickname }}</small>
      <h5>{{ author.fullname }}</h5>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.author-container {
  @include flex(flex-start, center);

  & > *:not(:last-child) {
    margin-right: 6px;
  }
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 100vmax;
  border: 1px solid #727272;
  object-fit: cover;

  &.placeholder {
    background-color: color.change($gray-1, $alpha: .25);
  }
}

.author-wrapper {
  h5 {
    margin: 0;
    font-family: var(--findcreek-medium);
    font-size: 12px;
    color: var(--heading-color-2);
  }

  small {
    margin: 0;
    font-family: var(--noto-sans);
    font-size: 10px;
    margin-bottom: 4px;
    color: var(--text-color-1);
  }
}
</style>
