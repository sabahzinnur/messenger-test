import Message from './src/message.js';
import './src/message.css';

Message.install = function (Vue, options) {
  if (options && options.name) {
    Vue.prototype[`$${options.name}`] = Message;
  } else {
    Vue.prototype.$message = Message;
  }
};

export default Message;
