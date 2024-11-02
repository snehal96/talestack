import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // Define state using ref
  const isDrawerOpen = ref(true)

  // Define actions
  const setDrawer = (value: boolean) => {
    isDrawerOpen.value = value; // Update the state
  };

  // Return state and actions
  return {
    isDrawerOpen,
    setDrawer,
  }
})
