<script setup>
// library
import { onBeforeMount, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

// chart
import StatChartScheduleStatus from '@/views/admin/StatChartScheduleStatus.vue';
import StatChartScheduleProcess from '@/views/admin/StatChartScheduleProcess.vue';
import StatChartScheduleUser from '@/views/admin/StatChartScheduleUser.vue';

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
    <StatChartScheduleStatus />
    <StatChartScheduleProcess />
    <StatChartScheduleUser />
  </div>
</template>
