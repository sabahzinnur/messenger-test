<template>
  <div class="window" v-if="userInfo.name">
    <loader v-if="loading"/>
    <div v-else>
      <navbar
        :current-list="currentList"
        @changeList="currentList = $event"
        @loading="loading = $event"/>
      <div class="window">
        <div class="list">
          <conversations-list
            v-show="currentList === 'conversations'"/>
          <settings-list
            v-show="currentList === 'settings'"/>
          <contacts-list
            v-show="currentList === 'contacts'"/>
        </div>
        <chat />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar';
import ConversationsList from '@/components/app/ConversationsList';
import SettingsList from '@/components/app/SettingsList';
import Chat from '@/components/app/Chat';
import ContactsList from '@/components/app/ContactsList';

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$title('Home'),
    };
  },
  created() {
    if (!this.$store.getters.userInfo.name) {
      this.$store.dispatch('fetchInfo');
    }
  },
  mounted() {
    if (this.$route.params.message) {
      this.$message(this.$filters.localize(this.$route.params.message));
    }
  },
  components: {
    ContactsList,
    Navbar,
    ConversationsList,
    SettingsList,
    Chat,
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    currentList() {
      return this.$store.getters.currentList;
    },
    currentConversation() {
      return this.$store.getters.activeConversation;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    }
  }
};
</script>
