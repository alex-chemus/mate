<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { RadioButton } from '@/ui'
import { useTheme } from '@/utils'

defineProps<{
  sex: 1 | 2
}>()

const emit = defineEmits<{
  (e: 'select', payload: 1 | 2): void
}>()

const { theme } = useTheme()
</script>

<template>
  <p class="sex" :class="theme">Пол</p>
  <ul>
    <li>
      <radio-button
        name="sex"
        value="Мужской"
        :selected="sex === 1"
        @select="emit('select', 1)"
      />
    </li>
    <li>
      <radio-button
        name="sex"
        value="Женский"
        :selected="sex === 2"
        @select="emit('select', 2)"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.sex {
  font-family: var(--findcreek-medium, $findcreek-medium);
  font-size: 13px;
  margin: 0 0 6px 10px;
  color: var(--text-color-1);
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 15px;
}
</style>
