<template>
  <div class="read__container">
    <ActiveReadTile
      v-for="(item, index) in data.currentReadList"
      :key="index"
      :activeRead="item"
      class="read__item"
    />
  </div>
</template>
<script setup lang="ts">
import { UserService } from '@/api/UserService'
import ActiveReadTile from '@/components/ActiveReadTile.vue'
import userCurrentReadData from '@/test-data/usercurrentread'
import { onMounted } from 'vue'
import { reactive } from 'vue'

const data = reactive({
  currentReadList: [],
  loading: true,
  error: ''
})

const userService = new UserService()

onMounted(async () => {
  try {
    const res: any = await userService.fetchUserCurrentRead()
    if (res['success']) {
      const read: any = userCurrentReadData
      data.currentReadList = read || res['data']
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
.read {
  &__container {
    display: flex;
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;
  }

  &__item {
    max-width: 48%;
    width: 48%;
  }
}
</style>
