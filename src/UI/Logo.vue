<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  width?: number | string | null,
  height?: number | string | null
}>()
</script>


<template>
  <svg :width="width ?? 31" :height="height ?? 31" viewBox="0 0 31 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_24_591)">
      <path d="M15.5041 32.6342H0V38.7561H15.5041V32.6342Z" fill="#0B5384"/>
      <path d="M15.5041 17.1626V32.6098H0V16.3171H15.4959C15.4959 16.6016 15.4959 16.8781 15.5041 17.1626Z" fill="#0D6CA4"/>
      <path d="M15.5041 0V15.4471C15.5041 15.7317 15.5041 16.0163 15.5041 16.2602H0V0H15.5041Z" fill="#208BC7"/>
      <path d="M31.0082 0H15.5041V16.3171H31.0082V0Z" fill="#35BBED"/>
      <path d="M31 16.3171V16.7398C31 17.3415 30.9431 17.9431 30.8699 18.5285C30.7179 19.7236 30.4455 20.9003 30.0569 22.0407C29.7545 22.8807 29.3875 23.6962 28.9593 24.4797C27.8046 26.6331 26.158 28.4836 24.1534 29.8807C22.1487 31.2779 19.8427 32.1823 17.4227 32.5203C16.7837 32.6019 16.1401 32.6427 15.4959 32.6423V16.3171H31Z" fill="#1E9DC6"/>
    </g>
  <defs>
    <clipPath id="clip0_24_591">
      <rect width="31" height="38.7561" fill="white"/>
    </clipPath>
  </defs>
</svg>
</template>
