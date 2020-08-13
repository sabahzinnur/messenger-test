import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from '@/store/modules/userInfo';
import conversations from '@/store/modules/conversations';
import contacts from '@/store/modules/contacts';
import auth from '@/store/modules/auth';
import app from '@/store/modules/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state, error) {
      state.error = null;
    }
  },
  actions: {},
  getters: {
    error: state => state.error
  },
  modules: {
    userInfo,
    conversations,
    contacts,
    auth,
    app
  }
});
