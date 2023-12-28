import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { initializeApp } from 'firebase/app'
import MediumEditor from 'vuejs-medium-editor'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: 'AIzaSyC_1U8AcZ8blrmUxVRD4nOQUyLWCPH8SZ4',
  authDomain: 'talestack-bde12.firebaseapp.com',
  projectId: 'talestack-bde12',
  storageBucket: 'talestack-bde12.appspot.com',
  messagingSenderId: '414418229040',
  appId: '1:414418229040:web:003c4188413c47bc8cdaf5'
}

initializeApp(firebaseConfig)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  components,
  directives
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.component('medium-editor', MediumEditor)

app.mount('#app')
