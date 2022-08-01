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

const getScheduleStat = async () => {
  const url = `${ENV_URL_BACKEND_HOME}/stat/schedule/process`;
  const args = {};
  const header = {
    authorization: loginStore.accessToken,
  };

  const response = await API(CONSTANT.GET, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_200) {
    chart.data = response.result;
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

onMounted(() => {
  getScheduleStat();
});
</script>

<template>
  <h2 class="text-center mt-5">스케줄 상태 / 진행</h2>
  <Chart :data="chart.data" :direction="chart.direction" :margin="chart.margin" :size="chart.size">
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Bar :dataKeys="['기준', '확인']" :barStyle="{ fill: '#ffc107' }" />
      <Bar :dataKeys="['기준', '미확인']" :barStyle="{ fill: '#cccccc' }" />
      <Bar :dataKeys="['기준', '완료']" :barStyle="{ fill: '#0d6efd' }" />
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          확인: { color: '#ffc107' },
          미확인: { color: '#cccccc' },
          완료: { color: '#0d6efd' },
        }"
      />
    </template>
  </Chart>
</template>
