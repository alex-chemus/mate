<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  title?: string,
  cardClass?: string
}>()
</script>

<template>
  <section :class="['card', cardClass ? cardClass : null]">
    <h5 v-if="title" class="card__title">{{ title }}</h5>
    <slot />
  </section>
</template>

<style scoped lang="scss" src="./Card.scss" />