<script setup></script>

<template>
  <h1 class="text-center">Join</h1>
  <div class="container">
    <div class="row align-items-center py-1">
      <div class="col-md-10 mx-auto col-lg-10">
        <form class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">회원가입</h4>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingName" placeholder="홍길동" autofocus />
            <label for="floatingName">이름</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingEmail" placeholder="you@example.com" />
            <label for="floatingEmail">이메일</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">비밀번호</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingPasswordConfirm" placeholder="Password" />
            <label for="floatingPasswordConfirm">비밀번호 확인</label>
          </div>
          <button class="w-100 btn btn-lg btn-dark" type="button">가입 완료</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
