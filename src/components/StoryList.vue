<template>
  <h2>Story List</h2>
  <div class="story__container">
    <StoryCard
      v-for="(story, index) in storylist"
      :key="index"
      :story="story"
      :tale-title="taleTitle"
    />
  </div>
</template>

<script setup lang="ts">
import StoryCard from './StoryCard.vue'

defineProps(['storylist', 'taleTitle'])
</script>

<style lang="scss" scoped>
.story__container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}
</style>
