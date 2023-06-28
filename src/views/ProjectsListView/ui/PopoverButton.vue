<script lang="ts" setup>
import { defineEmits, ref, defineProps } from 'vue'
import { Popover } from '@/shared/hocs'

defineProps<{
  isSubbed?: boolean
}>()

const emit = defineEmits<{
  (e: 'subscribe'): void,
  (e: 'edit'): void
}>()

const isOpen = ref(false)
</script>

<template>
  <popover v-model:visible="isOpen" placement="bottom-right">
    <template #button>
      <button class="button" @click="isOpen = !isOpen">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-dots" />
        </svg>
      </button>
    </template>

    <template #content>
      <section class="popover">
        <ul class="buttons-list">
          <li>
            <button class="button-item" @click="emit('subscribe')">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <use href="@/assets/imgs/tabler-sprite.svg#tabler-plus" />
              </svg>
              <span>{{ isSubbed ? 'Отписаться' : 'Подписаться' }}</span>
            </button>
          </li>
          <li>
            <button class="button-item" @click="emit('edit')">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <use href="@/assets/imgs/tabler-sprite.svg#tabler-pencil" />
              </svg>
              <span>Редактировать</span>
            </button>
          </li>
        </ul>
      </section>
    </template>
  </popover>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.button {
  color: var(--heading-color-2);
}

.popover {
  border-radius: 6px;
  border: 1px solid var(--bg-color-3);
  overflow: hidden;
}

.buttons-list {
  padding: 5px;
  margin: 0;
  list-style: none;
}

.button-item {
  padding: 5px;
  @include flex(flex-start, center);
  gap: 9px;
}


</style>
