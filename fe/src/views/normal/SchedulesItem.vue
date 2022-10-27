<script setup>
// library
import { onBeforeMount, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';

// data
import ScheduleMemberStatus from '@/flag/scheduleMemberStatus.json';

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
    content: null,
    is_expired: null,
  },
  targetInfo: {
    is_mine: false,
    user_email: null,
    status: null,
  },
});

const goList = () => {
  router.push({ name: 'Schedules' });
};

const getScheduleInfo = async (schedule_code) => {
  const url = `${ENV_URL_BACKEND_HOME}/schedules/${schedule_code}`;
  const args = {};
  const header = {
    authorization: loginStore.accessToken,
  };

  const response = await API(CONSTANT.GET, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_200) {
    state.scheduleInfo = response.result;
    state.scheduleInfo.completed_user = response.result.completed_user.split(',').join('<br>');
    state.scheduleInfo.uncompleted_user = response.result.uncompleted_user.split(',').join('<br>');
    state.scheduleInfo.content = response.result.content.replaceAll('\r', '<br>');
    state.scheduleInfo.content = response.result.content.replaceAll('\n', '<br>');
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

const getScheduleMemberInfo = async (schedule_code, user_email) => {
  const url = `${ENV_URL_BACKEND_HOME}/schedules/${schedule_code}/${user_email}`;
  const args = {};
  const header = {
    authorization: loginStore.accessToken,
  };

  const response = await API(CONSTANT.GET, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_200) {
    if (user_email === response?.result?.user_email) {
      state.targetInfo.is_mine = true;
      state.targetInfo.user_email = response.result.user_email;
      state.targetInfo.status = response.result.status;
    } else {
      state.targetInfo.is_mine = false;
      state.targetInfo.user_email = null;
      state.targetInfo.status = null;
    }
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

const updateSchedule = async () => {
  const schedule_code = state.scheduleInfo.schedule_code;
  const is_mine = state.targetInfo.is_mine;
  const user_email = state.targetInfo.user_email;
  const status = state.targetInfo.status;

  if (!is_mine) {
    swal.fire({
      icon: 'error',
      title: '현재 스케줄의 대상이 아닙니다.',
      text: MESSAGE.MESSAGE_HTTP_STATUS_401,
    });
    return;
  }

  const url = `${ENV_URL_BACKEND_HOME}/schedules/${schedule_code}/${user_email}`;
  const args = { status };
  const header = {
    authorization: loginStore.accessToken,
  };

  const response = await API(CONSTANT.PATCH, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_201) {
    swal.fire({
      icon: 'info',
      title: '수정 완료',
      text: MESSAGE.MESSAGE_HTTP_STATUS_200,
    });

    router.go(0);
  } else if (response.code === MESSAGE.CODE_ERR_BAD_REQUEST || response.code === MESSAGE.CODE_HTTP_STATUS_419) {
    swal.fire({
      icon: 'error',
      title: '에러',
      text: MESSAGE.MESSAGE_HTTP_STATUS_419,
    });
  } else {
    LOGD(response.code);
  }
};

const confirm = (paramForParent) => {
  const { title, showDenyButton, confirmButtonText, denyButtonText, resultMessageY, resultMessageN } = paramForParent;

  swal
    .fire({
      title,
      showDenyButton,
      confirmButtonText,
      denyButtonText,
    })
    .then((result) => {
      let resultMessage = resultMessageN;
      let confirmText = 'info';

      if (result.isConfirmed) {
        resultMessage = resultMessageY;
        confirmText = 'success';

        updateSchedule();
      }

      swal.fire(resultMessage, '', confirmText);
    });
};

onBeforeMount(() => {
  LOGD(route.name);
});

onMounted(() => {
  getScheduleInfo(Number(route.params.schedule_code));
  if (loginStore.isLogin) {
    getScheduleMemberInfo(Number(route.params.schedule_code), loginStore.userInfo.email);
  }
});
</script>

<template>
  <CustomPageHeader text="스케줄 상세" />
  <div class="container">
    <div class="row align-items-center my-3">
      <div class="col-md-10 mx-auto col-lg-10">
        <div class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">{{ state.scheduleInfo.title }}</h4>
          <div class="form-floating mb-3">
            <h5 class="mb-3">
              <span class="text-muted">순번 : </span>
              <span class="text-dark">
                {{ state.scheduleInfo.schedule_code }}
              </span>
            </h5>
            <h5 class="mb-3">
              <span class="text-muted">상태 : </span>
              <span class="text-dark">
                {{ state.scheduleInfo.status_val }}
              </span>
            </h5>
            <h5 class="mb-3">
              <span class="text-muted">전체 : </span>
              <span class="text-dark">
                {{ state.scheduleInfo.total_count }}
              </span>
            </h5>
            <h5 class="mb-3">
              <span class="text-muted">미완료 : </span>
              <span class="text-warning">
                {{ state.scheduleInfo.uncompleted_count }}
              </span>
            </h5>
            <div class="mb-3 text-warning">
              <span v-html="state.scheduleInfo.uncompleted_user"></span>
            </div>
            <h5 class="mb-3">
              <span class="text-muted">완료 : </span>
              <span class="text-primary">
                {{ state.scheduleInfo.completed_count }}
              </span>
            </h5>
            <div class="mb-3 text-primary">
              <span v-html="state.scheduleInfo.completed_user"></span>
            </div>
            <h5 class="mb-3">
              <span class="text-muted">등록일시 : </span>
              <span class="text-dark">
                {{ state.scheduleInfo.regist_date }}
              </span>
            </h5>
            <h5 class="mb-3">
              <span class="text-muted">만료일시 : </span>
              <span v-if="state.scheduleInfo.is_expired == 'Y'">
                <span class="txt-red">
                  {{ state.scheduleInfo.limit_date }}
                </span>
              </span>
              <span v-else>
                <span class="text-dark">{{ state.scheduleInfo.limit_date }} </span></span
              >
            </h5>
            <h5 class="mb-3 text-muted">내용</h5>
            <div class="mb-3">
              <span v-html="state.scheduleInfo.content"></span>
            </div>
          </div>
          <div v-if="state.targetInfo.is_mine">
            <hr />
            <h5 class="mb-3 text-muted">내 스케줄 진행 상태</h5>
            <div class="form-check" v-for="(column, index) in ScheduleMemberStatus">
              <input
                type="radio"
                name="myScheduleStatus"
                :id="column.option1"
                class="form-check-input"
                :value="column.key"
                v-model="state.targetInfo.status"
              />
              <label :for="column.option1" class="form-check-label" :class="column.option2">{{ column.val }}</label>
            </div>
            <hr />
            <CustomActionButton text="수정" command="scheduleConfirm" option1="btn-primary" @buttonClicked="confirm" />
          </div>
          <div v-else>
            <hr />
          </div>
          <CustomActionButton text="목록" @click="goList" />
        </div>
      </div>
    </div>
  </div>
</template>
