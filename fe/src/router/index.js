import { createRouter, createWebHistory } from 'vue-router';

// normal
import Home from '@/views/normal/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/normal/Login.vue'),
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('@/views/normal/Profile.vue'),
  },
  {
    path: '/Join',
    name: 'Join',
    component: () => import('@/views/normal/Join.vue'),
  },
  {
    path: '/Find',
    name: 'Find',
    component: () => import('@/views/normal/Find.vue'),
  },
  {
    path: '/Schedules',
    name: 'Schedules',
    component: () => import('@/views/normal/schedules.vue'),
  },
  {
    path: '/Schedules/:seq',
    name: 'SchedulesItem',
    component: () => import('@/views/normal/SchedulesItem.vue'),
  },
  {
    path: '/admin/Members',
    name: 'AdminMembers',
    component: () => import('@/views/admin/Members.vue'),
  },
  {
    path: '/admin/Members/:seq',
    name: 'AdminMembersItem',
    component: () => import('@/views/admin/MembersItem.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
