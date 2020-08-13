<template>
  <div
    class="list contacts"
    :style="{top: listOffset + 'px'}"
    @wheel.prevent="wheel"
  >
    <span>
      <contact v-for="contact in contacts"
               :key="contact.uId"
               :contact="contact"/>
    </span>
  </div>
</template>

<script>
import Contact from '@/components/app/Contact';
import listScrolling from '@/mixins/listScrolling';

export default {
  name: 'ContactsList',
  mixins: [listScrolling],
  components: {
    Contact,
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$store.dispatch('getUsersList');
  },
  computed: {
    contacts() {
      return this.$store.getters.usersList.filter(user => user.name !== this.$store.getters.userInfo.name);
    }
  },
  methods: {},
  watch: {
    contacts(newValue) {
      // set scrollable list size
      this.limit = 50 * newValue.length - 649;
    }
  },
};
</script>

<style scoped>
.contacts {
  display: block;
  z-index: 3;
  position: relative;
  min-height: 749px;
  transition: all .5s ease;
}
</style>
