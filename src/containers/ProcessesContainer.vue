<script lang="ts" setup>
import { useErrorsProcess, useThemeProcess, useUserProcess } from '@/processes'

useErrorsProcess()
useThemeProcess()
useUserProcess()
</script>

<template>
  <slot />
</template>
