<template>
  <v-app-bar :color="'white'" density="default" elevation="0">
    <v-app-bar-nav-icon
      v-if="showDrawerIcon()"
      variant="text"
      @click.stop="setDrawer"
    ></v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-autocomplete
        :model-value="data.query"
        :items="data.searchItem"
        class="flex-full-width search"
        density="comfortable"
        item-props
        menu-icon=""
        placeholder="Search..."
        prepend-inner-icon="mdi-magnify"
        hide-no-data
        theme="light"
        :base-color="'white'"
        rounded="xl"
        ref="searchBar"
        @update:search="suggestTale"
        @keydown.enter.prevent.stop="searchTale"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :prepend-avatar="item?.props?.thumbnailUrl"
            :title="item?.title"
            :subtitle="item?.props?.description"
            @click="goToTale(item?.props?.entityId)"
          ></v-list-item>
        </template>
      </v-autocomplete>
    </v-app-bar-title>

    <template v-slot:append>
      <template v-if="authStore.isAuthenticated">
        <create-tale-modal :dialog="openDialog" />
        <v-btn class="dp" icon @click.stop.prevent="goToProfile">
          <v-avatar :color="'#ee732f'" size="28" :image="defaultUser"> </v-avatar>
        </v-btn>
      </template>
      <template v-else>
        <v-btn icon @click="goToLogin">
          <v-icon>mdi-login-variant</v-icon>
          <v-tooltip activator="parent" location="bottom">Login</v-tooltip>
        </v-btn>
        <v-btn icon @click="goToRegister">
          <v-icon>mdi-account-plus-outline</v-icon>
          <v-tooltip activator="parent" location="bottom">Register</v-tooltip>
        </v-btn>
      </template>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { useAuthStore } from '@/stores/auth'
import defaultUser from '@/assets/default_user.svg'
import CreateTaleModal from '@/components/modal/CreateTaleModal.vue'
import { useAppStore } from '@/stores/app'
import { TaleService } from '@/api/TaleService'

const authStore = useAuthStore()
const appStore = useAppStore()
const taleService = new TaleService()
const router = useRouter()
let auth: any

const openDialog = ref(false)
const data = reactive({
  searchItem: [],
  loadingSearchItem: false,
  query: null
})

const goToLogin = () => {
  router.replace('/login')
}

const goToRegister = () => {
  router.replace('/register')
}

const goToProfile = () => {
  router.push(`/author/${auth.currentUser?.uid}`)
}

const setDrawer = () => {
  appStore.setDrawer(!appStore.isDrawerOpen)
}

const showDrawerIcon = () => {
  return window.innerWidth < 1280
}

const suggestTale = async (e: any) => {
  data.loadingSearchItem = true
  data.query = e
  try {
    const res: any = await taleService.searchTale(data.query || '')
    if (res.success) {
      data.searchItem = res.data
    } else {
      data.searchItem = []
    }

    return data.searchItem
  } catch (e) {
    data.loadingSearchItem = false
    console.log(e)
  }
}

const searchTale = () => {
  router.push(`/search/${data.query}`)
}

const goToTale = (taleId: any) => {
  router.push({ path: `/tale/${taleId}` })
}

onMounted(() => {
  auth = getAuth()
})
</script>

<style lang="scss" scoped>
.search {
  border-radius: 32px;
  margin: 32px 8px 0 8px;
}

.rounded-16 {
  border-radius: 16px !important;
}

.dp {
  margin-top: 10px;
}
</style>
