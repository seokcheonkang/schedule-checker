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
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/join',
    name: 'Join',
    component: Join,
  },
  {
    path: '/find',
    name: 'Find',
    component: Find,
  },
  {
    path: '/scheduleList',
    name: 'ScheduleList',
    component: () =>
      import(/* webpackChunkName: "ScheduleList", webpackPrefetch:true */ '@/views/normal/ScheduleList.vue'),
  },
  {
    path: '/scheduleItem/:seq',
    name: 'ScheduleItem',
    component: () =>
      import(/* webpackChunkName: "ScheduleItem", webpackPrefetch:true */ '@/views/normal/ScheduleItem.vue'),
  },
  {
    path: '/admin/memberList',
    name: 'MemberList',
    component: () => import(/* webpackChunkName: "MemberList", webpackPrefetch:true */ '@/views/admin/MemberList.vue'),
  },
  {
    path: '/admin/memberItem/:seq',
    name: 'MemberItem',
    component: () => import(/* webpackChunkName: "MemberItem", webpackPrefetch:true */ '@/views/admin/MemberItem.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
