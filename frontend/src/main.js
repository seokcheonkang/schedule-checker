import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import $api from './mixin/api';
import { logDebug, log } from './mixin/log';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// paginate
import Paginate from 'vuejs-paginate-next';

const app = createApp(App);
app.use(router);
app.use(VueSweetalert2);
app.use(Paginate);
app.mixin($api);
app.mixin(logDebug);
app.mixin(log);
app.mount('#app');
