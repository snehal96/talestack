<template>
  <div class="user__container" @click="goToUser(user)">
    <v-avatar :color="'#ee732f'" :image="user.profileImageUrl" />
    <div class="user__name">
      {{ user.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps(['user'])

const router = useRouter()

function goToUser(user: any) {
  router.push(`/author/${user.entityId}`)
}
</script>

<style lang="scss" scoped>
.v-avatar {
  height: 75%;
  width: unset;
  aspect-ratio: 1/1;
  margin: auto;
}
.user {
  &__container {
    display: flex;
    flex-direction: column;
    width: 25%;
    text-align: center;
    margin: 0;
    cursor: pointer;
  }

  &__name {
    text-transform: capitalize;
    margin-top: 8px;
    color: #b9b9be;
  }
}
</style>
