<script setup>
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <header>
    <Menu />
  </header>
  <nav></nav>
  <main>
    <router-view />
  </main>
  <aside></aside>
  <footer>
    <Footer />
  </footer>
</template>

<style scoped></style>
