import TaleList from '@/components/TaleList.vue';
<template>
  <div class="heading">
    <h1>For you</h1>
    <v-btn color="#f9f9f9" icon @click="goToTrendingTales()" flat>
      <v-icon>mdi-chevron-right</v-icon>
      <v-tooltip activator="parent" location="bottom">See more</v-tooltip>
    </v-btn>
  </div>
  <TaleList :tales="data.userFollowerTales" />
  <div class="content">
    <div class="content__container">
      <div class="heading">
        <h2>Continue reading</h2>
        <v-btn color="#f9f9f9" icon @click="goToReadList()" flat>
          <v-icon>mdi-chevron-right</v-icon>
          <v-tooltip activator="parent" location="bottom">See more</v-tooltip>
        </v-btn>
      </div>
      <ActiveReadTile :activeRead="data.userCurrentRead" />
    </div>
    <div class="content__container">
      <div class="heading">
        <h2>Trending Authors</h2>
        <v-btn color="#f9f9f9" icon @click="goToTrendingUser()" flat>
          <v-icon>mdi-chevron-right</v-icon>
          <v-tooltip activator="parent" location="bottom">See more</v-tooltip>
        </v-btn>
      </div>
      <div class="content__user">
        <TrendingUserTile v-for="(user, index) in data.trendingUsers" :key="index" :user="user" />
      </div>
    </div>
  </div>
  <div class="heading">
    <h1>Trending Tales</h1>
  </div>
  <TaleList :tales="data.trendingTales" />
</template>

<script setup lang="ts">
import { HomeService } from '@/api/HomeService'
import TaleList from '@/components/TaleList.vue'
import TrendingUserTile from '@/components/TrendingUserTile.vue'
import ActiveReadTile from '@/components/ActiveReadTile.vue'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

const data = reactive({
  userFollowerTales: [],
  trendingTales: [],
  trendingUsers: [],
  userCurrentRead: {},
  loadingUserFollowerTales: true,
  loadingTrendingTales: true,
  loadingTrendingUsers: true,
  loadingUserCurrentRead: true
})

const homeService = new HomeService()
const router = useRouter()

function goToTrendingTales () {
  router.push('/tale')
}

function goToReadList () {
  router.push('/user/reading')
}

function goToTrendingUser () {
  router.push('/author')
}

onMounted(async () => {
  try {
    let userFollowerTales: any = await homeService.fetchFollowedTales(0)
    if (userFollowerTales['success']) {
      data.userFollowerTales = userFollowerTales['data']
      data.loadingUserFollowerTales = false
    }
  } catch (e) {
    console.log(e)
    data.loadingUserFollowerTales = false
  }

  try {
    let trendingTales: any = await homeService.fetchTrendingTales(0)
    if (trendingTales['success']) {
      data.trendingTales = trendingTales['data']
      data.loadingTrendingTales = false
    }
  } catch (e) {
    console.log(e)
    data.loadingTrendingTales = false
  }

  try {
    let trendingUsers: any = await homeService.fetchTrendingUser(0)
    if (trendingUsers['success']) {
      data.trendingUsers = trendingUsers['data']
      data.loadingTrendingUsers = false
    }
  } catch (e) {
    console.log(e)
    data.loadingTrendingUsers = false
  }

  try {
    let userCurrentRead: any = await homeService.fetchUserCurrentRead()
    if (userCurrentRead['success']) {
      data.userCurrentRead = userCurrentRead['data']
      data.loadingUserCurrentRead = false
    }
  } catch (e) {
    console.log(e)
    data.loadingUserCurrentRead = false
  }
})
</script>

<style scoped lang="scss">
.heading {
  display: flex;
  width: 100%;

  > h1,
  h2 {
    flex: 1;
  }
}

.content {
  display: flex;
  margin-bottom: 20px;
  &__container {
    flex: 1;
    &:first-child {
      margin-right: 16px;
    }
  }

  &__user {
    display: flex;
    height: 140px;
  }
}
</style>
