<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';

import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';

onBeforeMount(() => {});

onMounted(() => {});
</script>

<template>
  <Menu />
  <main class="container py-2 my-3">
    <router-view />
  </main>
  <Footer />
</template>

<style scoped></style>
