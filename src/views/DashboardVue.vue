<script setup async>
import { onMounted, reactive, watchEffect } from 'vue'
import { useUserStore, useCatStore } from '@/stores/user'
import { RouterLink } from 'vue-router'
import CatCard from '@/components/CatCard.vue'

const userStore = useUserStore()
const catStore = useCatStore()

let catsArray = reactive([])

const user = userStore.userData

onMounted(async () => {
  await catStore.getCats(user.uid)
})

watchEffect(() => {
  if (catStore.catsData) {
    catsArray = Object.values(catStore.catsData)
  }
})
</script>

<template>
  <div class="d-flex mt-5">
    <h1 class="mb-5 text-500">Dashboard</h1>

    <template v-if="!catStore.loadingCatsData">
      <div class="grid" v-if="catStore.catsCounter > 0">
        <div class="lg:col-4 sm:col-6 xs:col-6" v-for="cat in catsArray" :key="cat.slug">
          <CatCard :cat="cat" />
        </div>
      </div>
      <div class="mt-5" v-else>
        <h2>You have no cats yet.</h2>
        <RouterLink class="custom-link" :to="{ name: 'Create cat' }">Register the cat</RouterLink>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
