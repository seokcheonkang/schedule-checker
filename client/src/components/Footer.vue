<script setup>
// copyright[
const yyyy = new Date().getFullYear();
const author = 'yunbeom.kim@bespinglobal.com';
let copyright = `Copyright ${yyyy} ${author} All rights reserved.`;
// copyright]
</script>

<template>
  <div class="my-1 border-top">
    <p class="text-center text-muted">{{ copyright }}</p>
  </div>
</template>

<style scoped></style>
