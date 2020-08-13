<template>
  <div class="chat-aria">
    <div v-if="loading" class="chat">
      <loader style="margin: 0 auto"/>
    </div>
    <div v-else class="chat">
      <messages-list v-if="messages && messages.length"/>
      <div v-else-if="!activeConversation" class="chat messages-aria">
        <div style="padding: 1rem"> {{ 'noticeSelectConversation' | localize }}</div>
      </div>
      <div v-else class="chat messages-aria">
        <div style="padding: 1rem"> {{ 'noticeWriteMessage' | localize }}</div>
      </div>
    </div>
    <div class="chat input-aria" v-if="activeConversation">
      <textarea class="input-message"
                :placeholder="'inputTheMessage' | localize"
                v-model="message"
                @keydown.ctrl.enter="createMessage">
      </textarea>
      <button
        class="btn send-message"
        @click="createMessage()"
        :disabled="!message"
      >
        <i class="material-icons">
          send
        </i>
      </button>
    </div>
  </div>
</template>

<script>
import MessagesList from '@/components/app/MessagesList';

export default {
  name: 'Chat',
  components: {MessagesList},
  data() {
    return {
      message: ''
    };
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    },
    activeConversation() {
      return this.$store.getters.activeConversation;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    createMessage() {
      if (this.message) {
        this.$store.dispatch('addMessage', this.message);
        this.message = '';
      }
    }
  }

};
</script>

<style scoped>
.chat-aria {
  z-index: 20;
  box-shadow: -9px 0px 6px -6px rgba(0, 0, 0, 0.25);
}

.input-message {
  width: 92%;
  max-height: 90px;
  margin: 5px 10px 5px 5px;
  padding: 0 10px;
  resize: none;
  overflow: auto;
  border: 0px;
  outline: 0px;
  background-color: transparent;
}

.send-message {
  width: 8%;
  margin-right: 20px;
  text-align: center;
}
</style>
