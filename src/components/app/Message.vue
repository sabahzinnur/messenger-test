<template>
  <div class="message"
       :class="isUserMessage ? 'outgoing' : 'incoming'">
    <div>{{ message.text }}</div>
    <div class="signature">
      <div class="date">{{ isUserMessage ? 'Вы' : conversationalist.name }}, {{ message.timestamp | date('datetime') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message',
  props: {
    message: {
      required: true,
      type: Object
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    conversationalist() {
      return this.$store.getters.activeConversation.members.find(member => member.uid !== this.userInfo.uid);
    },
    isUserMessage() {
      return this.$store.getters.userInfo.uid === this.message.author;
    }
  }
};
</script>

<style scoped>
.signature {
  font-size: 12px;
  color: #646161;
}

.message {
  margin: 10px 10px 10px 0;
  padding: 10px 20px 10px 20px;
  max-width: 75%;
}

.message.outgoing {
  border-radius: 15px 15px 15px 0px;
  background-color: bisque;
  float: left;
}

.message.incoming {
  border-radius: 15px 15px 0px 15px;
  background-color: rgba(170, 217, 255, 0.56);
  float: right;
  justify-content: flex-end;
}

.incoming .signature {
  float: right;
}

.outgoing .signature {
  float: left;
}

</style>
