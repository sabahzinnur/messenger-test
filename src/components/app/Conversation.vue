<template>
  <div class="conversation" v-if="conversation" :class="{active: active}">
    <div class="conversation__body">
      <div class="title">
        <span class="contact-name">{{ conversationalist.name }}</span>
        <span class="date">{{ conversation.timestamp | date('date') }}</span>
      </div>
      <div class="message-preview" v-if="conversation.lastMessage">
        {{ conversation.lastMessage }}
      </div>
      <div class="message-preview" v-else>
        {{ 'noticeWriteMessage' | localize }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Conversation',
  props: {
    conversation: {
      required: true,
      type: Object,
    },
    date: {
      default: new Date()
    },
    active: {
      type: Boolean
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    conversationalist() {
      return this.conversation.members.find(member => member.uid !== this.userInfo.uid);
    }
  }
};
</script>

<style scoped>
.conversation {
  background-color: #E9EDF2;
  height: 100px;
  min-width: 100%;
  border-bottom: 1px solid #caced3;
  overflow: hidden;
}

.conversation.active {
  background-color: #ffffff !important;
  transition: 0.3s;
}

.conversation__body {
  margin: 5px 5px 5px 15px;
}

.title {
  display: flex;
  justify-content: space-between;
}

.contact-name {
  font-weight: bold;
  color: #4a4747;
  font-size: 15px;
}

.date {
  font-size: 12px;
  float: right;
}

.message-preview {
  padding-top: 7px;
  color: #4a4747;
}
</style>
