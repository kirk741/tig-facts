import { defineAsyncComponent } from 'vue';

export default [
  {
    name: 'LoginView',
    component: defineAsyncComponent(() => import("./LoginView.vue"))
  },
  {
    name: 'MainView',
    component: defineAsyncComponent(() => import("./MainView.vue"))
  },
  {
    name: 'PostView',
    component: defineAsyncComponent(() => import("./PostView.vue"))
  },
]