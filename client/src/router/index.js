import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';

import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import Join from '../views/Join.vue';
import Find from '../views/Find.vue';

import Schedule from '../views/Schedule.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
