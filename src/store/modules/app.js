export default {
  state: {
    currentList: 'conversations',
    loading: false
  },
  mutations: {
    setCurrentList(state, listName) {
      state.currentList = listName || 'conversations';
    },
    setLoading(state, value) {
      state.loading = value;
    }
  },
  actions: {},
  getters: {
    currentList: state => state.currentList,
    loading: state => state.loading
  },
};
