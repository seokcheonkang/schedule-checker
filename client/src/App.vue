<template>
  <header>
    <Menu />
  </header>
  <div class="container py-2">
    <main class="my-3">
      <router-view />
    </main>
    <aside></aside>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script setup>
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';
</script>

<style scoped></style>
