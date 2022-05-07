<template>
  <CustomPageHeader text="회원 목록" />
  <CustomTableList command="memberList" />
</template>

<script setup>
// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomTableList from '@/components/CustomTableList.vue';
</script>
