import firebaseApi from '@/common/firebaseApi';

export default {
  state: {
    conversations: [],
    activeConversation: null,
    activeConversationMessages: []
  },
  mutations: {
    setConversations(state, conversations) {
      state.conversations = [];
      state.conversations = conversations;
    },
    setActiveConversation(state, conversation) {
      state.activeConversation = conversation;
    },
    setMessages(state, messages) {
      state.activeConversationMessages = messages;
    }
  },
  actions: {
    async createConversation({state, dispatch, commit}, contactUId) {
      try {
        const userUid = await dispatch('getUserUid');
        await firebaseApi.createNewConversation(userUid, contactUId);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchUserConversations({state, dispatch, commit}) {
      try {
        const userUid = await dispatch('getUserUid');
        await firebaseApi.getUserConversations(userUid);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchConversation({state, dispatch, commit}, conversation) {
      if (conversation && conversation.uid) {
        commit('setActiveConversation', conversation);
        commit('setMessages', []);
        await firebaseApi.loadConversationMessages(conversation);
      }
    },
    async addMessage({state, commit, dispatch}, message) {
      const userUid = await dispatch('getUserUid');
      await firebaseApi
        .addMessageToConversation(state.activeConversation, message, userUid);
    },
    async getUserInfo(ctx, userUid) {
      return await firebaseApi.getUserInfo(userUid);
    }
  },
  getters: {
    conversations: state => state.conversations,
    activeConversation: state => state.activeConversation,
    messages: state => state.activeConversationMessages
  },
};
