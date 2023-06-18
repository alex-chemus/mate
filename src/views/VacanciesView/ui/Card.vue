<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { FullProject, FullVacancy } from '@/types'

const props = defineProps<{
  vacancy: FullVacancy,
  projectInfo: FullProject,
  isCurrent?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-like', payload: boolean): void,
  (e: 'view', payload: number): void,
  (e: 'close'): void
}>()

const getDate = computed(() => {
  const arr = props.vacancy.date.date.split(' ')
  return [
    arr[0], arr[1].slice(0, 5)
  ].join(' ')
})

const getButtonValue = computed(() => {
  if (props.isCurrent) return 'Закрыть'
  return props.vacancy.isViewed ? 'Посмотрено' : 'Посмотреть'
})
</script>

<template>
  <article class="card-vacancy" :class="{ 'current': isCurrent }">
    <div class="top-container">
      <div class="project">
        <img
          :src="projectInfo.avatar.avatarCompressed ?? projectInfo.avatar.avatar" alt=""
          class="project-logo"
        />
        <div class="project-wrapper">
          <h6>{{ projectInfo.name }}</h6>
          <p>@{{ projectInfo.textID }}</p>
        </div>
      </div>
      <button
        class="like-button" :class="{ 'liked': vacancy.isLiked }"
        @click="emit('toggle-like', !vacancy.isLiked)"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-heart" />
        </svg>
      </button>
    </div>

    <div class="content-container">
      <div class="title-wrapper">
        <p class="theme">{{ vacancy.themeName }}</p>
        <p class="title" :title="vacancy.title">{{ vacancy.title }}</p>
      </div>

      <p class="date">{{ getDate }}</p>

      <button
        class="view-button" :class="vacancy.isViewed ? 'viewed' : ''"
        @click="isCurrent ? emit('close') :emit('view', vacancy.id)"
      >
        {{ getButtonValue }}
      </button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.card-vacancy {
  border-radius: 8px;
  border: var(--border-2);
  background-color: var(--bg-color-2);
  padding: 19px;
  width: 478px;
  //height: 175px;
  height: 190px;
  @include flex(flex-start, stretch, column);
  gap: 11px;

  &.current {
    border: 1px solid var(--accent);
    background-color: rgb(190 224 255 / .2);
  }
}

.top-container {
  @include flex(space-between, center);
}

.project {
  @include flex(flex-start, center);
  gap: 11px;
}

.project-logo {
  height: 40px;
  aspect-ratio: 1;
  border-radius: 7px;
}

.project-wrapper {
  @include flex(flex-start, flex-start, column);
  gap: 4px;

  h6 {
    @include findcreek-medium(14px, var(--heading-color-2));
    margin: 0;
  }

  p {
    margin: 0;
    @include findcreek(12.5px, var(--heading-color-2));
  }
}

.like-button {
  border-radius: 100vmax;
  @include flex(center, center);
  width: 33px;
  aspect-ratio: 1;
  color: var(--text-color-1);
  transition: var(--fast);

  &.liked {
    color: var(--light);
    background-color: var(--red);
  }
}

.content-container {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: 1fr min-content;
  grid-gap: 7px;
  align-items: center;
  flex-grow: 2;
}

.title-wrapper {
  @include flex(flex-start, stretch, column);
  gap: 3px;
}

.theme {
  @include findcreek-medium(10px, var(--text-color-1));
}

.title {
  @include findcreek-medium(16px, var(--heading-color-2));
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.date {
  grid-row: 2;
  @include findcreek(13px, var(--text-color-1));
  letter-spacing: -0.03em;
}

.view-button {
  grid-row: 2;
  border-radius: 5px;
  height: 28px;
  width: 100px;
  border: 1px solid transparent;
  @include findcreek-medium(12px, var(--light));
  letter-spacing: .01em;
  transition: var(--fast);
  background-color: var(--accent);

  &:hover,
  &:focus {
    box-shadow: 0 0 4px var(--accent);
  }

  &.viewed {
    background-color: transparent;
    color: var(--accent);
    border-color: currentColor;
  }
}
</style>