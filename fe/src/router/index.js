import { createRouter, createWebHistory } from 'vue-router';

import { useLoginStore } from '@/store/login.js';
import { useLoadingStore } from '@/store/loading.js';

// static page
import Home from '@/views/normal/Home.vue';
import Err from '@/views/normal/Err.vue';
import SchedulesItem from '@/views/normal/SchedulesItem.vue';
import MembersItem from '@/views/admin/MembersItem.vue';

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
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/normal/Login.vue'), // lazy loading page
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('@/views/normal/Profile.vue'),
    meta: { authorization: ['1', '99'] },
  },
  {
    path: '/Schedules',
    name: 'Schedules',
    component: () => import('@/views/normal/Schedules.vue'),
    meta: { authorization: ['1', '99'] },
  },
  {
    path: '/Schedules/:schedule_code',
    name: 'SchedulesItem',
    component: SchedulesItem,
    meta: { authorization: ['1', '99'] },
  },
  {
    path: '/Admin/Schedules/Create',
    name: 'AdminSchedulesCreate',
    component: () => import('@/views/admin/SchedulesCreate.vue'),
    meta: { authorization: ['99'] },
  },
  {
    path: '/Admin/Members',
    name: 'AdminMembers',
    component: () => import('@/views/admin/Members.vue'),
    meta: { authorization: ['99'] },
  },
  {
    path: '/Admin/Members/:user_email',
    name: 'AdminMembersItem',
    component: MembersItem,
    meta: { authorization: ['99'] },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  useLoadingStore().setIsLoading(true);

  // const authenticationState = useLoginStore?._pinia?.state?._value?.login;
  const authenticationState = useLoginStore();

  const { authorization } = to.meta;

  if (authorization) {
    // 로그인하지 않으면
    if (!authenticationState?.isLogin) {
      return next({ path: '/login' });
    }

    // 권한 없으면
    if (authorization.length && !authorization.includes(authenticationState?.grade)) {
      return next({ path: '/error/needAuth' });
    }
  }

  next();
});

router.afterEach((to, from) => {
  useLoadingStore().setIsLoading(false);
});

export default router;
