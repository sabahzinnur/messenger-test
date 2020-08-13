<template>
  <div class="list messages" ref="messagesList"
       :style="{top: listOffset + 'px'}"
       @wheel.prevent="wheel"
  >
    <div style="width: 100%"
         v-for="(message, index) in messages"
         :key="index"
    >
      <Message
        :message="message"
      />
    </div>
  </div>
</template>

<script>
import Message from '@/components/app/Message';
import listScrolling from '@/mixins/listScrolling';

export default {
  name: 'MessagesList',
  components: {
    Message,
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
      date: new Date()
    };
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    }
  },
  mounted() {
    if (this.$refs.messagesList.offsetHeight > 560) {
      this.scrollToLastMessage();
    }
  },
  methods: {
    scrollToLastMessage() {
      // set scrollable list size
      this.limit = this.$refs.messagesList.offsetHeight - 510;
      // scroll to last message
      if (this.$refs.messagesList.offsetHeight > 480) {
        this.listOffset = 480 - this.$refs.messagesList.offsetHeight;
      }
    }
  },
  watch: {
    messages() {
      this.listOffset = 1;
      this.limit = 0;
      if (this.$refs.messagesList.offsetHeight > 510) {
        this.scrollToLastMessage();
      }
    }
  },
};
</script>

<style scoped>
.list {
  position: relative;
  width: 650px;
  min-height: 100%;
  top: 60px;
  z-index: 0;
  border-left: 1px #eca70b;
}

.messages {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
  top: 0;
  justify-content: space-between;
  transition: all .5s ease;
  overflow: hidden;
}
</style>
