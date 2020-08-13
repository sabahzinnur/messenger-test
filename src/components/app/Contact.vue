<template>
  <div class="contact">
    <div class="user-name">
      {{ contact.name }}
    </div>
    <div class="action" @click="startConversation()">
      <i class="material-icons">
        send
      </i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  computed: {
    conversations() {
      return this.$store.getters.conversations;
    },
  },
  methods: {
    async startConversation() {
      this.$store.commit('setLoading', true);
      this.$store.commit('setActiveConversation', null);
      this.$store.commit('setMessages', []);
      const alreadyOpened = this.$store.getters.conversations.find(conversation => {
        return !!conversation.members.find(member => member.uid === this.contact.uId);
      });
      if (!alreadyOpened) {
        await this.$store.dispatch('createConversation', this.contact.uId);
      } else {
        await this.$store.dispatch('fetchConversation', alreadyOpened);
      }
      await this.$eventBus.$emit('changeList');
      this.$store.commit('setLoading', false);
    }
  }
};
</script>

<style scoped>
.contact {
  color: #4e4e4e;
  width: 100%;
  background-color: #E9EDF2;
  height: 50px;
  min-width: 100%;
  border-bottom: 1px solid #caced3;
  overflow: hidden;
}

.user-name {
  padding: 15px 0 5px 5px;
  float: left;
}

.action {
  cursor: pointer;
  padding: 15px 5px;
  color: #eca70b;
  float: right;
}

.action:hover {
  color: #cccccc;
}
</style>
