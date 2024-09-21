<script setup>
import logo from '@/assets/images/logo.png'
import useAuthStore from '@/store/AuthStore';
import { useRoute } from 'vue-router';

const route = useRoute()
const authStore = useAuthStore()

function toggleActiveStyle(name) {
  return [route.name === name ? 'bg-green-900' : 'hover:bg-gray-900']
}
</script>

<template>
    <nav class="bg-green-700 border-b border-green-500">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            <!-- Logo -->
            <router-link class="flex flex-shrink-0 items-center mr-4" :to="{name: 'home'}">
              <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
              <span class="hidden md:block text-white text-2xl font-bold ml-2"
                >Vue Jobs</span
              >
            </router-link>
            <div class="md:ml-auto">
              <div class="flex space-x-2">
                <router-link
                  :to="{name: 'home'}"
                  class="text-white rounded-md px-3 py-2"
                  :class="toggleActiveStyle('home')"
                  >Home</router-link
                >
                <router-link
                  :to="{name: 'jobs'}"
                  class="text-white rounded-md px-3 py-2"
                  :class="toggleActiveStyle('jobs')"
                  >Jobs</router-link
                >
                <div v-if="!authStore.isAuthenticated" class="flex space-x-2">
                  <router-link
                  :to="{name: 'signup'}"
                  class="text-white rounded-md px-3 py-2"
                    :class="toggleActiveStyle('signup')"
                    >Sign Up</router-link
                    >
                  <router-link
                  :to="{name: 'login'}"
                    class="text-white rounded-md px-3 py-2"
                    :class="toggleActiveStyle('login')"
                    >Log In</router-link
                  >
                </div>
                <div v-else class="flex space-x-2">
                  <router-link
                    :to="{name: 'company', params: {id: authStore.data.id}}"
                    class="text-white rounded-md px-3 py-2"
                    :class="route.name === 'company' && route.params.id === authStore.data.id ? 'bg-green-900' : 'hover:bg-gray-900'"
                    >Company Home</router-link
                  >
                  <router-link
                    :to="{name: 'addJob'}"
                    class="text-white rounded-md px-3 py-2"
                    :class="toggleActiveStyle('addJob')"
                    >Add Job</router-link
                  >
                  <span
                    @click="authStore.logout()"
                    class="text-white rounded-md px-3 py-2 hover:bg-gray-900 cursor-pointer"
                    >Log Out</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>