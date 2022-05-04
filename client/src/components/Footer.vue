<template>
  <div class="border-top">
    <p class="text-center text-muted mt-2">{{ copyright }}</p>
  </div>
</template>

<script setup>
// copyright
const yyyy = new Date().getFullYear();
const author = 'DevOps 2 team, BespinGlobalKorea';
let copyright = `Copyright ${yyyy} ${author} All rights reserved.`;
</script>
