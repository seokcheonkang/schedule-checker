<template>
  <button type="button" :class="[option1, option2, option3]" @click="handleButtonClicked">{{ text }}</button>
</template>

<script setup>
// props
const props = defineProps({
  command: {
    type: String,
    default: 'memberJoin',
  },
  text: {
    type: String,
    default: '확인',
  },
  option1: {
    type: String,
    default: 'btn-dark',
  },
  option2: {
    type: String,
    default: 'btn btn-lg',
  },
  option3: {
    type: String,
    default: 'w-100',
  },
});

// emits
const emit = defineEmits(['buttonClicked']);

const handleButtonClicked = () => {
  let title = '';

  console.log(props.command);

  switch (props.command) {
    case 'scheduleConfirm':
      title = '앗!';
      const icon = 'warning';
      const text = '아직 공사중 입니다.';
      const footer = '<a href="/" class="btn btn-warning">홈으로</a>';

      emit('buttonClicked', title, icon, text, footer);
      break;
    default:
      title = `정말 ${props.text} 하시겠습니까?`;
      const showDenyButton = true;
      const confirmButtonText = '예';
      const denyButtonText = '아니오';
      const resultMessageY = '완료했습니다.';
      const resultMessageN = '취소했습니다.';

      emit('buttonClicked', title, showDenyButton, confirmButtonText, denyButtonText, resultMessageY, resultMessageN);
      break;
  }
};
</script>
