<script lang="ts" setup>
import { ref, defineProps, computed } from 'vue'
import { useTheme, FullProjectInfo } from '@/utils'
import { MoreButton } from '@/ui'
//import type { ProjectInfo } from '../types'

const props = defineProps<{
  projects: FullProjectInfo[]
}>()

const { theme } = useTheme()

const shouldTrimProjects = ref(true)
const computedProjects = computed(() => {
  // if (shouldTrimProjects.value) return props.projects
  // else return props.projects.slice(0, 3)
  return shouldTrimProjects.value
    ? props.projects.slice(0, 3)
    : props.projects
})
</script>

<template>
  <section class="projects-section" :class="theme">
    <h4 class="projects-title" :class="theme">
      Последние проекты
      <span>{{ projects.length }}</span>
    </h4>

    <div v-if="!projects.length">У вас нет проектов</div>

    <template v-else>
      <ul class="projects-list" :class="theme">
        <li
          v-for="project in computedProjects" :key="project.id"
          class="project-container" :class="theme"
        >
          <router-link :to="`/project/${project.id}`" :class="theme">
            <img
              v-if="project.avatar.avatarCompressed"
              :src="project.avatar.avatarCompressed"
              alt="" class="icon"
            />
            <div v-else class="icon placeholder" />

            <div class="project-wrapper" :class="theme">
              <h5>{{ project.name }}</h5>
              <small>
                Начало работ:&#32;
                <span v-if="project.foundationDate">{{ project.foundationDate }}</span>
                <span v-else>???</span>
              </small>
            </div>
          </router-link>
        </li>
      </ul>
      <div v-if="shouldTrimProjects && projects.length > 3" class="more-button-wrapper">
        <more-button @click="shouldTrimProjects = false">Ещё</more-button>
      </div>
    </template>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.projects-section {
  padding: 25px 18px;
  border: 1px solid color.change($gray-1, $alpha: .25);
  border-radius: 13px;
  background-color: var(--bg-color-1);
}

.projects-title {
  margin-bottom: 26px;
  font-family: var(--findcreek-medium);
  font-size: 14px;
  color: var(--heading-color-2);

  span {
    font-family: var(--noto-sans);
    font-weight: var(--bold);
    margin-left: 7px;
    color: var(--text-color-1);
  }
}

.projects-list {
  padding: 0;
  margin: 0;
  list-style: none;
  @include flex(flex-start, stretch, column);
  gap: 12px;
}

.project-container a {
  padding: 20px 23px;
  border-radius: 15px;
  @include flex(flex-start, center);
  transition: var(--fast);

  &.light {
    border-top: 1px solid color.change($gray-1, $alpha: .25);
    border-bottom: 1px solid color.change($gray-1, $alpha: .25);
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
  }

  &.light:hover,
  &.light:focus {
    border-left: 1px solid color.change($gray-1, $alpha: .25);
    border-right: 1px solid color.change($gray-1, $alpha: .25);
  }

  &.dark {
    background-color: #2D303B;
    border: 1px solid color.change($gray-1, $alpha: .25);
  }

  &.dark:hover,
  &.dark:focus {
    box-shadow: 0 0 20px 0 rgba(0 0 0 / .25);
  }
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 100vmax;
  object-fit: cover;
  margin-right: 12px;

  &.placeholder {
    background-color: color.change($gray-1, $alpha: .25);
  }
}

.project-wrapper {
  color: var(--heading-color-2);

  h5 {
    font-family: var(--montserrat);
    font-weight: var(--bold);
    font-size: 14px;
    letter-spacing: -3%;
    margin: 0;
    color: currentColor;
  }

  small {
    font-family: var(--findcreek);
    font-size: 13px;
    letter-spacing: -3%;
    color: var(--text-color-1);
  }

  small span {
    font-family: var(--noto-sans);
  }
}

.more-button-wrapper {
  margin-top: 20px;
}
</style>
