<script setup>
import { useCatStore } from '@/stores/user'
import ChartBirds from '@/components/ChartBirds.vue'
import ChartActivity from '@/components/ChartActivity.vue'
import Card from 'primevue/card'

import { ref, onMounted, watch } from 'vue'
import { getFakeApiInfo } from '@/mixins/catApi'

const catStore = useCatStore()
const props = defineProps(['slug'])
const catsArray = ref([])
const currentCat = ref({})
const fakeData = ref({})
const fakeDataLoaded = ref(false)

let entries = Object.entries(catStore.catsData)
catsArray.value = entries.map((item) => ({
  key: item[0],
  ...item[1]
}))

currentCat.value = catsArray.value.find((cat) => {
  return cat.slug === props.slug
})

onMounted(async () => {
  fakeData.value.val = await getFakeApiInfo(props.slug)
})

watch(
  fakeData,
  () => {
    fakeDataLoaded.value = true
  },
  { deep: true }
)
</script>
<template>
  <h1 class="mb-5 text-500">Cat Profile</h1>
  <Card class="px-5 py-3">
    <template #content>
      <div class="grid">
        <div class="lg:col-5 lg:pr-5 sm:col-8">
          <img
            class="w-12"
            :alt="currentCat.name + ' - ' + currentCat.breed"
            :src="currentCat.image.url"
          />
        </div>

        <div class="lg:col-7 lg:pl-5 sm:col-12">
          <h1>
            {{ currentCat.name }} <span class="text-500">(Breed: {{ currentCat.breedName }})</span>
          </h1>

          <div v-if="fakeDataLoaded">
            <blockquote>
              {{ fakeData.val.cat.status }}
            </blockquote>
          </div>

          <p>
            <span class="font-semibold text-500">Color: </span>
            {{ currentCat.color }}
          </p>
          <p>
            <span class="font-semibold text-500"> Fur: </span>
            {{ currentCat.fur }}
          </p>
        </div>
      </div>
    </template>
  </Card>

  <template v-if="fakeDataLoaded">
    <h1 class="mb-5 text-500 mt-5 pt-3">Cat Statistic</h1>
    <div class="grid">
      <div class="lg:col-6 sm:col-12 lg:pr-5 mt-2">
        <ChartBirds
          :dates="fakeData?.val?.cat?.birds?.datesList"
          :statistic="fakeData?.val?.cat?.birds?.statistic"
        />
      </div>
      <div class="lg:col-6 sm:col-12 lg:pl-5 mt-2">
        <ChartActivity
          :dates="fakeData?.val?.cat?.activeMinutes?.datesList"
          :statistic="fakeData?.val?.cat?.activeMinutes?.statistic"
        />
      </div>
    </div>
  </template>
</template>

<style scoped>
blockquote {
  padding: 10px 0 10px 20px;
  margin: 1.5em 0;
  border-left: 5px solid var(--primary-color);
  background-color: var(--gray-800);
}
</style>
