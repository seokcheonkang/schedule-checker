<script setup>
// swal[
import swal from 'sweetalert2';
// swal]

const leave = () => {
  swal
    .fire({
      title: '정말 회원을 탈퇴하시겠습니까?',
      showDenyButton: true,
      confirmButtonText: '예',
      denyButtonText: '아니오',
    })
    .then((result) => {
      if (result.isConfirmed) {
        swal.fire('완료되었습니다.', '', 'success');
      } else if (result.isDenied) {
        swal.fire('취소하셨습니다.', '', 'info');
      }
    });
};
</script>

<template>
  <h1 class="text-center">Profile</h1>
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
          <button class="w-100 btn btn-lg btn-danger" type="button" @click="leave">회원탈퇴</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
