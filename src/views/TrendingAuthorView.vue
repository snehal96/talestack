<template>
  <div class="user__container">
    <TrendingUserTile v-for="(item, index) in data.users" :key="index" :user="item" />
  </div>
</template>
<script setup lang="ts">
import { UserService } from '@/api/UserService'
import TrendingUserTile from '@/components/TrendingUserTile.vue'
import user from '@/test-data/user'
import { onMounted } from 'vue'
import { reactive } from 'vue'

const data = reactive({
  users: [],
  loading: true,
  error: ''
})

const userService = new UserService()

onMounted(async () => {
  try {
    const res: any = await userService.fetchTrendingUser()
    if (res['success']) {
      const read: any = user.userInfoList
      data.users = read || res['data']
    } else {
      data.error = res['message']
    }

    data.loading = false
  } catch (e: any) {
    data.error = e.toString()
    data.loading = false
  }
})
</script>

<style lang="scss" scoped>
.user {
  &__container {
    display: flex;
    height: 140px;
  }
}
</style>
