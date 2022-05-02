<script setup></script>

<template>
  <h1 class="text-center">Login</h1>
  <div class="container">
    <div class="row align-items-center py-1">
      <div class="col-md-10 mx-auto col-lg-10">
        <form class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">로그인</h4>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" autofocus />
            <label for="floatingEmail">이메일</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">비밀번호</label>
          </div>
          <div class="checkbox mb-3">
            <label> <input type="checkbox" value="remember-me" />이메일 기억하기 </label>
          </div>
          <button class="w-100 btn btn-lg btn-dark" type="button">로그인</button>
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

<style scoped></style>
