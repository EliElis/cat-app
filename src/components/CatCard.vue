<script setup>
import { RouterLink } from 'vue-router'
import Card from 'primevue/card'

const props = defineProps(['cat'])
const cat = props.cat
</script>
<template>
  <Card class="h-full">
    <template #header v-if="cat.image">
      <img class="w-12" :alt="cat.name + ' - ' + cat.breed" :src="cat.image.url" />
    </template>
    <template #title> {{ cat.name }}</template>
    <template #subtitle> {{ cat.breedName }}</template>
    <template #content>
      <RouterLink class="custom-link" :to="{ name: 'Cat profile', params: { slug: cat.slug } }"
        >View</RouterLink
      >
    </template>
  </Card>
</template>
