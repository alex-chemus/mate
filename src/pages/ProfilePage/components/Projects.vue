<script lang="ts" setup>
import { ref } from 'vue'
import { useTheme } from '@/utils'

const { theme } = useTheme()

interface IProject {
  name: string,
  img?: string,
  started: string
}

const projects = ref<IProject[]>([
  {
    name: 'FINDCREEK Mate',
    started: '22.07.22'
  }
])
</script>

<template>
  <section class="projects-section" :class="theme">
    <h4 class="projects-title" :class="theme">
      Последние проекты
      <span>{{ projects.length }}</span>
    </h4>

    <ul class="projects-list" :class="theme">
      <!-- todo: сделать функцию для сортировки по строке с датой -->
      <li
        v-for="project in projects" :key="project.started"
        class="project-container" :class="theme"
      >
        <img v-if="project.img" :src="project.img" alt="" class="icon" />
        <div v-else class="icon placeholder" />

        <div class="project-wrapper" :class="theme">
          <h5>{{ project.name }}</h5>
          <small>
            Начало работ:&#32;
            <span>{{ project.started }}</span>
          </small>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.projects-section {
  padding: 25px 18px;
  border: 1px solid color.change($gray-1, $alpha: .25);
  border-radius: 13px;

  &.light {
    background-color: var(--light);
  }

  &.dark {
    background-color: var(--dark-theme-color-2);
  }
}

.projects-title {
  margin-bottom: 26px;
  font-family: var(--ff-ubuntu);
  font-size: 14px;
  font-weight: var(--fw-medium);

  &.light {
    color: var(--dark-2);
  }

  &.dark {
    color: var(--light);
  }

  span {
    font-family: var(--ff-noto-sans);
    font-weight: var(--fw-bold);
    margin-left: 7px;
  }

  &.light span {
    color: #5C5C5C;
  }

  &.dark span {
    color: #bbb;
  }
}

.projects-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.project-container {
  padding: 20px 23px;
  border-radius: 15px;
  @include flex(flex-start, center);

  &.light {
    border-top: 1px solid color.change($gray-1, $alpha: .25);
    border-bottom: 1px solid color.change($gray-1, $alpha: .25);
  }

  &.dark {
    background-color: #2D303B;
    border: 1px solid color.change($gray-1, $alpha: .25);
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
  h5 {
    font-family: var(--ff-montserrat);
    font-weight: var(--fw-bold);
    font-size: 14px;
    letter-spacing: -3%;
    margin: 0;
    color: currentColor;
  }

  &.light {
    color: var(--dark-2);
  }

  &.dark {
    color: var(--light);
  }

  small {
    font-family: var(--ff-ubuntu);
    font-size: 13px;
    letter-spacing: -3%;
  }

  small span {
    font-family: var(--ff-noto-sans);
  }

  &.light small {
    color: #5C5C5C;
  }

  &.dark small {
    color: #bbb;
  }
}
</style>
