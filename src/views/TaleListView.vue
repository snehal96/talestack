<template>
  <h1>{{ category }} Category Tales</h1>
  <TaleList :tales="data.tales" />
</template>
<script setup lang="ts">
import { TaleService } from '@/api/TaleService'
import TaleList from '@/components/TaleList.vue'
import tale from '@/test-data/tale'
import { onMounted } from 'vue'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const data = reactive({
  tales: [],
  loading: true,
  error: ''
})

let category = ''
const route = useRoute()
const categoryId: string = route.params.categoryId as string

const taleService = new TaleService()

onMounted(async () => {
  try {
    const res: any = await taleService.fetchCategoryTales(categoryId, 0)
    if (res['success']) {
      const taless: any = tale
      data.tales = taless || res['data']
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
