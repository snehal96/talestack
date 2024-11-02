<template>
  <div class="onboarding">
    <div class="onboarding__header">
      <v-file-input
        ref="imageInput"
        class="onboarding__header-image"
        accept="image/*"
        label="Profile Image input"
        name="profileImage"
        @change="onFileChange"
      />
      <v-card class="onboarding__header__form">
        <v-card-text>
          <div class="onboarding__header__form-title">
            Talestack
          </div>
          <div class="onboarding__header__form-subtitle">
            Welcome to the world for orderness
          </div>
          <div
            class="onboarding__header__form-dp"
            @click="triggerFileInput"
          >
            <template v-if="profileImage">
              <button class="remove-btn" @click.stop.prevent="removeFile()">✕</button>
              <img :src="profileImage.url" alt="Image preview" />
            </template>
            <img v-else src="@/assets/default_user.svg" />
          </div>
          <v-text-field v-model="data.username" label="Username" variant="outlined" density="compact" />
          <v-text-field v-model="data.name" label="Name" variant="outlined" density="compact" />
          <v-text-field v-model="data.tagline" label="Tagline" variant="outlined" density="compact" />
          <v-text-field v-model="data.bio" label="Bio" variant="outlined" density="compact" />
          <v-text-field v-model="data.mobile" label="Mobile Number" variant="outlined" density="compact" prefix="+91" />
          <v-btn color="#ee732f" block @click="submit">
            <strong>Submit</strong>
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
    <div class="onboarding__footer">Talestack © 2024</div>
  </div>
</template>

<script setup lang="ts">
import { UserService } from '@/api/UserService'
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router';

const userService = new UserService()
const { user } = storeToRefs(useAuthStore())
const router = useRouter()

const data = reactive({
  username: '',
  name: '',
  tagline: '',
  bio: '',
  mobile: '',
  uploading: false,
  error: ''
})

const profileImage:any = ref(null)
const imageInput:any = ref(null)

const triggerFileInput = () => {
  if (profileImage.value) return
  imageInput.value.click()
}

const onFileChange = (event:any) => {
  const files:any = Array.from(event.target.files)
  const url = URL.createObjectURL(files[0])
  const isImage = files[0].type.startsWith('image/')
  profileImage.value = { file: files[0], url, isImage }
}

const removeFile = () => {
  profileImage.value = null
}

const submit = async () => {
  data.uploading = true
  try {
    const reqBody:any = {
      email: user.value.email,
      username: data.username,
      name: data.name,
      tagline: data.tagline,
      bio: data.bio,
      mobile: data.mobile
    }

    const formData = new FormData()
    formData.append('thumbnail', profileImage.value.file)
    formData.append('type', 'tale')
    Object.keys(reqBody).forEach(key => {
      formData.append(key, reqBody[key])
    })

    const res: any = await userService.addUserInfo(formData)
    if (!res['success']) {
      data.error = res['message']
    } else {
      data.error = ''
      router.push('/home')
    }
    data.uploading = false
  } catch (e) {
    console.log(e)
    data.uploading = false
  }
}
</script>

<style lang="scss" scoped>
.onboarding {
  display: flex;
	flex-direction: column;
	height: 100vh;
  background: #f2f4f7;
  &__header {
    width: 360px;
    margin: 5vh auto auto auto;
    height: 70vh;
    &-image {
      display: none;
    }
    &__form {
      padding: 24px;
      text-align: center;
      &-title {
        font-size: 32px;
        font-weight: 600;
      }
      &-subtitle {
        font-size: 14px;
        font-weight: 400;
        margin: 16px 0;
      }
      &-dp {
        width: 25%;
        border-radius: 50%;
        aspect-ratio: 1/1;
        margin-bottom: 16px;
        & > button {
          position: absolute;
        }
        & > img {
          width: 100%;
          aspect-ratio: 1/1;
          overflow: hidden;
        }
      }
      .v-card-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        .v-text-field {
          width: 100%;
        }
      }
    }
  }
  &__footer {
		margin: 0 auto;
		width: 100%;
    padding: 2vh 12.5%;
		display: flex;
  	align-items: center;
    background: white;
    z-index: 1;
	}
}
</style>