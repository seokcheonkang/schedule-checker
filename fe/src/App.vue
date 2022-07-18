<script setup>
// library
import { onBeforeMount, onMounted } from 'vue';

// component
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';

import Spinner from './views/normal/Spinner.vue';

// mixin
import { LOG, LOGD } from '@/mixin/log.js';

let appInfo = null;
let appVersion = __APP_VERSION__;
const setAppInfo = () => {
  appInfo = `Schedule Checker ${import.meta.env.VITE_APP_SERVER?.substring(0, 3)}`;
  LOGD(appInfo + ` ${appVersion}`);
};
setAppInfo();

onBeforeMount(() => {});

onMounted(() => {});
</script>

<template>
  <Spinner />
  <Menu :appInfo="appInfo" />
  <main class="container py-2 my-3">
    <router-view />
  </main>
  <Footer :appVersion="appVersion" />
</template>

<style scoped></style>
