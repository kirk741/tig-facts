import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/MainView.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/post/:id',
      component: () => import('@/views/PostView.vue')
    },
    {
      path: '/blog/:id',
      component: () => import('@/views/BlogView.vue')
    },
  ],
})

export default router;
