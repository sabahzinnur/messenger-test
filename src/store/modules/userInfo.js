import firebaseApi from '@/common/firebaseApi';

export default {
  state: {
    userInfo: {
      locale: 'ru-RU',
      email: '',
      name: ''
    }
  },
  mutations: {
    setLocale(state, locale) {
      state.userInfo.locale = locale;
    },
    setInfo(state, info) {
      state.userInfo = info;
    },
    clearInfo(state) {
      state.userInfo = {
        locale: 'ru-RU',
        email: '',
        name: ''
      };
    }
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      try {
        const userUid = await dispatch('getUserUid');
        await firebaseApi.loadUserInfo(userUid);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateInfo({dispatch, commit, getters}, payload) {
      try {
        const toUpdate = Object.assign({}, getters.info, payload);
        const userUid = await dispatch('getUserUid');
        await firebaseApi.updateUserInfo(userUid, toUpdate);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  },
  getters: {
    userInfo: state => state.userInfo
  }
};
