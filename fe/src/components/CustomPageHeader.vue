<script setup>
// props
const props = defineProps({
  text: {
    type: String,
    default: '홈',
  },
  option1: {
    type: String,
    default: 'text-center',
  },
  option2: {
    type: String,
    default: 'my-3',
  },
  option3: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <h1 :class="[option1, option2, option3]">{{ text }}</h1>
</template>
