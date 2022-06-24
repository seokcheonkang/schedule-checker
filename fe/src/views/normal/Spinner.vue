<script setup>
import { onBeforeMount, onMounted } from 'vue';

// store
import { useLoadingStore } from '@/store/loading.js';

// store
const loadingStore = useLoadingStore();

onBeforeMount(() => {});

onMounted(() => {});
</script>

<template>
  <div class="spinnerContainer" v-if="loadingStore.isLoading">
    <div class="spinner"></div>
    <div class="dim"></div>
  </div>
</template>

<style scoped>
.spinnerContainer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.spinnerContainer .dim {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}
.spinnerContainer .spinner {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 10px solid #fff;
  border-top: 10px solid rgb(46, 196, 182);
  border-radius: 50em;
  transition: all 0.2s;
  animation-name: spinCircle;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spinCircle {
  from {
    transform: translate(-50%, -50%) rotate(0);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
