<script setup>
// swal[
import swal from 'sweetalert2';
swal.fire({
  icon: 'warning',
  title: '앗!',
  text: '아직 공사중 입니다.',
  footer: '<a href="/" class="btn btn-warning">홈으로</a>',
});
// swal]
</script>

<template>
  <h1 class="text-center">Schedule</h1>
  <div>공사중...</div>
</template>

<style scoped></style>
