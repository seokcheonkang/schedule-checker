<script setup>
import { onMounted, reactive, computed } from 'vue';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

// vuejs-paginate
import Paginate from 'vuejs-paginate-next';

// mixin
import API from '@/mixin/api.js';
import { LOGD, LOG } from '@/mixin/log.js';

// env
const backEndUrl = import.meta.env.VITE_APP_BASE_URL_BACKEND;

// TODO : sample
// import members from '@/sampleData/members.json';

// search
const searchKey = $ref('');
const searchValue = $ref('');

let members = null;

// life cycle
onMounted(async () => {
  // TODO : sample
  // pagination.columns = members.columns;
  // pagination.colspan = members.columns.length;
  // pagination.oriList = members.dataList;

  // TODO : sample
  members = await API(`${backEndUrl}/members`, {}, 'get');

  import.meta.env.DEV
    ? LOGD(members.resultCode, members.resultMessage)
    : LOG(members.resultCode, members.resultMessage);

  if (members.resultCode === 'A000') {
    pagination.columns = members.data.columns;
    pagination.colspan = members.data.columns.length;
    pagination.oriList = members.data.dataList;
  }
});

// list for pagination
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
    const key = searchKey;
    const val = searchValue?.toLowerCase();
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
</script>

<template>
  <CustomPageHeader text="회원 목록" />
  <form class="d-flex justify-content-center my-3">
    <select class="form-select me-2 w-20" aria-label="searchOption" v-model="searchKey">
      <option value="">선택</option>
      <option :value="column.key" v-for="column in pagination.columns">
        {{ column.val }}
      </option>
    </select>
    <input
      class="form-control me-2 w-50"
      type="search"
      placeholder="검색어"
      aria-label="검색"
      v-model="searchValue"
      @input="pagination.getSearchList"
    />
  </form>
  <div class="table-responsive">
    <table class="table table-light table-hover">
      <thead>
        <tr>
          <th class="text-center text-nowrap" v-for="column in pagination.columns">{{ column.val }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="!pagination?.calculatedList?.length">
          <td class="text-center" :colspan="pagination.colspan">조회된 결과가 없습니다.</td>
        </tr>
        <tr v-for="item in pagination.calculatedList" role="button">
          <td class="text-center" title="순번">{{ item.seq }}&nbsp;</td>
          <td class="text-center" title="이메일">
            <router-link :to="{ path: `/admin/members/${item.seq}` }" class="btn__td">
              {{ item.userEmail }}
            </router-link>
          </td>
          <td class="text-center" title="이름">
            <router-link :to="{ path: `/admin/members/${item.seq}` }" class="btn__td">
              {{ item.userName }}
            </router-link>
          </td>
          <td class="text-center" title="회원등급">{{ item.userGrade }}</td>
          <td class="text-center" title="회원등급(값)">{{ item.userGradeVal }}</td>
          <td class="text-center" title="가입일시">{{ item.registerDate }}</td>
          <td class="text-center" title="가입상태">{{ item.registerStatus }}</td>
          <td class="text-center" title="가입상태(값)">{{ item.registerStatusVal }}</td>
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
      :containerClass="'pagination justify-content-center btn py-3'"
    >
    </paginate>
  </div>
</template>
