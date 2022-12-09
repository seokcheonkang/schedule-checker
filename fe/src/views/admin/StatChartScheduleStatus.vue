<script setup>
// library
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// chart
import { Chart, Grid, Bar, Line, Tooltip } from 'vue3-charts';

// mixin
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import CONSTANT from '@/mixin/constant';
import { LOG, LOGD } from '@/mixin/log.js';
import { LOGOUT } from '@/mixin/logout.js';
import { NOW_DATE, NOW_TIME, getYyyy } from '@/mixin/datetime.js';

// store
import { useLoginStore } from '@/store/login.js';

// swal
import swal from 'sweetalert2';

// env
const ENV_URL_BACKEND_HOME = import.meta.env.VITE_APP_BASE_URL_BACKEND_HOME;

// route
const route = useRoute();
const router = useRouter();

// store
const loginStore = useLoginStore();

const chart = reactive({
  data: [],
  direction: 'horizontal',
  margin: {
    left: 0,
    top: 20,
    right: 20,
    bottom: 0,
  },
  size: { width: 1200, height: 400 },
});

const getChart = async () => {
  const url = `${ENV_URL_BACKEND_HOME}/stat/schedule/status?yyyy=${getYyyy()}`;
  const args = {};
  const header = {
    authorization: loginStore.accessToken,
  };

  const response = await API(CONSTANT.GET, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_200) {
    chart.data = response.result;
  } else if (response.code === MESSAGE.CODE_HTTP_STATUS_204) {
    chart.data = [{ 기준: '없음', 준비: '0', 취소: '0', 만료: '0', 진행: '0' }];
  } else if (response.code === MESSAGE.CODE_ERR_BAD_REQUEST || response.code === MESSAGE.CODE_HTTP_STATUS_419) {
    swal.fire({
      icon: 'error',
      title: '에러',
      text: MESSAGE.MESSAGE_HTTP_STATUS_419,
    });

    LOGOUT(router);
  } else {
    LOGD(response.code);
  }
};

onBeforeMount(() => {
  // LOGD(route.name);
});

onMounted(() => {
  getChart();
});
</script>

<template>
  <h2 class="text-center mt-5">스케줄 현황</h2>
  <Chart :data="chart.data" :direction="chart.direction" :margin="chart.margin" :size="chart.size">
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Bar :dataKeys="['기준', '준비']" :barStyle="{ fill: '#ffc107' }" />
      <Bar :dataKeys="['기준', '취소']" :barStyle="{ fill: '#cccccc' }" />
      <Bar :dataKeys="['기준', '만료']" :barStyle="{ fill: '#ff0000' }" />
      <Bar :dataKeys="['기준', '진행']" :barStyle="{ fill: '#0d6efd' }" />
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          준비: { color: '#ffc107' },
          취소: { color: '#cccccc' },
          만료: { color: '#ff0000' },
          진행: { color: '#0d6efd' },
        }"
      />
    </template>
  </Chart>
</template>
