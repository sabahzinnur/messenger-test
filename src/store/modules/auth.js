import firebase from 'firebase/app';

export default {
  state: {},
  mutations: {},
  actions: {
    async login({state, dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        dispatch('fetchInfo');
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async logout({commit}) {
      await firebase.auth().signOut();
      commit('clearInfo');
      commit('setMessages', []);
      commit('setConversations', []);
      commit('setActiveConversation', null);
    },
    async register({state, dispatch, commit}, {email, password, name, locale}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const userUid = await dispatch('getUserUid');
        await firebase.database().ref(`/users/${userUid}/info`).set({
          locale: locale,
          name: name
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    getUserUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    }
  },
  getters: {}
};
