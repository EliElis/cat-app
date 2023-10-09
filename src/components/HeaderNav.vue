<script setup>
import Menubar from 'primevue/menubar'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()
const isLoggedIn = () => userStore?.userData?.email?.length > 0
const items = ref([
  {
    label: 'Sign in',
    icon: 'pi pi-fw pi-sign-in',
    route: '/login',
    visible: () => !isLoggedIn()
  },
  {
    label: 'Sign up',
    icon: 'pi pi-fw pi-pencil',
    route: '/register',
    visible: () => !isLoggedIn()
  },
  {
    label: 'Account',
    icon: 'pi pi-fw pi-user',
    route: '/account',
    visible: () => isLoggedIn()
  },
  {
    label: 'Cats',
    icon: 'cat-icon',
    visible: () => isLoggedIn(),
    items: [
      {
        label: 'Create cat',
        icon: 'pi pi-fw pi-user-plus',
        route: '/create-cat'
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-bars',
        route: '/'
      }
    ]
  },
  {
    label: 'Sign out',
    icon: 'pi pi-fw pi-sign-out',
    visible: () => isLoggedIn(),
    command: () => userStore.logoutUser()
  }
])
</script>

<template>
  <header>
    <Menubar :model="items" v-if="!userStore.loadingSession">
      <template #start>
        <RouterLink to="/" class="flex no-underline align-items-center">
          <img alt="logo" src="@/assets/logo.svg" height="42" class="mr-2" />
          <span class="text-600 font-semibold text-lg ml-1">Cat App</span>
        </RouterLink>
      </template>

      <template #item="{ label, item, props, root, hasSubmenu }">
        <RouterLink v-if="item.route" v-slot="routerProps" :to="item.route" custom>
          <a :href="routerProps.href" v-bind="props.action">
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ label }}</span>
          </a>
        </RouterLink>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span v-bind="props.icon" />
          <span v-bind="props.label">{{ label }}</span>
          <span
            :class="[hasSubmenu && (root ? 'pi pi-fw pi-angle-down' : 'pi pi-fw pi-angle-right')]"
            v-bind="props.submenuicon"
          />
        </a>
      </template>
    </Menubar>
  </header>
  <hr />
</template>

<style scoped>
.cat-icon {
  &:before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background: url('./../cat-paw.svg') no-repeat;
    background-size: contain;
    opacity: 0.6;
  }
}
</style>
