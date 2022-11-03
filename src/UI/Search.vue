<script lang="ts" setup>
import { useStore } from 'vuex'
import { IState } from '@/store/types'
import { defineEmits, defineProps } from 'vue'

defineProps<{
  placeholder: string
}>()

const emit = defineEmits<{
  (e: 'input', value: Event): void
}>()

const { state } = useStore<IState>()
</script>


<template>
  <!-- eslint-disable-next-line -->
  <input
    type="text"
    :placeholder="placeholder"
    :class="state.theme"
    @input="e => emit('input', e)"
  />
</template>


<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/style.scss';

input {
  height: 40px;
  //width: 100%;
  //box-sizing: border-box;
  border-radius: 10px;
  padding: 0 16px;
  font-family: var(--ff-ubuntu);
  font-size: 16px;
  font-weight: var(--fw-medium);
  border: 1px solid color.change($gray-1, $alpha: .4);
  transition: .15s ease-out;
  outline: none;
  color: var(--text-color);

  &:focus {
    border-color: var(--accent-2);
  }

  &.light {
    background-color: var(--light);
  }

  &.dark {
    background-color: color.change($gray-1, $alpha: .5);
  }
}
</style>
