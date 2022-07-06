<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';

import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';

import Spinner from './views/normal/Spinner.vue';

// store
import { useLoginStore } from '@/store/login.js';

// store
const loginStore = useLoginStore();

console.log(`GREETING : ${import.meta.env.VITE_APP_GREETING}`);

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
