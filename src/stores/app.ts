import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      isDrawerOpen: true
    }
  },
  actions: {
    setDrawer(value: boolean) {
      this.isDrawerOpen = value
    }
  }
})
