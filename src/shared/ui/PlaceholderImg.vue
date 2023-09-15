<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  src?: string,
  imgClass?: string
}>()
</script>

<template>
  <img :class="[imgClass]" v-if="src && src.length > 0" :src="src" />
  <div :class="[imgClass]" v-else />
</template>