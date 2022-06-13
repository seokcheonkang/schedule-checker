<script setup>
// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';

// swal
import swal from 'sweetalert2';

const leave = (paramForParent) => {
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
</script>

<template>
  <CustomPageHeader text="프로필" />
  <div class="container">
    <div class="row align-items-center py-1">
      <div class="col-md-10 mx-auto col-lg-10">
        <div class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">프로필</h4>
          <div class="form-floating mb-3">
            <h5 class="text-muted">이름</h5>
            <div class="mb-3">홍길동</div>
            <h5 class="text-muted">이메일</h5>
            <div class="mb-3">you@example.com</div>
            <h5 class="text-muted">권한</h5>
            <div class="mb-3">일반</div>
          </div>
          <CustomActionButton text="회원 탈퇴" command="memberLeave" option1="btn-danger" @buttonClicked="leave" />
        </div>
      </div>
    </div>
  </div>
</template>
