<template>
  <div class="content">
    <template v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </template>
    <template v-else>
      <h2 v-if="error">Invalid credentials. Please try again.</h2>
      <v-card class="mx-auto" max-width="344" title="User Login">
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

          <v-btn color="primary" @click.stop="login">
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
          Sign In With google
        </v-btn>
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'LoginView',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const loading = ref(false)
    const authStore = useAuthStore()
    const router = useRouter()

    const login = () => {
      loading.value = true
      signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data: any) => {
          console.log('successfully logged in')
          localStorage.setItem('token', data.user.accessToken)
          loading.value = false
          authStore.authenticate(true)
          router.replace('/home')
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
          console.log('successfully logged in')
          localStorage.setItem('token', data.user.accessToken)
          loading.value = false
          authStore.authenticate(true)
          router.replace('/home')
        })
        .catch((err) => {
          console.log(err)
          loading.value = false
          error.value = err
        })
    }

    return { email, password, error, loading, login, signInWithGoogle }
  }
}
</script>

<style scoped>
h2 {
  color: red;
  margin-bottom: 10px;
}

.content {
  text-align: center;
}
</style>
