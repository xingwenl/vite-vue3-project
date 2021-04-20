import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';
import List from '@/views/List.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/list',
    name: 'List',
    component: List,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
