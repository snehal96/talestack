<template>
  <v-navigation-drawer class="sidebar" v-model="appStore.isDrawerOpen">
    <v-list>
      <v-list-item title="TaleStack">
        <template v-slot:prepend>
          <v-avatar size="28" :image="logo"> </v-avatar>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <br />
    <v-list density="compact" nav>
      <!-- <p>Menu</p> -->
      <v-list-item
        prepend-icon="mdi-home-circle"
        :color="'#ee732f'"
        title="Home"
        to="/home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-shape"
        :color="'#ee732f'"
        title="Categories"
        to="/category"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-book-heart"
        :color="'#ee732f'"
        title="Saved Tales"
        to="/tale/saved"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-book-account"
        :color="'#ee732f'"
        title="My Tales"
        to="/tale/user"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="handleSignOut"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth';
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()

const handleSignOut = () => {
  const auth: any = getAuth()
  signOut(auth).then(() => {
    authStore.authenticate(false)
    router.push('/')
  })
}
</script>

<style lang="scss" scoped>
.sidebar {
  z-index: 1006 !important;
  background-color: #f2f1f5;
}

:deep(.v-list-item-title) {
  font-weight: bold !important;
}
</style>
