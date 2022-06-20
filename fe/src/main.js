import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import gAuthPlugin from 'vue3-google-oauth2';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// paginate
import Paginate from 'vuejs-paginate-next';

// loading
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

// pinia
const pinia = createPinia();
pinia.use(piniaPersist);

// gAuth
const gauthClientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(VueSweetalert2);
app.use(Paginate);

app.use(gAuthPlugin, {
  clientId: gauthClientId,
  prompt: 'consent',
  fetch_basic_profile: true,
});

app.mount('#app');
