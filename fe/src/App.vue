<script setup>
// library
import { onBeforeMount, onMounted } from 'vue';

// component
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';

import Spinner from './views/normal/Spinner.vue';

// mixin
import { LOG, LOGD } from '@/mixin/log.js';

const setAppInfo = () => {
  const appInfo = `Schedule Checker ${import.meta.env.VITE_APP_SERVER} ${__APP_VERSION__}`;
  LOGD(appInfo);
  document.querySelector('title').innerText = appInfo;
};

onBeforeMount(() => {});

onMounted(() => {
  setAppInfo();
});
</script>

<template>
  <Spinner />
  <Menu />
  <main class="container py-2 my-3">
    <router-view />
  </main>
  <Footer />
</template>

<style scoped></style>
