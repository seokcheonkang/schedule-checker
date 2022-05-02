<script setup></script>

<template>
  <h1 class="text-center">Notice</h1>
  <table class="table table-striped table-hover mt-1">
    <thead>
      <tr>
        <th scope="col" class="text-nowrap">순번</th>
        <th scope="col" class="text-nowrap">이름</th>
        <th scope="col" class="text-nowrap">제목</th>
        <th scope="col" class="text-nowrap">날짜</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">3</th>
        <td>김철수</td>
        <td>안녕하세요.</td>
        <td>2022-05-02 00:00:03</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>홍길동</td>
        <td>첫 게시물입니다.</td>
        <td>2022-05-02 00:00:02</td>
      </tr>
      <tr>
        <th scope="row">1</th>
        <td>관리자</td>
        <td>환영합니다.</td>
        <td>2022-05-02 00:00:01</td>
      </tr>
    </tbody>
  </table>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled">
        <a class="page-link">Previous</a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
