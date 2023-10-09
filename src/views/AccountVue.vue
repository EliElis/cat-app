<script setup>
import { useUserStore } from '@/stores/user'
import Avatar from 'primevue/avatar'
import Card from 'primevue/card'

const userStore = useUserStore()
const user = userStore.userData
</script>
<template>
  <h1 class="text-500">Account Details</h1>
  <Card v-if="user" class="max-w-30rem mt-5 px-5 py-3">
    <template #content>
      <div class="flex flex-wrap">
        <Avatar label="A" class="mr-5 mb-3" size="xlarge" />
        <div>
          <p class="mt-0" v-if="user.displayName">
            <span class="font-semibold text-500">Name:</span>
            {{ user.displayName }}
          </p>
          <p>
            <span class="font-semibold text-500">E-mail:</span>
            {{ user.email }}
          </p>
        </div>
      </div>
    </template>
  </Card>
</template>
