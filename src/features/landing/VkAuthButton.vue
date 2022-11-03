<script lang="ts" setup>
import { AuthButton } from '@/UI'
</script>


<template>
  <auth-button :with-icon="true">
    <img src="@/assets/vk-icon.png" alt="VK" />
    <span>Войти через VK</span>
  </auth-button>
</template>
