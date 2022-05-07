<template>
  <form class="d-flex justify-content-center my-3">
    <select class="form-select me-2 w-20" aria-label="searchOption" v-model="searchKey">
      <option value="">선택</option>
      <option :value="column.key" v-for="column in pagination.columns">{{ column.value }}</option>
    </select>
    <input
      class="form-control me-2 w-50"
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
          <th class="text-center text-nowrap" v-for="column in pagination.columns">{{ column.value }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pagination.calculatedList" role="button" v-if="props.command === 'memberList'">
          <td class="text-center">{{ item.seq }}&nbsp;</td>
          <td class="text-center">{{ item.userName }}</td>
          <td class="text-center">{{ item.userEmail }}</td>
          <td class="text-center">{{ item.auth }}</td>
          <td class="text-center">{{ item.authValue }}</td>
          <td class="text-center">{{ item.insDate }}</td>
        </tr>
        <tr v-for="item in pagination.calculatedList" role="button" v-else>
          <td class="text-center">{{ item.seq }}&nbsp;</td>
          <td class="text-center">{{ item.userName }}</td>
          <td class="text-center">
            <router-link :to="{ name: 'ScheduleItem', params: { seq: item.seq } }" class="btn__td">
              {{ item.title }}
            </router-link>
          </td>
          <td class="text-center">{{ item.expiryDate }}</td>
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

// Paginate
import Paginate from 'vuejs-paginate-next';

import scheduleList from '@/sampleData/scheduleList.json';
import memberList from '@/sampleData/memberList.json';

// search
const searchKey = ref('');
const searchValue = ref('');

onMounted(() => {
  searchValue.value.focus();
});

// props
const props = defineProps({
  command: {
    type: String,
    default: '',
  },
});

// list
const pagination = reactive({
  curPage: 1, // 현재 페이지. ex) 1, 2, ..., 10
  perPage: 10, // 페이지마다 출력할 게시물 수. ex) 10, 9, ..., 1
  pageCnt: 10, // 총 페이지 수. ex) 처음|이전|1|2, ..., 10|다음|끝
  colspan: 4, // 표시할 칼럼 수
  oriList: [],
  list: [],
  calculatedList: computed(() => {
    return pagination.getSearchList();
  }),
  setPageCnt: () => {
    pagination.pageCnt = Math.ceil(pagination?.list?.length / pagination.perPage);
  },
  getSearchList: () => {
    const key = searchKey?.value;
    const val = searchValue?.value?.value?.toLowerCase();
    if (key && val) {
      pagination.curPage = 1;
      pagination.list = pagination.oriList.filter((item) => {
        if (item[key].toString().includes(val)) {
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

(() => {
  let targetList = null;

  switch (props.command) {
    case 'memberList':
      targetList = memberList;
      break;
    default:
      targetList = scheduleList;
      break;
  }

  pagination.columns = targetList.columns;
  pagination.colspan = targetList.columns.length;

  pagination.oriList = targetList.dataList;
})();
</script>
