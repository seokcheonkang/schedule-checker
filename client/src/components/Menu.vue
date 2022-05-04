<script setup>
// swal
import swal from 'sweetalert2';

const logout = () => {
  swal.fire({
    icon: 'warning',
    title: '앗!',
    text: '아직 공사중 입니다.',
    footer: '<a href="/" class="btn btn-warning">홈으로</a>',
  });
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Main navigation">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="./index.html">Schedule Checker</a> -->
      <router-link class="navbar-brand" to="/">Schedule Checker</router-link>
      <button
        class="navbar-toggler p-0 border-0"
        type="button"
        id="navbarSideCollapse"
        aria-label="Toggle navigation"
        data-bs-toggle="collapse"
        data-bs-target="#navBarsMobile"
        aria-controls="navBarsMobile"
        aria-expanded="true"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse show" id="navBarsMobile">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/scheduleList">스케줄</router-link>
          </li>
          <!--
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="true"
              >관리</a
            >
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdown01">
              <li>
                <router-link class="dropdown-item" to="/admin/memberList">회원</router-link>
              </li>
            </ul>
          </li>
          -->
        </ul>
        <div class="d-flex">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="dropdown02"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <img id="profile_img" src="http://picsum.photos/20" class="rounded-circle" alt="사용자 이미지" />
              </a>
              <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-right" aria-labelledby="dropdown02">
                <li>
                  <router-link class="dropdown-item" to="/profile">프로필</router-link>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="logout">로그아웃</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="d-flex">
          <router-link class="btn btn-outline-light" id="btnLogin" to="/login">로그인</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
