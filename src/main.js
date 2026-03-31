import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import icons from './components/icons'
import UIComponents from './components/UI'
import Layouts from './components/layouts'

import './assets/index.css'

const app = createApp(App)

icons.forEach(icon => {
  app.component(icon.name, icon.component)
})

UIComponents.forEach(component => {
  app.component(component.name, component.component)
})

Layouts.forEach(layout => {
  app.component(layout.name, layout.component)
})

app.use(createPinia())
app.use(router)

app.mount('#app');