<script setup>
// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';

// swal
import swal from 'sweetalert2';

let errors = $ref([]);

const form = $ref({
  userName: '',
  userEmail: '',
  userPassword: '',
  userPasswordConfirm: '',
});

const validation = {
  validateUserName: (limitLength = 30, name) => {
    let isValidate = true;

    if (!name) {
      isValidate = false;
      errors.push('이름은 반드시 입력해야 합니다.');
    }

    if (name.length > limitLength) {
      isValidate = false;
      errors.push(`이름은 ${limitLength} 글자로 제한됩니다.`);
    }

    return isValidate;
  },
  validateUserEmail: (limitLength = 30, email) => {
    let isValidate = true;

    const regEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regEx.test(email)) {
      isValidate = false;
      errors.push('이메일 형식이 맞지 않습니다.');
    }

    if (email.length > limitLength) {
      isValidate = false;
      errors.push(`이메일은 ${limitLength} 글자로 제한됩니다.`);
    }

    return isValidate;
  },
  validateUserPassword: (limitLength = 20, password, passwordConfirm) => {
    let isValidate = true;

    const minLength = 8;
    const maxLength = limitLength;

    const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (!regEx.test(password)) {
      isValidate = false;
      errors.push(
        `비밀번호는 최소 ${minLength}자, 최대 ${maxLength}자 그리고 하나 이상의 대문자, 소문자, 숫자, 특수 문자를 반드시 입력해야 합니다.`
      );
    }

    if (password !== passwordConfirm) {
      isValidate = false;
      errors.push('비밀번호와 비밀번호 확인의 값은 반드시 서로 같아야 합니다.');
    }

    return isValidate;
  },
  validateAll: () => {
    errors = [];

    const limitLength = 30;

    if (!validation.validateUserName(limitLength, form.userName)) {
      return;
    }

    if (!validation.validateUserEmail(limitLength, form.userEmail)) {
      return;
    }

    if (!validation.validateUserPassword(limitLength + 20, form.userPassword, form.userPasswordConfirm)) {
      return;
    }
  },
};

const submitForm = (paramForParent) => {
  validation.validateAll();

  if (errors.length === 0) {
    const { title, showDenyButton, confirmButtonText, denyButtonText, resultMessageY, resultMessageN } = paramForParent;

    swal
      .fire({
        title,
        showDenyButton,
        confirmButtonText,
        denyButtonText,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swal.fire(resultMessageY, '', 'success');
        } else if (result.isDenied) {
          swal.fire(resultMessageN, '', 'info');
        }
      });
  }
};
</script>

<template>
  <CustomPageHeader text="회원 가입" />
  <div class="container">
    <div class="row align-items-center py-1">
      <div class="col-md-10 mx-auto col-lg-10">
        <form class="p-4 p-md-4 border rounded-3 bg-light" @input="validation.validateAll">
          <h4 class="mb-3">회원 가입</h4>
          <div v-if="errors.length">
            <ul class="errorMessage">
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="userName" placeholder="홍길동" v-model="form.userName" />
            <label for="userName">이름</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="userEmail"
              v-model="form.userEmail"
              placeholder="you@example.com"
            />
            <label for="userEmail">이메일</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="userPassword"
              v-model="form.userPassword"
              placeholder="Password"
            />
            <label for="userPassword">비밀번호</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="userPasswordConfirm"
              v-model="form.userPasswordConfirm"
              placeholder="Password"
            />
            <label for="userPasswordConfirm">비밀번호 확인</label>
          </div>
          <CustomActionButton text="가입 완료" command="memberJoin" @buttonClicked="submitForm" />
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
