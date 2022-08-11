import { createRouter, createWebHistory } from 'vue-router';

import { useLoginStore } from '@/store/login.js';
import { useLoadingStore } from '@/store/loading.js';

// static page
import Home from '@/views/normal/Home.vue';
import Err from '@/views/normal/Err.vue';
import MembersItem from '@/views/admin/MembersItem.vue';
import SchedulesItem from '@/views/normal/SchedulesItem.vue';
import AdminSchedulesItem from '@/views/admin/SchedulesItem.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home, // eager loading page
  },
  {
    path: '/error/notFound',
    name: 'NotFound',
    component: Err,
  },
  {
    path: '/error/needAuth',
    name: 'NeedAuthentication',
    component: Err,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/normal/Login.vue'), // lazy loading page
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/normal/Profile.vue'),
    meta: { authorization: ['1', '99'] },
  },
  {
    path: '/schedules',
    name: 'Schedules',
    component: () => import('@/views/normal/Schedules.vue'),
  },
  {
    path: '/schedules/:schedule_code',
    name: 'SchedulesItem',
    component: SchedulesItem,
  },
  {
    path: '/admin/schedules',
    name: 'AdminSchedules',
    component: () => import('@/views/admin/Schedules.vue'),
    meta: { authorization: ['99'] },
  },
  {
    path: '/admin/schedules/:schedule_code',
    name: 'AdminSchedulesItem',
    component: AdminSchedulesItem,
    meta: { authorization: ['99'] },
  },
  {
    path: '/admin/schedules/create',
    name: 'AdminSchedulesCreate',
    component: () => import('@/views/admin/SchedulesCreate.vue'),
    meta: { authorization: ['99'] },
  },
  {
    path: '/admin/schedules/update',
    name: 'AdminSchedulesUpdate',
    component: () => import('@/views/admin/SchedulesUpdate.vue'),
    meta: { authorization: ['99'] },
  },
  {
    path: '/admin/members',
    name: 'AdminMembers',
    component: () => import('@/views/admin/Members.vue'),
    meta: { authorization: ['99'] },
  },
  {
    path: '/admin/members/:user_email',
    name: 'AdminMembersItem',
    component: MembersItem,
    meta: { authorization: ['99'] },
  },
  {
    path: '/admin/stat',
    name: 'AdminStat',
    component: () => import('@/views/admin/Stat.vue'),
    meta: { authorization: ['99'] },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // spinner on
  const loadingStore = useLoadingStore();
  loadingStore.setIsLoading(true);

  const loginStore = useLoginStore();

  // route from.fullPath after login by pinia
  if (to.fullPath === '/login') {
    loginStore.setLastUrl(from.fullPath);
  }

  const { authorization } = to.meta;
  if (authorization) {
    // not login
    if (!loginStore?.isLogin) {
      return next({ path: '/login' });
    }

    // no auth
    if (authorization.length && !authorization.includes(loginStore?.grade)) {
      return next({ path: '/error/needAuth' });
    }
  }

  next();
});

router.afterEach((to, from) => {
  // spinner off
  const loadingStore = useLoadingStore();
  loadingStore.setIsLoading(false);
});

export default router;
