<script setup>
import { onBeforeMount, onMounted, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

// vuejs-paginate
import Paginate from 'vuejs-paginate-next';

// mixin
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import CONSTANT from '@/mixin/constant';
import { LOG } from '@/mixin/log.js';

// store
import { useLoginStore } from '@/store/login.js';

// swal
import swal from 'sweetalert2';

// route
const route = useRoute();
const router = useRouter();

// env
const ENV_MODE = import.meta.env.MODE;
const ENV_URL_BACKEND_MEMBER = import.meta.env.VITE_APP_BASE_URL_BACKEND_MEMBER;

// store
const loginStore = useLoginStore();

// state
const state = reactive({
  searchKey: '',
  searchValue: '',
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
    const key = state.searchKey;
    const val = state.searchValue?.toLowerCase();
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

const getMembers = async () => {
  const url = `${ENV_URL_BACKEND_MEMBER}/members`;
  const args = {};
  const method = 'get';
  const header = {
    Authorization: loginStore.accessToken,
  };

  LOG(ENV_MODE, url, JSON.stringify(args), method);

  const response = await API(method, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_200) {
    LOG(ENV_MODE, JSON.stringify(response));

    pagination.columns = response.result.columns;
    pagination.colspan = response.result.columns.length;
    pagination.oriList = response.result.dataList;
  } else if (response.code === MESSAGE.CODE_ERR_BAD_REQUEST || response.code === MESSAGE.CODE_HTTP_STATUS_419) {
    loginStore.setIsLogin(false);
    loginStore.setLoginInfo(null);
    loginStore.setRole(null);
    loginStore.setAccessToken(null);
    loginStore.setRefreshToken(null);

    swal.fire({
      icon: 'error',
      title: '에러',
      text: MESSAGE.MESSAGE_HTTP_STATUS_419,
    });

    router.push('/');
  } else {
    LOG(ENV_MODE, response.code);
  }
};

onBeforeMount(() => {
  LOG(ENV_MODE, route.name);
});

onMounted(() => {
  getMembers();
});
</script>

<template>
  <CustomPageHeader text="회원 목록" />
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
          <td class="text-center" title="이메일">
            <router-link :to="{ path: `/admin/members/${item.seq}` }" class="btn-td">
              {{ item.userEmail }}
            </router-link>
          </td>
          <td class="text-center" title="이름">
            <router-link :to="{ path: `/admin/members/${item.seq}` }" class="btn-td">
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
