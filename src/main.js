import Vue from 'vue';
import VueMeta from 'vue-meta';
import {
  extend,
  localize,
  ValidationObserver,
  ValidationProvider
} from 'vee-validate';
import en from 'vee-validate/dist/locale/en.json';
import ru from 'vee-validate/dist/locale/ru.json';
import * as rules from 'vee-validate/dist/rules';
// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from '@/config/firebaseConfig';

import App from './App.vue';
import router from './router';
import store from './store';

import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import localizeFilter from './filters/localize.filter';

import tooltipDirective from './directives/tooltip.directive';

import messagePlugin from './utils/messagePlugin';
import titlePlugin from './utils/title.plugin';

import Loader from './components/app/Loader';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(VueMeta);

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);

// Global events hub
Vue.prototype.$eventBus = new Vue();
// Filters functions
Vue.prototype.$filters = Vue.options.filters;

Vue.directive('tooltip', tooltipDirective);

// install rules and localization for validation
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

localize({
  en,
  ru,
});

Vue.component('Loader', Loader);

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
