<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  width?: number | string | null,
  height?: number | string | null
}>()
</script>


<template>
  <svg :height="height ?? 30" viewBox="0 0 93 75" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Group 481">
<path id="Vector" d="M1 23H28.75C33.8586 23 38 27.1414 38 32.25V72.95C38 73.9716 37.1717 74.8 36.15 74.8H2.85C1.82827 74.8 1 73.9716 1 72.95V23Z" fill="url(#paint0_linear_2781_137)"/>
<path id="Vector_2" d="M93 23H65.25C60.1414 23 56 27.1414 56 32.25V72.95C56 73.9716 56.8283 74.8 57.85 74.8H91.15C92.1717 74.8 93 73.9716 93 72.95V23Z" fill="url(#paint1_linear_2781_137)"/>
<path id="Vector_3" d="M0.997223 2.70649C0.997252 1.91515 1.20994 1.1126 1.83541 0.627828C1.91805 0.563773 2.0061 0.500935 2.09921 0.441251C2.92225 -0.0863197 3.95161 0.238392 4.81584 0.69537L36.271 17.3278C42.9835 20.8772 51.0151 20.8848 57.7344 17.3484L89.5827 0.586135C90.3147 0.200847 91.5366 0.0976699 92.176 0.622543V0.622543C92.9723 1.27615 92.9973 2.04749 92.9973 3.07764C92.9973 6.83727 92.9973 16.9887 92.9973 29.9995C92.9973 46.5679 68.9973 59.9995 46.9973 59.9995C23.9998 59.9995 0.99777 48.999 0.997273 29.9995C0.996879 14.9099 0.997111 5.81194 0.997223 2.70649Z" fill="url(#paint2_linear_2781_137)"/>
</g>
<defs>
<linearGradient id="paint0_linear_2781_137" x1="19.5" y1="23" x2="19.5" y2="74.8" gradientUnits="userSpaceOnUse">
<stop stop-color="#002288"/>
<stop offset="1" stop-color="#024989"/>
</linearGradient>
<linearGradient id="paint1_linear_2781_137" x1="74.5" y1="23" x2="74.5" y2="74.8" gradientUnits="userSpaceOnUse">
<stop stop-color="#002288"/>
<stop offset="1" stop-color="#024989"/>
</linearGradient>
<linearGradient id="paint2_linear_2781_137" x1="93" y1="3.38555e-05" x2="38.0929" y2="84.191" gradientUnits="userSpaceOnUse">
<stop stop-color="#00A3FF"/>
<stop offset="0.348958" stop-color="#0276FE"/>
<stop offset="0.744792" stop-color="#084CCF"/>
<stop offset="1" stop-color="#005BB8"/>
</linearGradient>
</defs>
</svg>
</template>
