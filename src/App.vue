<template>
  <div id="app" @selectConversation="changeList($event)">
    <component :is="layout"/>
  </div>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout';
import MainLayout from '@/layouts/MainLayout';

export default {
  components: {
    EmptyLayout,
    MainLayout,
  },
  computed: {
    layout() {
      const layoutName = this.$route.meta.layout;
      if (layoutName) {
        return `${layoutName}-layout`;
      }
      return 'empty-layout';
    },
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(error) {
      this.$message(this.$filters.localize(error.code || 'unknown-error'), 'error');
    },
  },
};
</script>
<style lang="scss">
  @import "assets/index.css";
</style>
