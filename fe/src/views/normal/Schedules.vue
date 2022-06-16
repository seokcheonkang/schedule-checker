<script setup>
import { onMounted, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

// vuejs-paginate
import Paginate from 'vuejs-paginate-next';

// mixin
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import { LOG } from '@/mixin/log.js';
import { HAS_AUTH } from '@/mixin/auth.js';

// store
import { useLoginStore } from '@/store/login.js';
import { useJwtStore } from '@/store/jwt.js';

// swal
import swal from 'sweetalert2';

// route
const route = useRoute();
const router = useRouter();

// store
const loginStore = useLoginStore();
const jwtStore = useJwtStore();

// env
const ENV_MODE = import.meta.env.MODE;
const ENV_URL_BACKEND_AUTH = import.meta.env.VITE_APP_BASE_URL_BACKEND_AUTH;
const ENV_URL_BACKEND_HOME = import.meta.env.VITE_APP_BASE_URL_BACKEND_HOME;

// state
const state = reactive({
  searchKey: '',
  searchValue: '',
});

if (!HAS_AUTH()) {
  router.push('/');

  swal.fire({
    title: '권한 없음',
    text: '해당 메뉴를 접근할 권한이 없습니다.',
    confirmButtonText: '확인',
  });
}

let schedules = null;

const getAuth = async () => {
  // Auth
  if (loginStore.isLogin) {
    const urlAuth = `${ENV_URL_BACKEND_AUTH}/auth/google/verify`;
    const argsAuth = {};
    const methodAuth = 'post';
    const headerAuth = {
      Authorization: jwtStore.accessToken,
    };

    console.log('abc', jwtStore.accessToken);

    // const response = await API(urlAuth, argsAuth, methodAuth, headerAuth);
    // LOG(ENV_MODE, JSON.stringify(response));
  }
};

const getSchedules = async () => {
  // TODO : sample
  // schedules = sample;
  // pagination.columns = schedules.columns;
  // pagination.colspan = schedules.columns.length;
  // pagination.oriList = schedules.dataList;

  // TODO : sample
  const url = `${ENV_URL_BACKEND_HOME}/schedules`;
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
};

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
    const key = state.searchKey;
    const val = state.searchValue;
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

onMounted(() => {
  LOG(ENV_MODE, route.name);

  getAuth();

  getSchedules();
});
</script>

<template>
  <CustomPageHeader :text="route.name" />
  <form class="d-flex justify-content-center my-3" @submit.prevent>
    <select class="form-select me-2 w-20" aria-label="searchOption" v-model="state.searchKey">
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
      v-model="state.searchValue"
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
