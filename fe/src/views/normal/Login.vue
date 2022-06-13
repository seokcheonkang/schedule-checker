<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';

// mixin
import API from '@/mixin/api.js';
import { LOGD, LOG } from '@/mixin/log.js';

// store
import { useLoginStore } from '@/store/login.js';

// swal
import swal from 'sweetalert2';

// env
const backEndUrl = import.meta.env.VITE_APP_BASE_URL_BACKEND_AUTH;

const store = useLoginStore();
const router = useRouter();

const state = reactive({
  form: {
    userEmail: '',
    userPassword: '',
  },
});

const login = async () => {
  const args = {
    userEmail: state.form.userEmail,
    userPassword: state.form.userPassword,
  };

  const tokens = await API(`${backEndUrl}/sign/in`, args, 'post');

  import.meta.env.DEV ? LOGD(tokens.resultCode, tokens.resultMessage) : LOG(tokens.resultCode, tokens.resultMessage);

  if (tokens.resultCode === 'A000') {
    const accessToken = tokens.data.accessToken;
    store.setAccessToken(accessToken);
    store.setIsLogin(true);
    router.push({ path: '/' });
  } else {
    swal.fire({
      title: '로그인 실패',
      text: '아이디와 비밀번호를 다시 확인해주세요.',
      confirmButtonText: '확인',
    });
  }
};
</script>

<template>
  <CustomPageHeader text="로그인" />
  <div class="container">
    <div class="row align-items-center py-1">
      <div class="col-md-10 mx-auto col-lg-10">
        <form class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">로그인</h4>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="userEmail"
              placeholder="name@example.com"
              v-model="state.form.userEmail"
              autofocus="autofocus"
            />
            <label for="userEmail">이메일</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="userPassword"
              v-model="state.form.userPassword"
              placeholder="Password"
            />
            <label for="userPassword">비밀번호</label>
          </div>
          <CustomActionButton text="로그인" @click="login" />
          <hr class="my-4" />
          <div class="mb-1">
            <small class="text-muted"
              >아이디나 비밀번호를 잃어버리셨나요? <router-link to="/find" class="text-reset">찾기</router-link></small
            >
          </div>
          <div class="mb-1">
            <small class="text-muted"
              >계정이 없으신가요? <router-link to="/join" class="text-reset">가입</router-link></small
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
