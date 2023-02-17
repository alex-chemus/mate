<script lang="ts" setup>
import { defineProps } from 'vue'
import { SearchItem } from '../types'

defineProps<{
  content: SearchItem
}>()
</script>

<template>
  <div class="content-container">
    <img v-if="content.banner" :src="content.banner" alt="" class="banner" />
    <div v-else class="banner" />

    <div class="content-wrapper">
      <div class="avatar-wrapper">
        <img v-if="content.avatar" :src="content.avatar" alt="" class="avatar" />
        <div v-else class="avatar" />
        <h6 class="full-name">{{ content.fullName }}</h6>
        <p class="tag">@{{ content.textID }}</p>
      </div>

      <p class="description">{{ content.description }}</p>

      <div class="buttons-wrapper">
        <button class="profile-button">Перейти в профиль</button>
        <button class="sub-button">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-plus" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.content-container {
  @include flex(flex-start, center, column);
  max-width: 100%;
}

.banner {
  width: 100%;
  height: 64px;
  object-fit: cover;
  background-color: var(--gray-1);
}

.content-wrapper {
  @include flex(flex-start, center, column);
  padding: 0 15px 15px 15px;
  flex-grow: 1;
}

.avatar-wrapper {
  @include flex(flex-start, center, column);
  gap: 5px;
  margin-top: -26px;
  margin-bottom: 14px;
}

.avatar {
  width: 52px;
  aspect-ratio: 1;
  border: 2px solid var(--bg-color-2);
  border-radius: 100vmax;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / .1);
  object-fit: cover;
  background-color: var(--gray-1);
}

.full-name {
  font-family: var(--findcreek-medium);
  font-size: 16px;
  color: var(--heading-color-2);
  margin: 0;
}

.tag {
  font-family: var(--findcreek);
  font-size: 13px;
  color: var(--text-color-1);
  margin-top: -2px;
}

.description {
  font-family: var(--findcreek);
  font-size: 13px;
  margin: 0 auto;
  color: var(--text-color-1);
  text-align: center;
  line-height: 0.95em;
}

.buttons-wrapper {
  margin-top: auto;
  width: 100%;
  @include flex(flex-start, center);
  gap: 15px;
}

.profile-button {
  flex-grow: 1;
  color: var(--accent);
  height: 30px;
  border-radius: 5px;
  font-family: var(--findcreek);
  font-size: 12px;
  border: 1px solid currentColor;
  transition: var(--fast);

  &:hover {
    //box-shadow: 0 0 4px 0 currentColor;
    border-color: transparent;
    background-color: var(--accent);
    color: var(--light);
  }
}

.sub-button {
  height: 30px;
  width: 30px;
  background-color: var(--accent);
  transition: var(--fast);
  color: var(--light);
  border-radius: 100vmax;

  &:hover {
    box-shadow: 0 0 4px 0 var(--accent);
  }
}
</style>
