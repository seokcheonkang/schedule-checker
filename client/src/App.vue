<script setup></script>

<template>
  <header></header>
  <nav>
    <span>
      <router-link to="/">Home</router-link>
    </span>
    <span> | </span>
    <span>
      <router-link to="/about">About</router-link>
    </span>
  </nav>
  <main>
    <router-view />
  </main>
  <aside></aside>
  <footer></footer>
</template>

<style scoped></style>
