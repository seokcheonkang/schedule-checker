import { createRouter, createWebHistory } from 'vue-router';

// normal
import Home from '@/views/normal/Home.vue';

import Login from '@/views/normal/Login.vue';
import Profile from '@/views/normal/Profile.vue';
import Join from '@/views/normal/Join.vue';
import Find from '@/views/normal/Find.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/Join',
    name: 'Join',
    component: Join,
  },
  {
    path: '/Find',
    name: 'Find',
    component: Find,
  },
  {
    path: '/Schedules',
    name: 'Schedules',
    component: () => import(/* webpackChunkName: "schedules", webpackPrefetch:true */ '@/views/normal/schedules.vue'),
  },
  {
    path: '/Schedules/:seq',
    name: 'SchedulesItem',
    component: () =>
      import(/* webpackChunkName: "SchedulesItem", webpackPrefetch:true */ '@/views/normal/SchedulesItem.vue'),
  },
  {
    path: '/admin/Members',
    name: 'Members',
    component: () => import(/* webpackChunkName: "Members", webpackPrefetch:true */ '@/views/admin/Members.vue'),
  },
  {
    path: '/admin/Members/:seq',
    name: 'MembersItem',
    component: () =>
      import(/* webpackChunkName: "MembersItem", webpackPrefetch:true */ '@/views/admin/MembersItem.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
