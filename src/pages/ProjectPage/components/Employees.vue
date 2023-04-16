<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { useTheme } from '@/utils'
import type { Employee, Role } from '../types'

const props = defineProps<{
  employees: Employee[]
}>()

const { theme } = useTheme()

const convertRole = (role: Role) => {
  switch (role) {
    case 'editor': return 'Редактор'
    case 'administrator': return 'Администратор'
    default: return 'Владелец'
  }
}

const getSortedEmployess = computed(() => {
  return [
    props.employees.find((e) => e.role === 'founder') as Employee,
    ...props.employees.filter((e) => e.role === 'administrator'),
    ...props.employees.filter((e) => e.role === 'editor')
  ].map((e) => ({
    name: e.name,
    avatar: e.avatar,
    id: e.id,
    role: convertRole(e.role)
  }))
})
</script>

<template>
  <section class="employees-section" :class="theme">
    <h4 class="employees-title" :class="theme">
      Сотрудники компании&#32;&#32;
      <span>{{ employees.length }}</span>
    </h4>

    <ul class="employees-list">
      <li
        v-for="employee in getSortedEmployess" :key="employee.id"
        class="employee-container" :class="theme"
      >
        <img v-if="employee.avatar" :src="employee.avatar" alt="" class="icon" />
        <div v-else class="icon placeholder" />

        <router-link :to="`/user/${employee.id}`" class="employee-wrapper" :class="theme">
          <h5>{{ employee.name }}</h5>
          <p>{{ employee.role }}</p>
          <!-- <small>{{ employee.position }}</small> -->
        </router-link>
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
  background-color: var(--bg-color-1);
}

.employees-title {
  margin-bottom: 26px;
  @include findcreek-medium(14px, var(--heading-color-2));

  span {
    @include noto-sans-bold(inherit, var(--text-color-1));
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
  text-decoration: none;

  h5 {
    @include findcreek-bold(14px, var(--heading-color-2));
    letter-spacing: -3%;
    margin: 0;
  }

  p {
    @include findcreek(12px, var(--text-color-1));
    letter-spacing: -3%;
  }
}
</style>
