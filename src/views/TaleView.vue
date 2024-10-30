<template>
  <div class="tale__container">
    <div class="tale__desc">
      <img :src="data.tale.thumbnailUrl" />
      <div class="tale__title">
        <div class="tale__title__head">
          <h1>{{ data.tale.title }}</h1>
          <p>
            By {{ data.tale.user.name }} <strong>{{ data.tale.currentStoryCount }} stories</strong>
          </p>
        </div>
        <div class="tale__title__action">
          <v-btn v-if="data.tale.saved" flat color="#ee732f">Unsave</v-btn>
          <v-btn v-else variant="flat" color="#ee732f">Save</v-btn>
          <v-btn variant="text">Share</v-btn>
        </div>
      </div>
      <div class="tale__description">
        <h2>About</h2>
        <p>{{ data.tale.description }}</p>
      </div>
      <div class="tale__tags">
        <v-chip
          v-for="(tag, index) in data.tale.tags"
          :key="index"
          size="small"
          color="#ee732f"
          flat
          rounded="xl"
        >
          {{ tag }}
        </v-chip>
      </div>
    </div>
    <div class="tale__story">
      <StoryList :storylist="data.storylist" :tale-title="data.tale.title" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { TaleService } from '@/api/TaleService'
import StoryList from '@/components/StoryList.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const data = reactive({
  tale: {
    title: '',
    thumbnailUrl: '',
    description: '',
    user: {
      name: ''
    },
    currentStoryCount: 0,
    saved: false,
    tags: []
  },
  storylist: [],
  loadingActive: true,
  loadingDraft: true,
  error: ''
})

const route = useRoute()

const authStore: any = useAuthStore()
const taleService = new TaleService()

onMounted(async () => {
  const taleId: string = route.params.id as string
  const taleRes: any = await taleService.fetchTaleById(taleId)

  if (taleRes['success']) {
    const tale = taleRes['data']

    try {
      const activeStories: any = await taleService.fetchTaleActiveStories(taleId)
      if (activeStories['success']) {
        data.tale = activeStories['data']
      } else {
        data.error = activeStories['message']
      }
      data.loadingActive = false
    } catch (e) {
      console.log(e)
      data.error = ''
      data.loadingActive = false
    }

    try {
      if (tale.userId === authStore.user.uid) {
        const draftStories: any = await taleService.fetchTaleDraftStories(taleId)
        if (draftStories['success']) {
          data.tale = draftStories['data']
        } else {
          data.error = draftStories['message']
        }
      }
      data.loadingDraft = false
    } catch (e) {
      console.log(e)
      data.error = ''
      data.loadingDraft = false
    }
  }
})
</script>

<style lang="scss" scoped>
.tale {
  &__container {
    display: flex;
    padding-bottom: 24px;
    justify-content: center;
    margin-top: 24px;
  }
  &__desc {
    width: 40%;
    margin-right: 5%;
    & > img {
      width: 100%;
      aspect-ratio: 1/0.75;
      border-radius: 8px;
    }
  }
  &__story {
    width: 35%;
  }
  &__title {
    display: flex;
    align-items: end;
    margin-top: 24px;
    &__head {
      flex: 1;
      & > p {
        color: #b9b9be;
        & > strong {
          color: rgb(80, 80, 80);
          margin-left: 6px;
        }
      }
    }
  }
  &__description {
    margin-top: 24px;
  }
  &__tags {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }
}
</style>
