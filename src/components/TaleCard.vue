<template>
  <v-card class="mx-auto" variant="flat">
    <v-card-item>
      <div class="tale__image">
        <img :src="tale.thumbnailUrl" />
        <div class="tale__image__content">
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
          <div class="tale__image__content__text">{{ tale.currentStoryCount }} Stories</div>
        </div>
      </div>
    </v-card-item>

    <v-card-actions>
      <div>
        <h3>
          {{ tale.title }}
        </h3>
        <h5>by {{ tale.user.name }}</h5>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps(['tale', 'isUserTale'])
</script>

<style lang="scss" scoped>
.tale {
  &__image {
    display: grid;
    > img {
      width: 100%;
      aspect-ratio: 1/1;
      border-radius: 8px;
      grid-column: 1;
      grid-row: 1;
    }

    &__content {
      display: flex;
      flex-direction: column;
      grid-column: 1;
      grid-row: 1;

      &__action {
        width: 100%;
        flex: 1;
        margin: 6px auto auto -8px;

        & > button {
          float: right;
        }
      }

      &__text {
        border-radius: 12px;
        background-color: white;
        width: max-content;
        padding: 2px 8px;
        margin: auto auto 8px 8px;
        font-size: 12px;
      }
    }
  }
}

.v-card {
  background: transparent;
  &-item {
    padding: 0;
  }
}

h3 {
  text-overflow: ellipsis;
  overflow: hidden;
}

h5 {
  color: #b9b9be;
}
</style>
