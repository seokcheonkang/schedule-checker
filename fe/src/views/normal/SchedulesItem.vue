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
    schedule_code: null,
    title: null,
    status_val: null,
    total_count: null,
    completed_count: null,
    uncompleted_count: null,
    completed_user: null,
    uncompleted_user: null,
    regist_date: null,
    limit_date: null,
  },
});

const goBack = () => {
  router.go(-1);
};

const getScheduleInfo = async (schedule_code) => {
  const url = `${ENV_URL_BACKEND_HOME}/schedules/${schedule_code}`;
  const args = {};
  const header = {
    authorization: loginStore.accessToken,
  };

  const response = await API(CONSTANT.GET, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_200) {
    state.scheduleInfo.schedule_code = response.result.schedule_code;
    state.scheduleInfo.title = response.result.title;
    state.scheduleInfo.status_val = response.result.status_val;
    state.scheduleInfo.total_count = response.result.total_count;
    state.scheduleInfo.completed_count = response.result.completed_count;
    state.scheduleInfo.uncompleted_count = response.result.uncompleted_count;
    state.scheduleInfo.completed_user = response.result.completed_user.split(',').join('<br>');
    state.scheduleInfo.uncompleted_user = response.result.uncompleted_user.split(',').join('<br>');
    state.scheduleInfo.regist_date = response.result.regist_date;
    state.scheduleInfo.limit_date = response.result.limit_date;
  } else {
    LOGD(response.code);
  }
};

onBeforeMount(() => {
  LOGD(route.name);
});

onMounted(() => {
  getScheduleInfo(Number(route.params.schedule_code));
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
            <div class="mb-3">{{ state.scheduleInfo.schedule_code }}</div>
            <h5 class="text-muted">스케줄 상태</h5>
            <div class="mb-3">{{ state.scheduleInfo.status_val }}</div>
            <h5 class="text-muted">전체 / 완료 / 미완료</h5>
            <div class="mb-3">
              <span class="text-dark">
                {{ state.scheduleInfo.total_count }}
              </span>
              <span class="text-dark"> / </span>
              <span class="text-primary">
                {{ state.scheduleInfo.completed_count }}
              </span>
              <span class="text-dark"> / </span>
              <span class="text-warning">
                {{ state.scheduleInfo.uncompleted_count }}
              </span>
            </div>
            <h5 class="text-muted">완료</h5>
            <div class="mb-3 text-primary">
              <span v-html="state.scheduleInfo.completed_user"></span>
            </div>
            <h5 class="text-muted">미완료</h5>
            <div class="mb-3 text-warning">
              <span v-html="state.scheduleInfo.uncompleted_user"></span>
            </div>
            <h5 class="text-muted">등록일시</h5>
            <div class="mb-3">{{ state.scheduleInfo.regist_date }}</div>
            <h5 class="text-muted">만료일시</h5>
            <div class="mb-3">{{ state.scheduleInfo.limit_date }}</div>
          </div>
          <CustomActionButton text="목록" @click="goBack" />
        </div>
      </div>
    </div>
  </div>
</template>
