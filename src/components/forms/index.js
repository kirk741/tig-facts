import { defineAsyncComponent } from "vue";

export default [
  { name: 'AuthForm', component: defineAsyncComponent(() => import("./AuthForm.vue")) },
  { name: 'CommentForm', component: defineAsyncComponent(() => import("./CommentForm.vue")) }
]