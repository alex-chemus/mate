<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'

const emit = defineEmits<{
  (e: 'click'): void
}>()

const props = defineProps<{
  primary?: boolean,
  centered?: boolean,
  disabled?: boolean,
  withIcon?: boolean,
  textAccent?: boolean
}>()

const cls = ref<string[]>(['button'])

if (props.primary) cls.value.push('primary')
else cls.value.push('secondary')

if (props.centered) cls.value.push('centered')

if (props.disabled) cls.value.push('disabled')

if (props.withIcon) cls.value.push('with-icon')

if (props.textAccent) cls.value.push('text-accent')
</script>


<template>
  <button :class="cls.join(' ')" @click="emit('click')">
    <div class="content">
      <slot />
    </div>
  </button>
</template>


<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.button {
  height: 45px;
  width: 314px;
  border-radius: 24px;
  @include flex(flex-start, center);
  padding: 0 13px;
  cursor: pointer;

  /*display: grid;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  align-content: center;
  justify-items: start;
  grid-gap: 13px;*/

  font-family: var(--ff-ubuntu);
  font-weight: var(--fw-medium);
  font-size: 16px;
}

.centered {
  justify-content: center;
}

.content {
  width: fit-content;
}

.button.with-icon .content {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  align-content: center;
  justify-items: start;
  grid-gap: 13px;
}

.button.primary {
  color: var(--light);
  background-color: var(--accent-1);
}

.button.secondary {
  border: 1px solid color.change($gray-1, $alpha: 0.4);
  background-color: var(--light);
  color: var(--gray-1);
}

.button.text-accent {
  color: var(--accent-1);
}
</style>
