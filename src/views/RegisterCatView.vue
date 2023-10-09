<script setup>
import { useUserStore, useCatStore } from '@/stores/user'
import { useGeneralCatStore } from '@/stores/general'
import { ref, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Card from 'primevue/card'
import catApi from '../mixins/catApi'

import * as yup from 'yup'
import { useForm } from 'vee-validate'

const userStore = useUserStore()
const catStore = useCatStore()
const generalStore = useGeneralCatStore()
const uid = userStore?.userData?.uid

const schema = yup.object({
  name: yup.string().required().label('Name'),
  breed: yup.string().required().label('Breed'),
  color: yup.string().required().label('Color'),
  fur: yup.string().required().label('Fur')
})

const { defineComponentBinds, handleSubmit, errors } = useForm({
  validationSchema: schema
})

const name = defineComponentBinds('name')
const breed = defineComponentBinds('breed')
const color = defineComponentBinds('color')
const fur = defineComponentBinds('fur')

const onSubmit = handleSubmit((values) => registerHandler(values))

function getBreedName(breeds, id) {
  return breeds.filter((breed) => breed.id === id)
}
async function registerHandler(values) {
  const image = await catApi.methods.getPhoto(values.breed)
  const currentBreed = getBreedName(breedList.value, values.breed)
  await catStore.registerCat(uid, {
    name: values.name,
    breed: values.breed,
    breedName: currentBreed[0].name,
    color: values.color,
    fur: values.fur,
    image: image[0]
  })
}

const breedList = ref([])
const colorList = ref([])
const furList = ref([])

generalStore.getCatOptions()
colorList.value = generalStore.color
furList.value = generalStore.fur

onMounted(async () => {
  await generalStore.getBreeds().then(() => {
    breedList.value = generalStore.breeds
  })
})
</script>

<template>
  <div class="flex justify-content-center mt-5 w-full">
    <Card class="lg:w-6 md:w-12 sm:w-12 lg:max-w-30rem py-3 px-5">
      <template #header>
        <h1 class="px-5 pt-5 mb-0 text-center">Register a Cat</h1>
      </template>
      <template #content>
        <form novalidate @submit.prevent="onSubmit" class="flex flex-column">
          <div class="p-float-label">
            <InputText
              id="name"
              v-bind="name"
              type="text"
              class="w-full"
              :class="{ 'p-invalid': errors.name }"
            />
            <label for="name">Name</label>
          </div>
          <small class="p-error pt-1"> {{ errors.name }}</small>

          <div class="p-float-label mt-4">
            <Dropdown
              id="color"
              v-bind="breed"
              :options="breedList"
              optionLabel="name"
              optionValue="id"
              placeholder="Breed"
              :class="{ 'p-invalid': errors.breed }"
              class="w-full"
            />
            <label for="breed">Breed</label>
          </div>
          <small class="p-error pt-1"> {{ errors.breed }}</small>

          <div class="p-float-label mt-4">
            <Dropdown
              id="color"
              v-bind="color"
              :options="colorList"
              optionLabel="name"
              optionValue="value"
              placeholder="Color"
              :class="{ 'p-invalid': errors.color }"
              class="w-full"
            />
            <label for="color">Color</label>
          </div>
          <small class="p-error pt-1">{{ errors.color }}</small>

          <div class="p-float-label mt-4">
            <Dropdown
              id="fur"
              v-bind="fur"
              :options="furList"
              optionLabel="name"
              optionValue="value"
              placeholder="Fur"
              :class="{ 'p-invalid': errors.fur }"
              class="w-full"
            />
            <label for="color">Fur</label>
          </div>
          <small class="p-error pt-1">{{ errors.fur }}</small>

          <Button type="submit" label="Register" class="mt-4" />
        </form>
      </template>
    </Card>
  </div>
</template>
