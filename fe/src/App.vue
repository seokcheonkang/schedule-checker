<script setup>
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Menu />
  <main class="container py-2 my-3">
    <router-view />
  </main>
  <Footer />
</template>

<style scoped></style>
