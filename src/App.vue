<script setup>
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HeaderNav from '@/components/HeaderNav.vue'
import Notification from '@/components/Notification.vue'
import { ref, watch } from 'vue'
import { checkIfLogged } from '@/mixins'

const userStore = useUserStore()
const isLoggedIn = ref(false)
isLoggedIn.value = checkIfLogged(userStore)
const year = new Date().getFullYear()

watch(userStore, () => {
  isLoggedIn.value = checkIfLogged(userStore)
})
</script>

<template>
  <div class="content">
    <HeaderNav />
    <RouterView />
  </div>

  <footer class="footer mt-5">
    <hr class="mb-2" />
    <div class="flex justify-content-between">
      <p class="text-500">Copyright © {{ year }}. Cat App.</p>
      <p class="text-500">All rights reserved.</p>
    </div>
  </footer>

  <Notification v-if="isLoggedIn" />
</template>
