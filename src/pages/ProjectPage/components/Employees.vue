<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'
import type { Employee } from '../types'

defineProps<{
  employees: Employee[]
}>()

const { theme } = useTheme()
</script>

<template>
  <section class="employees-section" :class="theme">
    <h4 class="employees-title" :class="theme">
      Сотрудники компании&#32;&#32;
      <span>{{ employees.length }}</span>
    </h4>

    <ul class="employees-list">
      <li
        v-for="employee in employees" :key="employee.id"
        class="employee-container" :class="theme"
      >
        <img v-if="employee.avatar" :src="employee.avatar" alt="" class="icon" />
        <div v-else class="icon placeholder" />

        <div class="employee-wrapper" :class="theme">
          <h5>{{ employee.name }}</h5>
          <!-- <small>{{ employee.position }}</small> -->
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.employees-section {
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

.employees-title {
  margin-bottom: 26px;
  font-family: var(--findcreek-medium);
  font-size: 14px;
  font-weight: var(--medium);

  &.light {
    color: var(--dark-2);
  }

  &.dark {
    color: var(--light);
  }

  span {
    font-family: var(--noto-sans);
    font-weight: var(--bold);
    margin-left: 7px;
  }

  &.light span {
    color: #5C5C5C;
  }

  &.dark span {
    color: #bbb;
  }
}

.employees-list {
  padding: 0;
  margin: 0;
  list-style: none;

  & > *:not(:last-child) {
    margin-bottom: 12px;
  }
}

.employee-container {
  @include flex(flex-start, center);

  & > *:not(:last-child) {
    margin-right: 10px;
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

.employee-wrapper {
  h5 {
    font-family: var(--findcreek-bold);
    font-weight: var(--bold);
    font-size: 14px;
    letter-spacing: -3%;
    margin: 0;
  }

  &.light h5 {
    color: var(--dark-2);
  }

  &.dark h5 {
    color: var(--light);
  }

  small {
    font-family: var(--findcreek);
    font-size: 12px;
    letter-spacing: -3%;
  }

  &.light small {
    color: #5c5c5c;
  }

  &.dark small {
    color: #bbb;
  }
}
</style>
