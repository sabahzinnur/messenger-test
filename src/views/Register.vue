<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form class="auth-card" @submit.prevent="handleSubmit(submitHandler)">
      <div class="card">
        <div class="card-title">{{appName}}</div>
        <div class="card-content">
          <locale-switcher/>
          <input-field
            :label="'Name' | localize"
            id="name"
            rules="required"
            type="text"
            @change="changeFormData('name', $event)"
          />
          <input-field
            :label="'Email' | localize"
            id="email"
            rules="required|email"
            type="email"
            @change="changeFormData('email', $event)"
          />
          <input-field
            :label="'Password' | localize"
            id="password"
            type="password"
            rules="required"
            @change="changeFormData('password', $event)"
          />
        </div>
        <div class="card-action">
          <div>
            <button
              class="btn"
              type="submit"
            >
              {{ 'Register' | localize }}
            </button>
          </div>
        </div>
        <div class="card-footer">
          <div>
            <p class="center">
              {{ 'Already registered' | localize }}?
              <router-link :to="{name: 'login'}"> {{ 'Login' | localize }}</router-link>
            </p>
          </div>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import InputField from '@/components/common/InputField';
import LocaleSwitcher from '../components/common/LocaleSwitcher';

export default {
  name: 'Register',
  metaInfo() {
    return {
      title: this.$title('Register'),
    };
  },
  components: {
    LocaleSwitcher,
    InputField,
  },
  data() {
    return {
      appName: process.env.VUE_APP_NAME,
      formData: {
        email: '',
        name: '',
        password: '',
        locale: this.$store.getters.userInfo.locale
      },
    };
  },
  mounted() {
    if (this.$route.params.message) {
      this.$message(this.$filters.localize(this.$route.params.message));
    }
  },
  methods: {
    changeFormData(field, value) {
      this.formData[field] = value;
    },
    async submitHandler() {
      try {
        await this.$store.dispatch('register', this.formData);
        await this.$router.push({name: 'login'});
      } catch (e) {}
    },
  },
};
</script>
