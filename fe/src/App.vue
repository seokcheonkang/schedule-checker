<script setup>
// library
import { onBeforeMount, onMounted, ref } from 'vue';

// component
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';

import Spinner from './views/normal/Spinner.vue';

// mixin
import { LOG, LOGD } from '@/mixin/log.js';

LOGD(`${import.meta.env.VITE_APP_GREETING}`);

onBeforeMount(() => {});

onMounted(() => {});
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
