<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
import { Input } from '@/shared/ui'
import { useTheme } from '@/shared/utils'

const emit = defineEmits<{
  (e: 'search', searchString: string): void
}>()

const { theme } = useTheme()

const value = ref('')
</script>

<template>
  <Input
    v-model:value="value"
    placeholder="Поиск участников..."
  >
    <template #after>
      <button @click="emit('search', value)" class="search-button" :class="theme">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-search" />
        </svg>
      </button>
    </template>
  </Input>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.search-button {
  transition: var(--fast);
  cursor: pointer;
  color: var(--text-color-1);
}
</style>
