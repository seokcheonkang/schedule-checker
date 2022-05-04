<script setup>
// Server Data
let schedules = [
  {
    seq: 3,
    userName: '관리자',
    title: '긴급 요청 사항입니다.',
    expiryDate: '2022-05-02 23:59:59',
    userImg: 'http://picsum.photos/20',
    isNew: true,
  },
  {
    seq: 2,
    userName: '관리자',
    title: '자격증 업데이트 부탁드립니다.',
    expiryDate: '2022-05-31 23:59:59',
    userImg: 'http://picsum.photos/20',
    isNew: false,
  },
  {
    seq: 1,
    userName: '관리자',
    title: '개인 영수증 정산 신청바랍니다.',
    expiryDate: '2022-05-03 23:59:59',
    userImg: 'http://picsum.photos/20',
    isNew: false,
  },
];
</script>

<template>
  <h1 class="text-center my-3">홈</h1>
  <!-- list-group[ -->
  <div class="list-group">
    <router-link
      :to="{ name: 'ScheduleView', params: { seq: schedule.seq } }"
      class="list-group-item list-group-item-action d-flex gap-3 py-3"
      aria-current="true"
      v-for="schedule in schedules"
    >
      <img
        :src="schedule.userImg"
        alt="이미지"
        width="30"
        height="30"
        class="rounded-circle flex-shrink-0 adjust__text1"
      />
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 class="mb-0">
            {{ schedule.title }}
          </h6>
          <p class="mb-0 opacity-75">{{ schedule.expiryDate }}</p>
        </div>
        <small class="opacity-50 text-nowrap">
          <span class="badge bg-warning text-dark">{{ schedule.isNew === true ? 'New' : '' }}</span>
        </small>
      </div>
    </router-link>
  </div>
  <!-- list-group] -->
</template>

<style scoped></style>
