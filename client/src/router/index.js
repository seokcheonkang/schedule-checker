import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Board from '../views/Board.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/board',
    name: 'Board',
    component: Board,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
