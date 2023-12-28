<template></template>
<script setup lang="ts">
import { UserService } from '@/api/UserService'
import { ref } from 'vue'
import { reactive } from 'vue'

const data = reactive({
  email: '',
  name: '',
  tagline: '',
  bio: '',
  uploading: false,
  error: ''
})

const file: any = ref(null)

const userService = new UserService()

const submit = async () => {
  data.uploading = true
  try {
    const res: any = await userService.addUserInfo({
      email: data.email,
      name: data.name,
      tagline: data.tagline,
      bio: data.bio,
      file: file
    })

    if (!res['success']) {
      data.error = res['message']
    } else {
      data.error = ''
    }
    data.uploading = false
  } catch (e) {
    console.log(e)
    data.uploading = false
  }
}
</script>
