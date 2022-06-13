<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';

import MemberGrade from '@/sampleData/memberGrade.json';
import MemberRegisterStatus from '@/sampleData/MemberRegisterStatus.json';

// swal
import swal from 'sweetalert2';

// Server Data
const item = {
  seq: 2,
  userEmail: 'yunbeom.kim@bespinglobal.com',
  userName: '김*범',
  userGrade: 99,
  userGradeVal: '관리자',
  registerDate: '2022-05-03 23:59:59',
  registerStatus: '2',
};

// route
const route = useRoute();
const seq = Number(route.params.seq); // 전달받은 파라미터

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
      if (result.isConfirmed) {
        swal.fire(resultMessageY, '', 'success');
      } else if (result.isDenied) {
        swal.fire(resultMessageN, '', 'info');
      }
    });
};

onMounted(() => {});
</script>

<template>
  <CustomPageHeader text="회원 상세" />
  <div class="container">
    <div class="row align-items-center my-3">
      <div class="col-md-10 mx-auto col-lg-10">
        <div class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">{{ item.userName }}</h4>
          <div class="form-floating mb-3">
            <h5 class="text-muted mb-3">
              <span>순번</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ item.seq }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>이메일</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ item.userEmail }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>이름</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ item.userName }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>회원등급</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ item.userGrade }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>회원등급(값)</span>
              <span>&nbsp;:&nbsp;</span>
              <span>
                <select class="form-select me-2 w-20 dpin" aria-label="searchOption" v-model="item.userGrade">
                  <option :value="column.key" v-for="column in MemberGrade">
                    {{ column.val }}
                  </option>
                </select>
              </span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>가입일시</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ item.registerDate }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>가입상태</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ item.registerStatus }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>가입상태(값)</span>
              <span>&nbsp;:&nbsp;</span>
              <span>
                <select class="form-select me-2 w-20 dpin" aria-label="searchOption" v-model="item.registerStatus">
                  <option :value="column.key" v-for="column in MemberRegisterStatus">
                    {{ column.val }}
                  </option>
                </select>
              </span>
            </h5>
          </div>
          <CustomActionButton text="회원 수정" command="memberConfirm" @buttonClicked="confirm" />
        </div>
      </div>
    </div>
  </div>
</template>
