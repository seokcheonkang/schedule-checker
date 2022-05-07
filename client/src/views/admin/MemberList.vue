<template>
  <CustomPageHeader text="회원 목록" />
  <form class="d-flex justify-content-center my-3">
    <select class="form-select me-2 w-20" aria-label="searchOption" ref="searchKey">
      <option value="">선택</option>
      <option value="userEmail">이메일</option>
      <option value="userName">이름</option>
    </select>
    <input
      class="form-control me-2 w-75"
      type="search"
      placeholder="검색어"
      aria-label="검색"
      ref="searchValue"
      @input="pagination.getSearchList"
    />
  </form>
  <div class="table-responsive">
    <table class="table table-light table-hover">
      <thead>
        <tr>
          <th class="text-center text-nowrap">순번</th>
          <th class="text-center text-nowrap">이메일</th>
          <th class="text-center text-nowrap">이름</th>
          <th class="text-center text-nowrap">권한</th>
          <th class="text-center text-nowrap">가입일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pagination.calculatedList" role="button">
          <td class="text-center">{{ item.seq }}&nbsp;</td>
          <td class="text-center">{{ item.userEmail }}</td>
          <td class="text-center">
            <!-- <router-link :to="{ name: 'MemberItem', params: { seq: item.seq } }" class="btn__td">
              {{ item.userName }}
            </router-link> -->
            {{ item.userName }}
          </td>
          <td class="text-center">{{ setAuth(item.auth) }}</td>
          <td class="text-center">{{ item.insDate }}</td>
        </tr>
        <tr v-show="!pagination?.calculatedList?.length">
          <td class="text-center" :colspan="pagination.colspan">조회된 결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-show="pagination?.calculatedList?.length">
    <paginate
      v-model="pagination.curPage"
      :pageCount="pagination.pageCnt"
      :clickHandler="pagination.setPageCnt"
      :pageRange="1"
      :marginPages="1"
      :prevText="'이전'"
      :nextText="'다음'"
      :firstLastButton="true"
      :firstButtonText="'처음'"
      :lastButtonText="'끝'"
      :containerClass="'pagination justify-content-center btn py-3 px-1'"
    >
    </paginate>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from 'vue';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

// Paginate
import Paginate from 'vuejs-paginate-next';

import memberList from '@/sampleData/memberList.json';

// search
const searchKey = ref('');
const searchValue = ref('');

onMounted(() => {
  searchValue.value.focus();
});

// list
const pagination = reactive({
  curPage: 1, // 현재 페이지. ex) 1, 2, ..., 10
  perPage: 10, // 페이지마다 출력할 게시물 수. ex) 10, 9, ..., 1
  pageCnt: 10, // 총 페이지 수. ex) 처음|이전|1|2, ..., 10|다음|끝
  colspan: 4, // 표시할 칼럼 수
  calculatedList: computed(() => {
    return pagination.getSearchList();
  }),
  setPageCnt: () => {
    pagination.pageCnt = Math.ceil(pagination?.list?.length / pagination.perPage);
  },
  getSearchList: () => {
    const key = searchKey?.value?.value;
    const val = searchValue?.value?.value?.toLowerCase();

    if (key && val) {
      pagination.list = pagination.oriList.filter((item) => {
        if (item[key]?.includes(val)) {
          return item;
        }
      });
    } else {
      pagination.list = pagination.oriList;
    }

    pagination.setPageCnt();

    return pagination?.list?.slice(
      (pagination.curPage - 1) * pagination.perPage,
      pagination.curPage * pagination.perPage
    );
  },
});

const setAuth = (auth) => {
  switch (auth) {
    case 1:
      return '일반';
      break;
    case 98:
      return '운영자';
      break;
    case 99:
      return '관리자';
      break;
    default:
      return '손님';
      break;
  }
};

pagination.oriList = memberList;
pagination.colspan = 5;

pagination.list = pagination.oriList;
</script>
