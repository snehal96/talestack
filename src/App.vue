<template>
  <v-layout>
    <Sidebar v-if="authStore.isAuthenticated" />
    <v-main>
      <Header />
      <div class="main">
        <RouterView />
      </div>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
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
