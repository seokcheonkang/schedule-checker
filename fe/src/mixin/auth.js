// store
import { useLoginStore } from '@/store/login.js';

// store
const loginStore = useLoginStore();

const HAS_AUTH = () => {
  console.log('HAS_AUTH', loginStore.isLogin);

  if (loginStore.isLogin) {
    return true;
  }

  return false;
};

// const HAS_AUTH = async () => {
//   console.log('HAS_AUTH', loginStore.isLogin);

//   return await (() => {
//     if (loginStore.isLogin) {
//       return true;
//     }

//     return false;
//   })();
// };

export { HAS_AUTH };
