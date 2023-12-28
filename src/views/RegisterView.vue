<template>
  <div class="content">
    <template v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </template>
    <template v-else>
      <v-card class="mx-auto" max-width="344" title="User Registration">
        <v-container>
          <v-text-field
            v-model="email"
            color="primary"
            label="Email"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="password"
            color="primary"
            label="Password"
            placeholder="Enter your password"
            variant="underlined"
            type="password"
          ></v-text-field>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click.stop="register">
            Submit
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <br />
      <p>
        <v-btn
          rounded="xl"
          size="x-large"
          prepend-icon="mdi-shape-plus-outline"
          @click.stop="signInWithGoogle"
        >
          Sign Up With google
        </v-btn>
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'RegisterView',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const loading = ref(false)
    const authStore = useAuthStore()
    const router = useRouter()

    const register = () => {
      loading.value = true
      createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data: any) => {
          console.log('successfully registered')
          loading.value = false
          localStorage.setItem('token', data.user.accessToken)
          authStore.authenticate(true)
          router.replace('/onboarding')
        })
        .catch((err) => {
          console.log(err)
          loading.value = false
          error.value = err
        })
    }

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then((data: any) => {
          console.log('successfully registered')
          loading.value = false
          localStorage.setItem('token', data.user.accessToken)
          authStore.authenticate(true)
          router.replace('/onboarding')
        })
        .catch((err) => {
          console.log(err)
          loading.value = false
          error.value = err
        })
    }

    return { email, password, error, loading, register, signInWithGoogle }
  }
}
</script>

<style scoped></style>
