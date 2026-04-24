import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { Ripple } from 'vuetify/directives'
import {
  VAlert,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VDialog,
  VProgressCircular,
  VSnackbar,
  VSpacer,
  VTable,
} from 'vuetify/components'
import App from './App.vue'
import router from './router'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './style.scss'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components: {
    VAlert,
    VBtn,
    VCard,
    VCardActions,
    VCardText,
    VDialog,
    VProgressCircular,
    VSnackbar,
    VSpacer,
    VTable,
  },
  directives: {
    Ripple,
  },
})
const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
