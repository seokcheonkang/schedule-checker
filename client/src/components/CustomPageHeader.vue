<template>
  <h1 class="text-center my-3">{{ text }}</h1>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '홈',
  },
});
</script>
