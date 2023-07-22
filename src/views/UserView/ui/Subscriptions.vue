<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue'
import { useTheme } from '@/shared/utils'
import { MoreButton } from '@/shared/ui'
import { Subscription } from '../types'

const { theme } = useTheme()

const props = defineProps<{
  subscriptions: Subscription[]
}>()

const isLimited = ref(props.subscriptions.length > 3)
const getSubs = computed(() => {
  if (isLimited.value)
    return props.subscriptions.slice(0, 3)
  return props.subscriptions
})
</script>

<template>
  <section v-if="subscriptions.length" class="subscriptions-section" :class="theme">
    <div class="title-wrapper" :class="theme">
      <h4 class="title" :class="theme">Подписки</h4>
      <!-- <button class="search-button">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-search" />
        </svg>
      </button> -->
    </div>

    <ul class="subscriptions-list">
      <router-link
        v-for="item in getSubs"
        :key="item.id"
        :to="`/project/${item.id}`"
        class="item"
      >
        <img
          v-if="item.avatar.avatarCompressed ?? item.avatar.avatar"
          :src="item.avatar.avatarCompressed ?? item.avatar.avatar" :alt="item.name"
          class="avatar" :class="theme"
        />
        <div v-else class="avatar" />

        <div class="item-content-wrapper" :class="theme">
          <h6>{{ item.name }}</h6>
          <small>{{ item.subscribers.users.length }} подписчиков</small>
        </div>
      </router-link>
    </ul>

    <div v-if="props.subscriptions.length > 3 && isLimited" class="more-button-wrapper">
      <more-button @click="isLimited = false">Ещё</more-button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.subscriptions-section {
  // padding: 20px 16px 12px 17px;
  padding: 23px;
  border-radius: 13px;
  // border: 1px solid color.change($gray-1, $alpha: .25);
  border: var(--border-2);
  background-color: var(--bg-color-2);
  @include flex(flex-start, stretch, column);
  gap: 21px;
}

.title-wrapper {
  @include flex(space-between, center);
  color: var(--text-color-2);
}

.title {
  @include findcreek-medium(16px, var(--heading-color-1));
}

.search-button {
  color: inherit;
}

.subscriptions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  @include scrollbar;

  & > *:not(:last-child) {
    margin-bottom: 21px;
  }
}

.item {
  // background-color: var(--bg-color-3);
  @include flex(flex-start, center);
  text-decoration: none;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
}

.avatar {
  width: 50px;
  aspect-ratio: 1;
  // height: 70px;
  border-radius: 100vmax;
  // border: 1px solid color.change($gray-1, $alpha: .3);
  border: var(--border-2);
  object-fit: cover;
  background-color: var(--text-color-2);
}

.item-content-wrapper {
  h6 {
    margin: 0;
    margin-bottom: 2px;
    @include noto-sans(14px, var(--heading-color-1));
  }

  small {
    margin: 0;
    @include noto-sans(12px, var(--text-color-2));
  }
}

.more-button-wrapper {
  margin-top: 20px;
}
</style>
