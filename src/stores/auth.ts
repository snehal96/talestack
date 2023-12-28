import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isAuthenticated: false,
      user: {}
    }
  },
  actions: {
    authenticate(value: boolean) {
      this.isAuthenticated = value
    },
    setFirebaseUser(value: any) {
      this.user = value
    }
  }
})
