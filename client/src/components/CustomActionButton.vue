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
  let paramForParent = {};

  switch (props.command) {
    case 'scheduleConfirm':
      paramForParent = {
        title: '앗!',
        icon: 'warning',
        text: '아직 공사중 입니다.',
        footer: '<a href="/" class="btn btn-warning">홈으로</a>',
      };
      break;
    default:
      paramForParent = {
        title: `정말 ${props.text} 하시겠습니까?`,
        showDenyButton: true,
        confirmButtonText: '예',
        denyButtonText: '아니오',
        resultMessageY: '완료했습니다.',
        resultMessageN: '취소했습니다.',
      };
      break;
  }

  emit('buttonClicked', paramForParent);
};
</script>
