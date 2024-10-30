<template>
  <h1>All Categories</h1>
  <div class="category__container">
    <CategoryCard
      v-for="(category, index) in data.categories"
      :key="index"
      :category="category"
      class="category__item"
      @click="goToTales(category)"
    />
  </div>
</template>

<script setup lang="ts">
import { HomeService } from '@/api/HomeService'
import CategoryCard from '@/components/CategoryCard.vue'
import { onMounted } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const data = reactive({
  categories: [],
  loading: true
})

const categoryService = new HomeService()
const router = useRouter()

function goToTales(category: any) {
  router.push(`/category/${category['entityId']}/tales`)
}

onMounted(async () => {
  try {
    let res: any = await categoryService.fetchCategories()
    if (res['success']) {
      data.categories = res['data']
    }
    data.loading = false
  } catch (e) {
    console.log(e)
    data.loading = false
  }
})
</script>

<style lang="scss" scoped>
.category {
  &__container {
    display: flex;
    flex-wrap: wrap;
    margin: 2% -16px 0 -16px;
  }

  &__item {
    width: 30%;
    padding: 16px;
    cursor: pointer;
  }
}
</style>
