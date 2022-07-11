<script setup>
import { onBeforeMount, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';

import ScheduleStatus from '@/flag/scheduleStatus.json';

// mixin
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import CONSTANT from '@/mixin/constant';
import { LOG, LOGD } from '@/mixin/log.js';
import { NOW_DATE, NOW_TIME } from '@/mixin/datetime.js';

// store
import { useLoginStore } from '@/store/login.js';

// swal
import swal from 'sweetalert2';
import { LOGOUT } from '../../mixin/logout';

// env
const ENV_URL_BACKEND_HOME = import.meta.env.VITE_APP_BASE_URL_BACKEND_HOME;

// route
const route = useRoute();
const router = useRouter();

// store
const loginStore = useLoginStore();

// state
const state = reactive({
  form: {
    title: '',
    content: '',
    status: '1',
    regist_date: NOW_DATE(),
    regist_time: NOW_TIME(),
    limit_date: NOW_DATE(),
    limit_time: '23:59:59',
    regist_user: loginStore.userInfo.name + '/' + loginStore.userInfo.email,
  },
  errors: [],
});

const goBack = () => {
  router.go(-1);
};

const createSchedule = async () => {
  const url = `${ENV_URL_BACKEND_HOME}/schedules/create`;
  const args = state.form;
  const header = {
    authorization: loginStore.accessToken,
  };

  const response = await API(CONSTANT.POST, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_201) {
    swal.fire({
      icon: 'info',
      title: '스케줄 생성 완료',
      text: MESSAGE.MESSAGE_HTTP_STATUS_201,
    });

    goBack();
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

const validation = {
  validateTitle: (limitLength = 30, title) => {
    let isValidate = true;
    if (!title) {
      isValidate = false;
      state.errors.push(`title은 반드시 입력해야 합니다.`);
    }
    if (title?.length > limitLength) {
      isValidate = false;
      state.errors.push(`title은 ${limitLength} 글자로 제한됩니다.`);
    }
    return isValidate;
  },
  validateContent: (limitLength = 4000, content) => {
    let isValidate = true;
    if (!content) {
      isValidate = false;
      state.errors.push(`content은 반드시 입력해야 합니다.`);
    }
    if (content?.length > limitLength) {
      isValidate = false;
      state.errors.push(`content은 ${limitLength} 글자로 제한됩니다.`);
    }
    return isValidate;
  },
  validateAll: () => {
    state.errors = [];
    if (!validation.validateTitle(30, state.form.title)) {
      return;
    }
    if (!validation.validateContent(4000, state.form.content)) {
      return;
    }
  },
};

const create = (paramForParent) => {
  validation.validateAll();

  if (state.errors.length === 0) {
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
        }

        swal.fire(resultMessage, '', confirmText);

        createSchedule();
      });
  }
};

onBeforeMount(() => {
  LOGD(route.name);
});

onMounted(() => {});
</script>

<template>
  <CustomPageHeader text="스케줄 생성" option3="txt-admin" />
  <div class="container">
    <div class="row align-items-center py-1">
      <div class="col-md-10 mx-auto col-lg-10">
        <form class="p-4 p-md-4 border rounded-3 bg-light" @input="validation.validateAll">
          <div v-if="state.errors.length">
            <ul class="errorMessage">
              <li v-for="error in state.errors">{{ error }}</li>
            </ul>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="title" placeholder="제목" v-model="state.form.title" />
            <label for="title">제목</label>
          </div>
          <div class="form-floating mb-3">
            <textarea
              class="form-control h-r10"
              id="content"
              v-model="state.form.content"
              placeholder="내용"
            ></textarea>
            <label for="content">내용</label>
          </div>
          <div class="form-floating mb-3">
            <select class="form-select me-2 p-select dpin" aria-label="searchOption" v-model="state.form.status">
              <option :value="column.key" v-for="column in ScheduleStatus">
                {{ column.val }}
              </option>
            </select>
          </div>
          <div class="form-floating mb-3">
            <input type="date" class="form-control" id="regist_date" v-model="state.form.regist_date" />
            <label for="regist_date">등록일자</label>
          </div>
          <div class="form-floating mb-3">
            <input type="time" class="form-control" id="regist_time" v-model="state.form.regist_time" />
            <label for="regist_time">등록시간</label>
          </div>
          <div class="form-floating mb-3">
            <input type="date" class="form-control" id="limit_date" v-model="state.form.limit_date" />
            <label for="limit_date">마감일자</label>
          </div>
          <div class="form-floating mb-3">
            <input type="time" class="form-control" id="limit_time" v-model="state.form.limit_time" />
            <label for="limit_time">등록시간</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="regist_user"
              placeholder="등록자"
              v-model="state.form.regist_user"
              readonly
            />
            <label for="regist_user">등록자</label>
          </div>
          <CustomActionButton text="완료" command="create" @buttonClicked="create" option1="btn-admin" />
          <CustomActionButton text="목록" @click="goBack" />
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.errorMessage {
  color: #842029;
  background-color: #f8d7da;
}
.errorMessage li {
  list-style-type: square;
}
</style>
