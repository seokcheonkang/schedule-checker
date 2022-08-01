<script setup>
// library
import { onBeforeMount, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

// chart
import ChartScheduleStatus from '@/views/admin/ChartScheduleStatus.vue';
import ChartScheduleProcess from '@/views/admin/ChartScheduleProcess.vue';
import ChartScheduleUser from '@/views/admin/ChartScheduleUser.vue';

// mixin
import { LOG, LOGD } from '@/mixin/log.js';

// store
import { useLoginStore } from '@/store/login.js';

// route
const route = useRoute();

onBeforeMount(() => {
  LOGD(route.name);
});

onMounted(() => {});
</script>

<template>
  <CustomPageHeader text="통계" option3="txt-admin" />
  <div class="table-responsive">
    <ChartScheduleStatus />
    <ChartScheduleProcess />
    <ChartScheduleUser />
  </div>
</template>
