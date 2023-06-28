<script lang="ts" setup>
// import { AuthButton } from '@/shared/ui'
import AuthButton from './AuthButton.vue'
</script>


<template>
  <auth-button :with-icon="true">
    <img src="@/assets/imgs/vk-icon.png" alt="VK" />
    <span>Войти через VK</span>
  </auth-button>
</template>
