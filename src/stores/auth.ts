import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Define state using refs
  const isAuthenticated = ref(false)
  const user = ref({} as any) // You can also define a more specific type here if needed

  // Define actions
  const authenticate = (value: boolean) => {
    isAuthenticated.value = value // Update the state
  }

  const setFirebaseUser = (value: any) => {
    user.value = value // Update the state
  }

  const isCurrentUser = (value: string) => {
    return value === user.value.uid
  }

  // Return state and actions
  return {
    isAuthenticated,
    user,
    authenticate,
    setFirebaseUser,
    isCurrentUser
  }
})

