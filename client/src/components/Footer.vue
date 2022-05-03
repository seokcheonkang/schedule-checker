<script setup>
// copyright[
const yyyy = new Date().getFullYear();
const author = 'yunbeom.kim@bespinglobal.com';
let copyright = `Copyright ${yyyy} ${author} All rights reserved.`;
// copyright]
</script>

<template>
  <div class="border-top">
    <p class="text-center text-muted mt-2">{{ copyright }}</p>
  </div>
</template>

<style scoped></style>
