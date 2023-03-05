<script lang="ts" setup>
import { Input } from '@/ui'
import { useThemes, useVacancies } from './hooks'

const { themes, selectedTheme } = useThemes()
const {
  vacancies, onType, nextPage, prevPage
} = useVacancies({ selectedTheme })
</script>

<template>
  <ul v-if="themes">
    <li v-for="theme in themes" :key="theme.id">
      <button @click="selectedTheme = theme">
        {{ theme.title }}
      </button>
    </li>

    <!-- <p v-if="themes.find((t) => t.id === selectedTheme?.id)">
      {{ themes.find((t) => t.id === selectedTheme?.id)!.title }}
    </p> -->

    <Input
      @update:value="onType"
    />

    <div v-if="vacancies">
      <p v-for="vacancy in vacancies" :key="vacancy.id">
        {{ vacancy.title }}
      </p>
    </div>

    <button @click="prevPage">back</button>
    <button @click="nextPage">next</button>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

li, p {
  color: var(--heading-color-2);
}
</style>
