<script setup>
import { useCatStore } from '@/stores/user'
import { reactive, ref, watchEffect, onBeforeUnmount } from 'vue'
import { getApiData } from '@/mixins/index.js'
import { useToast } from 'primevue/usetoast'

const URL = '/api/cat-activity/'

const catStore = useCatStore()

const toast = useToast()

let catsArray = reactive([])
const prevActivity = ref({})

if (catStore && catStore.catsData) catsArray = Object.values(catStore?.catsData)

watchEffect(() => {
  if (catStore.catsData) {
    catsArray = Object.values(catStore.catsData)
  }
})

function getCatBySlug(arr, slug) {
  return arr.find((cat) => {
    return cat.slug === slug
  })
}

const fetchPosts = async () => {
  try {
    const promises = []
    catsArray.forEach((cat) => {
      const promise = new Promise((resolve, reject) => {
        getApiData(`${URL}${cat.slug}`)
          .then((resp) => {
            resolve(resp)
          })
          .catch((error) => {
            reject(error)
          })
      })

      promises.push(promise)
    })

    Promise.all(promises).then((values) => {
      values.forEach((item) => {
        if (prevActivity.value[item.slug] !== item.activity.message) {
          const currentCat = getCatBySlug(catsArray, item.slug)
          const severity = item.activity?.severity ?? 'info'
          toast.add({
            severity: severity,
            summary: 'Cat Activity',
            detail: `${currentCat.name} ${item.activity.message}`,
            life: 10000
          })
          prevActivity.value[item.slug] = item.activity.message
        }
      })
    })
  } catch (err) {
    console.log('Request failed: ', err.message)
  }
}

const notificationInterval = setInterval(fetchPosts, 10000)

onBeforeUnmount(() => {
  clearInterval(notificationInterval)
})
</script>
<template>
  <Toast />
</template>
