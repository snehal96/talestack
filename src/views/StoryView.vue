<template>
  <div v-if="!data.readonly" class="save__fab">
    <v-btn icon="mdi-content-save" size="x-large" color="#ee732f"></v-btn>
  </div>
  <medium-editor
    v-model="data.content"
    :prefill="data.content"
    :options="options"
    :onChange="onChange"
    v-on:uploaded="uploadCallback"
    :read-only="data.readonly"
  />
</template>

<script lang="ts">
import { reactive, onMounted } from 'vue'
import Editor from 'vuejs-medium-editor'
import apiRoutes from '@/api/apiRoutes'
import { nanoid } from 'nanoid'
import { getAuth } from 'firebase/auth'
import { useRoute } from 'vue-router'
import { TaleService } from '@/api/TaleService'

export default {
  name: 'StoryView',
  components: {
    'medium-editor': Editor
  },
  setup() {
    const route = useRoute()
    const taleService = new TaleService()

    const options = {
      uploadUrl: `${apiRoutes.baseUrl}/${apiRoutes.story.upload}`,
      uploadUrlHeader: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      file_input_name: `${nanoid()}`,
      file_size: 1024 * 1024 * 10,
      imgur: false
    }

    const data = reactive({
      story: {},
      content: '',
      readonly: true,
      loading: true,
      error: ''
    })

    const onChange = () => {
      console.log(data.content)
    }

    const uploadCallback = () => {}

    onMounted(async () => {
      try {
        const storyId: string = route.params.storyId as string
        let storyRes: any = await taleService.fetchStoryById(storyId)
        if (storyRes['success']) {
          const storyData: any = storyRes['data']
          data.content = storyData.content || ''
          data.readonly = getAuth().currentUser?.uid !== storyData.createdBy
        } else {
          data.error = storyRes['message']
        }
        data.loading = false
      } catch (e) {
        console.log(e)
        data.loading = false
      }
    })

    return { data, options, onChange, uploadCallback }
  }
}
</script>

<style lang="css">
@import 'medium-editor/dist/css/medium-editor.css';
@import 'vuejs-medium-editor/dist/themes/default.css';
@import 'highlight.js/styles/default.css';

.save__fab {
  position: fixed;
  top: 85vh;
  right: 2vw;
  z-index: 100;
}
</style>
