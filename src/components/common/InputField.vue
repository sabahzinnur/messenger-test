<template>
  <ValidationProvider class="input-field" :rules="rules" v-slot="{ errors }">
      <label :for="id" :class="{ 'show': showLabel }">{{label}}</label>
      <input
        :id="id"
        :type="type"
        v-model.trim="currentValue"
        :placeholder="focus ? '' : placeholder || label"
        @focusin="focus = true"
        @focusout="focus = false"
      >
      <div class="helper-text invalid">
        <span v-if="errors.length">{{ errors[0] }}</span>
      </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    rules: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      default: ' '
    }
  },
  data() {
    return {
      currentValue: '',
      focus: false,
    };
  },
  computed: {
    showLabel() {
      return !!this.currentValue || this.focus;
    },
  },
  watch: {
    currentValue(oldVal) {
      this.$emit('change', oldVal);
    },
  },
};
</script>

<style scoped>

  .input-field {
    position: relative;
    min-width: 100%;
    padding-top: 20px;
  }

  label {
    opacity: 0;
    position: absolute;
    top: 2em;
    padding: 15px;
    transition: all 0.1s linear;
    z-index: -1;
  }

  label.show {
    opacity: 1;
    top: -1em;
    z-index: 1;
  }

  .helper-text.invalid {
    height: 20px;
    min-height: 20px;
    color: red;
    font-size: 13px;
  }

  input {
    width: 70%;
    padding: 15px;
    margin: 5px 0 0 0;
    display: inline-block;
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    background: #eeeeee;
  }

  input:focus {
    background-color: #eeeeee;
  }
</style>
