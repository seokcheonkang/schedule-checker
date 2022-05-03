import { createRouter, createWebHistory } from 'vue-router';

// normal
import Home from '../views/normal/Home.vue';

import Login from '../views/normal/Login.vue';
import Profile from '../views/normal/Profile.vue';
import Join from '../views/normal/Join.vue';
import Find from '../views/normal/Find.vue';

import Schedule from '../views/normal/Schedule.vue';

// admin
import MemberList from '../views/admin/MemberList.vue';

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
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
  },
  {
    path: '/admin/memberList',
    name: 'MemberList',
    component: MemberList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
