<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { useTheme } from '@/utils'
import { MoreButton } from '@/ui'
import type { Company } from '../types';

const { theme } = useTheme()

defineProps<{
  subscriptions: Company[]
}>()
</script>

<template>
  <section class="subscriptions-section" :class="theme">
    <div class="title-wrapper" :class="theme">
      <h4 class="title" :class="theme">Подписки</h4>
      <button class="search-button">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-search" />
        </svg>
      </button>
    </div>

    <ul class="subscriptions-list">
      <li v-for="item in subscriptions" :key="item.id" class="item">
        <img v-if="item.avatar" :alt="item.name" class="avatar" :class="theme" />
        <div v-else class="avatar placeholder" :class="theme" />

        <div class="item-content-wrapper" :class="theme">
          <h6>{{ item.name }}</h6>
          <small>{{ item.followers }}</small>
        </div>
      </li>
    </ul>

    <div class="more-button-wrapper">
      <more-button>Ещё</more-button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.subscriptions-section {
  padding: 20px 16px 12px 17px;
  border-radius: 13px;
  border: 1px solid color.change($gray-1, $alpha: .25);
  background-color: var(--bg-color-1);
}

.title-wrapper {
  @include flex(space-between, center);
  margin-bottom: 16px;
  color: var(--text-color-2);
}

.title {
  @include findcreek-medium(14px, var(--heading-color-2));
}

.search-button {
  color: inherit;
}

.subscriptions-list {
  list-style: none;
  padding: 0;
  margin: 0;

  & > *:not(:last-child) {
    margin-bottom: 21px;
  }
}

.item {
  @include flex(flex-start, center);

  & > *:not(:last-child) {
    margin-right: 20px;
  }
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 100vmax;
  border: 4px solid color.change($gray-1, $alpha: .3);
  object-fit: cover;
  background-color: var(--text-color-2);
}

.item-content-wrapper {
  h6 {
    margin: 0;
    margin-bottom: 1px;
    @include noto-sans(18px, var(--heading-color-2));
  }

  small {
    margin: 0;
    @include noto-sans(14px, var(--text-color-2));
  }
}

.more-button-wrapper {
  margin-top: 20px;
}
</style>
