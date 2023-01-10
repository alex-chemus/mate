<script lang="ts" setup>
import ThemeContainer from './ThemeContainer.vue'
import AuthContainer from './AuthContainer.vue'
</script>

<template>
  <theme-container>
    <auth-container>
      <slot />
    </auth-container>
  </theme-container>
</template>
