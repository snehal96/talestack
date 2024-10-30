<template>
  <h1>Saved Tales</h1>
  <TaleList :tales="data.tales" />
</template>
<script setup lang="ts">
import { UserService } from '@/api/UserService'
import TaleList from '@/components/TaleList.vue'
import { onMounted } from 'vue'
import { reactive } from 'vue'

const data = reactive({
  tales: [],
  loading: true,
  error: ''
})

const userService = new UserService()

onMounted(async () => {
  try {
    const res: any = await userService.fetchUserSavedTales()
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
