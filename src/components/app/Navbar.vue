<template>
  <div class="nav-bar">
    <div>
      <div class="app-name">{{appName}}</div>
      <div class="nav-bar-menu">
        <div
          v-for="button of buttons"
          :key="button.name"
          class="menu-button"
          :class="{active: currentList === button.name}"
          @click="toggleList(button.name)"
          v-tooltip="getTranslation(button.name)"
        >
          <i class="material-icons">
            {{button.icon}}
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  props: {
    currentList: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      appName: process.env.VUE_APP_NAME,
      loading: false,
      buttons: [
        {
          name: 'conversations',
          icon: 'forum'
        },
        {
          name: 'contacts',
          icon: 'contacts'
        },
        {
          name: 'settings',
          icon: 'settings'
        },
      ]
    };
  },
  methods: {
    getTranslation(value) {
      return this.$filters.localize(value);
    },
    toggle() {
      this.loading = !this.loading;
      this.$emit('loading', this.loading);
    },
    toggleList(listName) {
      this.$eventBus.$emit('changeList', listName);
    }
  }
};
</script>
<style scoped>
  .app-name {
    float: right;
    padding-right: 20px;
    font-size: 30px;
    font-weight: bold;
    color: #ffffff;
  }

  .nav-bar-menu {
    display: flex;
    flex-direction: row;
    margin: 12px 20px;
  }

  .menu-button {
    color: #ffffff;
    margin-right: 20px;
  }
  .menu-button:hover {
    color: #cccccc;
  }
  .menu-button.active {
    color: #4e4e4e;
  }
  .material-icons {
    cursor: pointer;
    font-size: 36px;
  }
</style>
