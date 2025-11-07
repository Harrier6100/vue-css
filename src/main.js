import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import i18n from '@/i18n';
import router from '@/router';
import '@/assets/main.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'flag-icons/css/flag-icons.min.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(i18n);
app.use(router);
app.mount('#app');