<script setup></script>

<template>
  <h1 class="text-center">비밀번호 찾기</h1>
  <div class="container">
    <div class="row align-items-center py-1">
      <div class="col-md-10 mx-auto col-lg-10">
        <form class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">비밀번호 찾기</h4>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingEmail" placeholder="you@example.com" />
            <label for="floatingEmail">이메일</label>
          </div>
          <button class="w-100 btn btn-lg btn-dark" type="button">이메일 전송</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
