<template>
  <v-card @click="viewStory()" flat>
    <div class="tile__container">
      <img :src="story?.thumbnailUrl || placeholder" />
      <div class="tile__content">
        <h3>{{ story?.title }}</h3>
        <h5>
          {{ taleTitle }}
        </h5>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import placeholder from '@/assets/placeholder.png'
import { useRouter } from 'vue-router'
const props = defineProps(['story', 'taleTitle'])

const router = useRouter()

const viewStory = () => {
  router.push({
    path: `/tale/${props.story.taleId}/story/${props.story.entityId}`
  })
}
</script>

<style lang="scss" scoped>
.v-card {
  border-radius: 12px !important;
  cursor: pointer;
}
.tile {
  &__container {
    display: flex;
    height: 120px;
    & > img {
      height: 100%;
      aspect-ratio: 1/1;
      object-fit: cover;
      margin-right: 12px;
    }
  }
}
</style>
