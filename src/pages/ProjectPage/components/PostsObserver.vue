<script lang="ts" setup>
import { defineEmits, ref, watch } from 'vue'

const emit = defineEmits<{
  (e: 'intersect'): void
}>()

const divRef = ref<HTMLDivElement | null>(null)

watch(divRef, () => {
  if (divRef.value === null) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          emit('intersect')
        }
      })
    },
    { rootMargin: '100px' }
  )

  observer.observe(divRef.value)
})
</script>

<template>
  <div ref="divRef" />
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
