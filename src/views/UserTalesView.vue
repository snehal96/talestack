<template>
  <h1>My Tales</h1>
  <TaleList :tales="data.tales" :is-user-tale="true" />
</template>
<script setup lang="ts">
import { TaleService } from '@/api/TaleService'
import TaleList from '@/components/TaleList.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { reactive } from 'vue'

const data = reactive({
  tales: [],
  loading: true,
  error: ''
})

const taleService = new TaleService()
const authStore: any = useAuthStore()

onMounted(async () => {
  try {
    const res: any = await taleService.fetchUserTales(authStore.user?.uid, 0)
    if (res['success']) {
      data.tales = res['data']
    } else {
      data.error = res['message']
    }
    data.loading = false
  } catch (e) {
    console.log(e)
    data.error = ''
    data.loading = false
  }
})
</script>
