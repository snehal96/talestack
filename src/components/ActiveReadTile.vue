<template>
  <v-card @click="goToStory(activeRead)">
    <div class="tile__container">
      <img :src="activeRead?.tale?.thumbnailUrl || ''" />
      <div class="tile__content">
        <h3>Story {{ activeRead?.story?.storyOrder }}: {{ activeRead?.story?.title }}</h3>
        <h5>
          {{ activeRead?.tale?.title }}
        </h5>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps(['activeRead'])
const router = useRouter()

function goToStory(read: any) {
  router.push(`/tale/${read.tale.entityId}/story/${read.story.entityId}`)
}
</script>

<style scoped lang="scss">
.v-card {
  border-radius: 8px;
  padding: 0;
  height: 130px;
  margin-right: 16px;
  cursor: pointer;
}

.tile {
  &__container {
    display: flex;
    & > img {
      width: 140px;
      aspect-ratio: 1/1;
      margin-right: 16px;
    }
  }

  &__content {
    margin-top: 8px;
    & > h5 {
      color: #b9b9be;
    }
  }
}
</style>
