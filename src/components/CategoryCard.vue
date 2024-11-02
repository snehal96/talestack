<template>
  <v-card class="mx-auto" variant="flat">
    <v-card-item>
      <div class="category__image">
        <img :src="getImageUrl(category?.thumbnailUrl)" />
      </div>
    </v-card-item>
    <v-card-actions>
      <div>
        <h3>
          {{ category?.name }}
        </h3>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { getImageUrl } from '@/util/image';

defineProps(['category'])
</script>

<style lang="scss" scoped>
.v-card {
  background: transparent;
  padding: 0;
  &-item {
    padding: 0;
  }
}
.category__image {
  > img {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 8px;
  }
}

h3 {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
