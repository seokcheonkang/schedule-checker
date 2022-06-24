import { createRouter, createWebHistory } from 'vue-router';

import { useLoginStore } from '@/store/login.js';
import { useLoadingStore } from '@/store/loading.js';

// static page
import Home from '@/views/normal/Home.vue';
import Err from '@/views/normal/Err.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/normal/Login.vue'), // lazy-load page
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('@/views/normal/Profile.vue'),
    meta: { authorization: [1, 99] },
  },
  {
    path: '/Schedules',
    name: 'Schedules',
    component: () => import('@/views/normal/schedules.vue'),
    meta: { authorization: [1, 99] },
  },
  {
    path: '/Schedules/:seq',
    name: 'SchedulesItem',
    component: () => import('@/views/normal/SchedulesItem.vue'),
    meta: { authorization: [1, 99] },
  },
  {
    path: '/admin/Members',
    name: 'AdminMembers',
    component: () => import('@/views/admin/Members.vue'),
    meta: { authorization: [99] },
  },
  {
    path: '/admin/Members/:userEmail',
    name: 'AdminMembersItem',
    component: () => import('@/views/admin/MembersItem.vue'),
    meta: { authorization: [99] },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let loadingState = useLoadingStore?._pinia?.state?._value?.loading;
  loadingState = true;

  const authenticationState = useLoginStore?._pinia?.state?._value?.login;

  const { authorization } = to.meta;

  if (authorization) {
    // 로그인하지 않으면
    if (!authenticationState?.isLogin) {
      return next({ path: '/login' });
    }

    // 권한 없으면
    if (authorization.length && !authorization.includes(authenticationState?.role)) {
      return next({ path: '/error/needAuth' });
    }
  }

  next();
});

router.afterEach((to, from) => {
  let loadingState = useLoadingStore?._pinia?.state?._value?.loading;
  loadingState = false;
});

export default router;
