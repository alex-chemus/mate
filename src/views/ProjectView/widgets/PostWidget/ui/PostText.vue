<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue'
import { useTheme, useTextWithLinks } from '@/shared/utils'

const props = defineProps<{
  text: string
}>()

const { theme } = useTheme()

const isClipped = ref(true)
const shouldClip = ref(props.text.length > 400)
const computedText = computed(() => {
  return isClipped.value && shouldClip.value
    ? `${props.text.slice(0, 201)}...`
    : props.text
})

const getText = useTextWithLinks(computedText)
</script>

<template>
  <div class="text-wrapper">
    <p class="text" :class="theme" v-html="getText"></p>
    <button
      v-if="shouldClip && isClipped"
      @click="isClipped = false"
      class="more-button" :class="theme"
    >
      Читать далее
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.text {
  display: inline;
  @include findcreek(14px, var(--heading-color-2));
  line-height: 140%;
}

.text:deep(a) {
  text-decoration: none;
  color: var(--accent);

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:visited {
    color: var(--accent);
  }
}

.more-button {
  display: inline;
  @include findcreek(14px, var(--accent));
  line-height: 140%;
}
</style>
