<script setup>
import { useUserStore } from '@/stores/user'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useToast } from 'primevue/usetoast'

import * as yup from 'yup'
import { useForm } from 'vee-validate'

const schema = yup.object({
  name: yup.string().required().label('Name'),
  email: yup.string().required().email().label('E-mail'),
  password: yup.string().required().min(6).label('Password')
})

const { defineComponentBinds, handleSubmit, errors } = useForm({
  validationSchema: schema
})

const userStore = useUserStore()
const toast = useToast()

const name = defineComponentBinds('name')
const email = defineComponentBinds('email')
const password = defineComponentBinds('password')

const onSubmit = handleSubmit((values) => registerHandler(values))

async function registerHandler(values) {
  await userStore
    .registerUser(values.email, values.password)
    .then((user) => {
      userStore.changeProfile(user, { displayName: values.name })
    })
    .catch((error) => {
      toast.add({ severity: 'error', summary: 'Form Error', detail: error, life: 4000 })
    })
}
</script>

<template>
  <div class="flex mt-5 justify-content-center">
    <Card class="w-full lg:max-w-22rem mt-5">
      <template #header>
        <h1 class="px-5 pt-5 mb-0 text-center">Registration</h1>
      </template>
      <template #content>
        <form novalidat @submit.prevent="onSubmit" class="flex flex-column">
          <div class="p-float-label">
            <InputText
              id="name"
              v-bind="name"
              type="text"
              :class="{ 'p-invalid': errors.name }"
              class="w-full"
            />
            <label for="name">Name</label>
          </div>
          <small class="p-error pt-1" id="text-error"> {{ errors.name || '' }}</small>

          <div class="p-float-label mt-4">
            <InputText
              id="email"
              v-bind="email"
              type="email"
              :class="{ 'p-invalid': errors.email }"
              class="w-full"
            />
            <label for="email">E-mail</label>
          </div>
          <small class="p-error pt-1" id="text-error"> {{ errors.email || '' }}</small>

          <div class="p-float-label mt-4">
            <InputText
              id="password"
              v-bind="password"
              type="password"
              :class="{ 'p-invalid': errors.password }"
              class="w-full"
            />
            <label for="password">Password</label>
          </div>
          <small class="p-error pt-1" id="text-error">{{ errors.password || '' }} </small>
          <Button type="submit" :disabled="userStore.loadingUser" label="Sign up" class="mt-4" />
        </form>
      </template>
    </Card>
    <Toast />
  </div>
</template>
