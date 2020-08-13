<template>
  <div class="main">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      isLoading: true,
    };
  },
  async mounted() {
    if (this.$route.query.message) {
      this.$message(this.$filters.localize(this.$route.query.message));
    }
    if (!Object.keys(this.$store.getters.userInfo).length > 0) {
      await this.$store.dispatch('fetchInfo');
    }
    this.isLoading = false;
    // set listeners
    this.$eventBus.$on('changeList', this.changeList);
  },
  beforeDestroy() {
    // disable listeners
    this.$eventBus.$off('changeList', this.changeList);
  },
  methods: {
    changeList(event) {
      this.$store.commit('setCurrentList', event);
    },
  },
  computed: {
    locale() {
      return this.$store.getters.userInfo.locale;
    },
  },
};
</script>
