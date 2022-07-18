<script setup>
// props
const props = defineProps({
  appVersion: {
    type: String,
    default: '',
  },
});

// copyright
const yyyy = new Date().getFullYear();
const author = 'DevOps 2 team, BespinGlobalKorea';
let copyright = `Copyright ${yyyy} ${author} All rights reserved.`;
</script>

<template>
  <footer class="container py-2">
    <div class="border-top">
      <p class="text-center text-muted mt-2">{{ copyright }}</p>
    </div>
    <div>
      <p class="text-center text-muted mt-2">Ver. {{ props.appVersion }}</p>
    </div>
  </footer>
</template>
