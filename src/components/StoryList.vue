<template>
  <div class="story__title">
    <h2>Story List</h2>
    <v-btn v-if="isUserTale" icon variant="text">
      <v-icon>mdi-book-plus-multiple</v-icon>
    </v-btn>
  </div>
  <div v-if="storylist.length" class="story__container">
    <StoryCard
      v-for="(story, index) in storylist"
      :key="index"
      :story="story"
      :tale-title="taleTitle"
    />
  </div>
  <div v-else>
    <p>No story available yet</p>
    <p v-if="isUserTale">Add more stories now</p>
  </div>
</template>

<script setup lang="ts">
import StoryCard from './StoryCard.vue'

defineProps(['isUserTale', 'storylist', 'taleTitle'])

</script>

<style lang="scss" scoped>
.story {
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
  }
}
</style>
