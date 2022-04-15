<script setup>
// copyright[
const yyyy = new Date().getFullYear();
const author = 'yunbeom.kim@bespinglobal.com';
let copyright = `Copyright ${yyyy} ${author} All rights reserved.`;
// copyright]
</script>

<template>
  <div class="container-fluid">
    <div class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item">
          <router-link to="/" class="nav-link px-2 text-muted">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link px-2 text-muted">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/board" class="nav-link px-2 text-muted">Board</router-link>
        </li>
      </ul>
      <p class="text-center text-muted">{{ copyright }}</p>
    </div>
  </div>
</template>

<style scoped></style>
