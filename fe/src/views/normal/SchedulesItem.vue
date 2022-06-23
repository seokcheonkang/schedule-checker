<script setup>
import { onBeforeMount, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';

// mixin
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import CONSTANT from '@/mixin/constant';
import { LOG, LOGD } from '@/mixin/log.js';

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

// state
const state = reactive({
  scheduleInfo: {
    seq: null,
    title: null,
    status: null,
    uncompletedCount: null,
    completedCount: null,
    insertDate: null,
  },
});

const confirm = () => {
  router.go(-1);
};

const getScheduleInfo = async (seq) => {
  const url = `${ENV_URL_BACKEND_HOME}/schedules/${seq}`;
  const args = {};
  const header = {
    authorization: loginStore.accessToken,
  };

  const response = await API(CONSTANT.GET, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_200) {
    state.scheduleInfo.seq = response.result.seq;
    state.scheduleInfo.title = response.result.title;
    state.scheduleInfo.status = response.result.status;
    state.scheduleInfo.completedCount = response.result.completedCount;
    state.scheduleInfo.uncompletedCount = response.result.uncompletedCount;
    state.scheduleInfo.insertDate = response.result.insertDate;
  } else {
    LOGD(response.code);
  }
};

onBeforeMount(() => {
  LOGD(route.name);
});

onMounted(() => {
  getScheduleInfo(Number(route.params.seq));
});
</script>

<template>
  <CustomPageHeader :text="route.name" />
  <div class="container">
    <div class="row align-items-center my-3">
      <div class="col-md-10 mx-auto col-lg-10">
        <div class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">{{ state.scheduleInfo.title }}</h4>
          <div class="form-floating mb-3">
            <h5 class="text-muted">순번</h5>
            <div class="mb-3">{{ state.scheduleInfo.seq }}</div>
            <h5 class="text-muted">제목</h5>
            <div class="mb-3">{{ state.scheduleInfo.title }}</div>
            <h5 class="text-muted">상태</h5>
            <div class="mb-3">{{ state.scheduleInfo.status }}</div>
            <h5 class="text-muted">미완료수</h5>
            <div class="mb-3">{{ state.scheduleInfo.completedCount }}</div>
            <h5 class="text-muted">완료수</h5>
            <div class="mb-3">{{ state.scheduleInfo.uncompletedCount }}</div>
            <h5 class="text-muted">등록일시</h5>
            <div class="mb-3">{{ state.scheduleInfo.insertDate }}</div>
          </div>
          <CustomActionButton text="확인" @click="confirm" />
        </div>
      </div>
    </div>
  </div>
</template>
