<template>
  <Teleport to="body">
    <v-dialog class="container" v-model="dialogOpen" width="50%">
      {{ type }} created Successfully.
      <v-card-actions>
        <v-btn @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';

defineProps(['type', 'ref'])
const dialogOpen = ref(true)

const closeDialog = () => {
  dialogOpen.value = false
}

onMounted(() => {
  dialogOpen.value = true
})

</script>

<style lang="scss" scoped>
.container {
  width: 50vw;
  height: 75vh;
  background-color: white;
}
</style>