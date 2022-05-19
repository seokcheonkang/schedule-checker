<script setup>
// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';
</script>

<template>
  <CustomPageHeader text="비밀번호 찾기" />
  <div class="container">
    <div class="row align-items-center py-1">
      <div class="col-md-10 mx-auto col-lg-10">
        <form class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">비밀번호 찾기</h4>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingEmail" placeholder="you@example.com" />
            <label for="floatingEmail">이메일</label>
          </div>
          <CustomActionButton text="이메일 전송" />
        </form>
      </div>
    </div>
  </div>
</template>
