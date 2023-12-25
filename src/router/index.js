import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:patchMatch(.*)',
    component: () => import('@/views/notfound/notfound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
