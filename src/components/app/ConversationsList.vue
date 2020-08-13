<template>
  <div
    class="list conversations"
    :style="{top: listOffset + 'px'}"
    @wheel.prevent="wheel"
  >
            <span
              v-for="(conversation, index) in conversations"
              :key="index"
              @click="setActive(conversation)"
            >
              <Conversation
                :conversation="conversation"
                :active="activeConversation === conversation"
                :date="date"
              />
            </span>
  </div>
</template>

<script>
import Conversation from '@/components/app/Conversation';
import listScrolling from '@/mixins/listScrolling';

export default {
  name: 'ConversationsList',
  components: {
    Conversation,
  },
  mixins: [listScrolling],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    conversations() {
      return this.$store.getters.conversations;
    },
    activeConversation() {
      return this.$store.getters.activeConversation;
    },
  },
  async mounted() {
    await this.$store.dispatch('fetchUserConversations');
  },
  methods: {
    async setActive(conversation) {
      if (conversation !== this.activeConversation) {
        this.$store.commit('setLoading', true);
        await this.$store.dispatch('fetchConversation', conversation);
        this.$store.commit('setLoading', false);
      }
    }
  },
  watch: {
    conversations(newValue) {
      // set scrollable list size
      this.limit = 100 * newValue.length - 649;
    }
  },
};
</script>

<style scoped>
.conversations {
  display: block;
  min-height: 749px;
  position: relative;
  z-index: 1;
  top: 0;
  justify-content: space-between;
  transition: all .5s ease;
}
</style>
