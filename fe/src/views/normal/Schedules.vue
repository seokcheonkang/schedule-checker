<script setup>
import { onMounted, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

// vuejs-paginate
import Paginate from 'vuejs-paginate-next';

// mixin
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import { LOG } from '@/mixin/log.js';

// route
const route = useRoute();

// env
const ENV_MODE = import.meta.env.MODE;
const ENV_BACKEND_URL = import.meta.env.VITE_APP_BASE_URL_BACKEND_HOME;

// TODO : sample
// import sample from '@/sampleData/schedules.json';

// search
const searchKey = $ref('');
const searchValue = $ref('');

let schedules = null;

// life cycle
onMounted(async () => {
  LOG(ENV_MODE, route.name);

  // TODO : sample
  // schedules = sample;
  // pagination.columns = schedules.columns;
  // pagination.colspan = schedules.columns.length;
  // pagination.oriList = schedules.dataList;

  // TODO : sample
  const url = `${ENV_BACKEND_URL}/schedules`;
  const args = {};
  const method = 'get';

  LOG(ENV_MODE, url, JSON.stringify(args), method);

  schedules = await API(url, args, method);

  if (schedules.code === MESSAGE.CODE_HTTP_STATUS_200) {
    LOG(ENV_MODE, schedules);

    pagination.columns = schedules.result.columns;
    pagination.colspan = schedules.result.columns.length;
    pagination.oriList = schedules.result.dataList;
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
    const val = searchValue;
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
  <CustomPageHeader :text="route.name" />
  <form class="d-flex justify-content-center my-3" @submit.prevent>
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
          <td class="text-center" title="제목">
            <router-link :to="{ path: `/schedules/${item.seq}` }" class="btn__td">
              {{ item.title }}
            </router-link>
          </td>
          <td class="text-center" title="상태">{{ item.status }}</td>
          <td class="text-center" title="미완료수">{{ item.uncompletedCount }}</td>
          <td class="text-center" title="완료수">{{ item.completedCount }}</td>
          <td class="text-center" title="등록일시">{{ item.insertDate }}</td>
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
