<template>
  <v-card>
    <div class="tile__container">
      <img :src="tale?.thumbnailUrl || placeholder" />
      <div class="tile__content">
        <h3>{{ tale?.title }}</h3>
        <h5>
          {{ tale?.description }}
        </h5>
        <p>{{ tale.currentStoryCount }} Stories</p>
      </div>
      <div v-if="!isUserTale" class="tale__image__content__action">
        <v-btn v-if="tale.saved" icon density="comfortable" @click="">
          <v-icon color="red">mdi-heart</v-icon>
          <v-tooltip activator="parent" location="bottom">Remove</v-tooltip>
        </v-btn>
        <v-btn v-else icon density="comfortable" @click="">
          <v-icon>mdi-heart-outline</v-icon>
          <v-tooltip activator="parent" location="bottom">Save</v-tooltip>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import placeholder from '@/assets/placeholder.png'
defineProps(['tale', 'isUserTale'])
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
