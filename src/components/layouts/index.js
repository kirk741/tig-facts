import { defineAsyncComponent } from 'vue';

export default [
  {
    name: 'AuthLayout',
    component: defineAsyncComponent(() => import("./AuthLayout.vue"))
  },
  {
    name: 'MainLayout',
    component: defineAsyncComponent(() => import("./MainLayout.vue"))
  },
  {
    name: 'SingleLayout',
    component: defineAsyncComponent(() => import("./SingleLayout.vue"))
  },
  {
    name: 'MasonryGrid',
    component: defineAsyncComponent(() => import("./MasonryGrid.vue"))
  },
];
