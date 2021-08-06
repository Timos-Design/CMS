import Vue from 'vue';
import Vuement from 'vuement';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { Auth } from './utils/auth';

Vue.config.productionTip = false;

Vue.use(Vuement);

Auth.register(router, 'login');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
