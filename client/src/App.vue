<script setup>
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <header>
    <Menu />
  </header>
  <div class="container py-2">
    <main>
      <router-view />
    </main>
    <aside></aside>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped></style>
