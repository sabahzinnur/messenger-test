<template>
  <div
    class="list settings"
  >
    <div class="controls">
      <i class="material-icons close"
        @click="closeList()"
      >close
      </i>
    </div>
    <div class="controls">
      <strong>{{ $store.getters.userInfo.name}}</strong>
      <p>{{ $store.getters.userInfo.email}}</p>
    </div>
    <div class="controls">
      {{ 'Language' | localize}}
      <locale-switcher/>
    </div>
    <div class="controls">
      <p/>
    </div>
    <div class="controls">
      <div class="controls-item" @click="logout()">
        <div class="controls-icon">
          <i class="material-icons">assignment_return</i>
        </div>
        {{ 'Logout' | localize}}
      </div>
    </div>

  </div>
</template>

<script>
import LocaleSwitcher from '../common/LocaleSwitcher';

export default {
  name: 'SettingsList',
  components: {
    LocaleSwitcher
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeList() {
      this.$eventBus.$emit('changeList');
    },
    async logout() {
      this.closeList();
      await this.$store.dispatch('logout');
      await this.$router.push({
        name: 'login',
        params: {message: 'You are logged out'}
      });
    }
  },
};
</script>

<style scoped>
  .settings {
    z-index: 3;
    position: relative;
    top: 0;
    margin: 10px 10px auto;
    justify-content: space-between;
    transition: all .3s ease;
  }

  .controls {
    color: #4e4e4e;
    width: 100%;
    padding-bottom: 5px;
    margin: 0 0 20px 0;
  }

  .controls hr {
    width: 80%;
  }

  .controls-icon {
    float: left;
    padding-right: 20px;
  }

  .controls-item {
    cursor: pointer;
  }

  .material-icons.close {
    cursor: pointer;
    padding-right: 20px;
    float: right;
  }
</style>
