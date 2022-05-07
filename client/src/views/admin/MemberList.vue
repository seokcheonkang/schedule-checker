<template>
  <CustomPageHeader text="회원 목록" />
  <CustomList command="memberList" />
</template>

<script setup>
// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomList from '@/components/CustomList.vue';
</script>
