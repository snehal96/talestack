<template>
  <div class="tale__list" v-if="type === 'list'">
    <div
      @click="goToTale(tale)"
      v-for="(tale, index) in tales"
      :key="index"
      class="tale__list__row"
    >
      <TaleRow :tale="tale" :is-user-tale="isUserTale" />
    </div>
  </div>
  <div class="tale__list" v-else>
    <div
      @click="goToTale(tale)"
      v-for="(tale, index) in tales"
      :key="index"
      class="tale__list__item"
    >
      <TaleCard :tale="tale" :is-user-tale="isUserTale" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import TaleCard from './TaleCard.vue'
import TaleRow from './TaleRow.vue'

defineProps(['tales', 'isUserTale', 'type'])
const router = useRouter()

const goToTale = (tale: any) => {
  router.push({ path: `tale/${tale.entityId}`, params: { tale: tale } })
}
</script>

<style lang="scss" scoped>
.tale {
  &__list {
    display: flex;
    flex-wrap: wrap;
    height: auto;
    margin: 0 -2.5%;
    &__item {
      width: 25%;
      padding: 2.5%;
      height: max-content;
      cursor: pointer;
    }
  }
}
</style>
