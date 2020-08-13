import firebaseApi from '@/common/firebaseApi';

export default {
  state: {
    usersList: []
  },
  mutations: {
    setUsersList(state, list) {
      state.usersList = list;
    }
  },
  actions: {
    async getUsersList({state, commit}) {
      const users = await firebaseApi.loadUsersList();
      commit('setUsersList',
        Object.keys(users)
          .map(user => {
            return {uId: user, name: users[user].info.name};
          })
      );
    }
  },
  getters: {
    usersList: state => state.usersList
  }
};
