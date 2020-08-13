<template>
  <div class="switch">
    <div class="switcher-icon"><i class="material-icons">language</i></div>
    <div class="switcher-languages">
      <span v-for="language of languages" :key="language.name">
        <label>
        <input
          name="locale"
          type="radio"
          :value="language.code"
          :checked="language.code === userInfo.locale"
          @change="setLocale(language)"
        >
        {{ language.name }}</label>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LocaleSwitcher',
  data() {
    return {
      languages: [
        {
          name: 'English',
          code: 'en-US'
        },
        {
          name: 'Русский',
          code: 'ru-RU'
        }
      ]
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    async setLocale(language) {
      this.$store.commit('setLocale', language.code);
      if (this.userInfo.name) {
        await this.$store.dispatch('updateInfo', this.userInfo);
      }
    }
  }
};
</script>

<style scoped>
.switcher-icon {
  float: left;
}

.switcher-languages {
  float: left;
  padding-top: 4px;
}
</style>
