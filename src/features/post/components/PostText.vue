<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue'
import { useTheme } from '@/utils'

const props = defineProps<{
  text: string
}>()

const { theme } = useTheme()

const isClipped = ref(true)
const shouldClip = ref(props.text.length > 400)
const computedText = computed(() => {
  return isClipped.value && shouldClip.value
    ? props.text.slice(0, 201)
    : props.text
})
</script>

<template>
  <p class="text" :class="theme">{{ computedText }}</p>
  <button
    v-if="shouldClip && isClipped"
    @click="isClipped = false"
    class="more-button"
  >
    Читать далее
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.text {
  font-family: var(--ff-ubuntu);
  font-size: 13px;
  line-height: 140%;
  letter-spacing: -3.3%;

  &.light {
    color: var(--dark-2);
  }

  &.dark {
    color: var(--light);
  }
}

.more-button {
  display: inline;
  font-family: var(--ff-ubuntu);
  font-size: 13px;
  line-height: 140%;
  letter-spacing: -3.3%;
  color: var(--accent-1);
}
</style>
