<template>
  <v-layout v-if="!isAppLoading">
    <Sidebar v-if="isAuthenticated" />
    <v-main>
      <Header v-if="isAuthenticated" />
      <div :class="{ 'main': isAuthenticated }">
        <RouterView />
      </div>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Sidebar from './components/common/Sidebar.vue'
import Header from './components/common/Header.vue'
import { useAuthStore } from './stores/auth'
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { UserService } from './api/UserService';

const router = useRouter()
const userService:any = new UserService() 
const { isAuthenticated, user } = storeToRefs(useAuthStore())

const isAppLoading = ref(true)

watch(() => isAuthenticated.value, val => {
  if (val) {
    const res:any = userService.fetchUserInfo(user.value.uid)
    if (res.success) {
      if (!res.data.isOnboarded) {
        setTimeout(() => {
          router.replace('/onboarding')
        }, 0)
      }
    }
  }
  isAppLoading.value = false
}, { immediate: true })

</script>

<style scoped>
.main {
  padding: 2% 5% 0 5%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f9f9f9;
  min-height: calc(100vh - 64px);
}
</style>
